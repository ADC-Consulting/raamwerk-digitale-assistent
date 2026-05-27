#!/usr/bin/env python3
"""
Deduplicate bronnen.yaml by normalised URL and rewrite all references.

Two sources are "the same" if their URLs match after normalising (lowercased
host, no scheme/www, no trailing slash, no query/fragment). Picks one canonical
id per group (preferring the entry with the richest omschrijving/categorie),
writes the cleaned bronnen.yaml, and applies the resulting rewrite map to
every `sources:` / `seeAlso:` reference in:
  - content/practices/*.md
  - content/domains/*.md
  - content/glossery.yaml

Also reports:
  - Soft duplicates (very similar titles, different URLs) as warnings.
  - Orphan sources (defined, never referenced) as info — does NOT delete.

Flags:
  --dry-run   write preview + rewrite map to local_output/converted/ without
              touching any tracked files.
"""

import argparse
import json
import os
import re
import sys
from collections import defaultdict
from difflib import SequenceMatcher

from _content import (
    CONTENT_DIR,
    REPO_ROOT,
    load_bronnen,
    load_domain_files,
    load_glossery,
    load_practice_files,
    normalise_url,
)

CONVERTED_DIR = os.path.join(REPO_ROOT, 'local_output', 'converted')
REWRITE_MAP_PATH = os.path.join(CONVERTED_DIR, 'rewrite-map.json')
DEDUP_REPORT_PATH = os.path.join(CONVERTED_DIR, 'dedupe-report.md')


def _richness(b):
    """Score how complete a bron entry is — used to pick the canonical entry."""
    score = 0
    score += len((b.get('omschrijving') or '').strip())
    score += 10 if b.get('categorie') else 0
    score += 10 if b.get('title') else 0
    return score


def find_url_duplicates(bronnen):
    """Returns {normalised_url: [bron, ...]} for URLs with >1 entry."""
    by_url = defaultdict(list)
    for b in bronnen:
        nu = normalise_url(b.get('url', ''))
        if nu:
            by_url[nu].append(b)
    return {nu: bs for nu, bs in by_url.items() if len(bs) > 1}


def find_soft_duplicates(bronnen, threshold=0.92):
    """Returns list of (bron_a, bron_b, ratio) for similar titles + different URLs."""
    out = []
    seen = set()
    for i, a in enumerate(bronnen):
        for b in bronnen[i + 1:]:
            if a.get('id') == b.get('id'):
                continue
            key = tuple(sorted((a.get('id', ''), b.get('id', ''))))
            if key in seen:
                continue
            seen.add(key)
            url_a = normalise_url(a.get('url', ''))
            url_b = normalise_url(b.get('url', ''))
            if url_a == url_b:
                continue
            title_a = (a.get('title') or '').strip().lower()
            title_b = (b.get('title') or '').strip().lower()
            if not title_a or not title_b:
                continue
            ratio = SequenceMatcher(None, title_a, title_b).ratio()
            if ratio >= threshold:
                out.append((a, b, ratio))
    return out


def build_rewrite_map(url_dupes):
    """Pick a canonical id per URL group. Returns {old_id: canonical_id}."""
    rewrite = {}
    for nu, entries in url_dupes.items():
        canonical = max(entries, key=_richness)
        cid = canonical.get('id')
        for e in entries:
            eid = e.get('id')
            if eid and eid != cid:
                rewrite[eid] = cid
    return rewrite


def merged_bron(entries, canonical_id):
    """Merge fields from duplicate entries, preferring richest values."""
    canonical = next(e for e in entries if e.get('id') == canonical_id)
    merged = dict(canonical)
    for e in entries:
        if e.get('id') == canonical_id:
            continue
        if not merged.get('omschrijving') and e.get('omschrijving'):
            merged['omschrijving'] = e['omschrijving']
        elif e.get('omschrijving') and len(e['omschrijving']) > len(merged.get('omschrijving') or ''):
            merged['omschrijving'] = e['omschrijving']
        if not merged.get('categorie') and e.get('categorie'):
            merged['categorie'] = e['categorie']
    return merged


def write_bronnen_yaml(bronnen, out_path):
    """Write bronnen.yaml preserving the original block style."""
    lines = []
    for b in bronnen:
        lines.append(f'- id: {b["id"]}')
        if b.get('title'):
            lines.append(f'  title: {_yaml_scalar(b["title"])}')
        if b.get('categorie'):
            lines.append(f'  categorie: {_yaml_scalar(b["categorie"])}')
        oms = (b.get('omschrijving') or '').strip()
        if oms:
            lines.append('  omschrijving: >')
            for ln in _wrap(oms, 78):
                lines.append(f'    {ln}')
        if b.get('url'):
            lines.append(f'  url: {b["url"]}')
        lines.append('')
    text = '\n'.join(lines).rstrip() + '\n'
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(text)


def _yaml_scalar(s):
    """Quote a YAML scalar only when necessary."""
    s = s.strip()
    if not s:
        return '""'
    needs_quote = any(ch in s for ch in [':', '#', '"', "'"]) or s[0] in '!&*?|>%@`'
    if needs_quote:
        escaped = s.replace('"', '\\"')
        return f'"{escaped}"'
    return s


def _wrap(text, width):
    """Soft-wrap a paragraph to a max line width (preserving words)."""
    words = text.split()
    out = []
    line = ''
    for w in words:
        if not line:
            line = w
            continue
        if len(line) + 1 + len(w) > width:
            out.append(line)
            line = w
        else:
            line += ' ' + w
    if line:
        out.append(line)
    return out or ['']


def apply_rewrite_to_md_file(path, rewrite):
    """Replace source ids inside `sources:` lists in markdown frontmatter only.
    Safer than a global replace because it limits the rewrite to the YAML
    frontmatter block (between the first two `---` markers)."""
    with open(path, encoding='utf-8') as f:
        text = f.read()
    m = re.match(r'^---\n(.*?)\n---\n(.*)', text, re.DOTALL)
    if not m:
        return False
    fm, body = m.group(1), m.group(2)
    changed = False
    new_fm_lines = []
    for line in fm.split('\n'):
        # Lines like `  - some-id` inside the sources list
        sm = re.match(r'^(\s*-\s*)([a-z0-9][a-z0-9\-]*)\s*$', line)
        if sm and sm.group(2) in rewrite:
            new_fm_lines.append(sm.group(1) + rewrite[sm.group(2)])
            changed = True
        else:
            new_fm_lines.append(line)
    if not changed:
        return False
    new_text = '---\n' + '\n'.join(new_fm_lines) + '\n---\n' + body
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_text)
    return True


def apply_rewrite_to_glossery(path, rewrite):
    """Rewrite ids inside `seeAlso:` blocks in glossery.yaml."""
    with open(path, encoding='utf-8') as f:
        text = f.read()
    new_lines = []
    in_see_also = False
    indent_see_also = 0
    changed = False
    for line in text.split('\n'):
        stripped = line.lstrip()
        cur_indent = len(line) - len(stripped)
        if stripped.startswith('seeAlso:'):
            in_see_also = True
            indent_see_also = cur_indent
            new_lines.append(line)
            continue
        if in_see_also:
            # Item lines have more indent than the seeAlso key
            if stripped.startswith('-') and cur_indent > indent_see_also:
                m = re.match(r'^(\s*-\s*)([a-z0-9][a-z0-9\-]*)\s*$', line)
                if m and m.group(2) in rewrite:
                    new_lines.append(m.group(1) + rewrite[m.group(2)])
                    changed = True
                    continue
            # Anything else with indent <= the key indent ends the block
            elif cur_indent <= indent_see_also and stripped:
                in_see_also = False
        new_lines.append(line)
    if not changed:
        return False
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
    return True


def find_orphans(bronnen, domains, practices, glossery):
    """Bronnen-ids that exist in bronnen.yaml but are nowhere referenced."""
    referenced = set()
    for d in domains:
        for s in d.get('sources') or []:
            if isinstance(s, str):
                referenced.add(s)
    for p in practices:
        for s in p.get('sources') or []:
            if isinstance(s, str):
                referenced.add(s)
    for g in glossery:
        for s in g.get('seeAlso') or []:
            if isinstance(s, str):
                referenced.add(s)
    all_ids = {b['id'] for b in bronnen if b.get('id')}
    return sorted(all_ids - referenced)


def main():
    parser = argparse.ArgumentParser(description=__doc__.strip().split('\n')[0])
    parser.add_argument('--dry-run', action='store_true',
                        help='Preview only; write to local_output/converted/ instead of content/')
    args = parser.parse_args()

    os.makedirs(CONVERTED_DIR, exist_ok=True)

    bronnen = load_bronnen()
    domains = load_domain_files()
    practices = load_practice_files()
    glossery = load_glossery()

    url_dupes = find_url_duplicates(bronnen)
    soft_dupes = find_soft_duplicates(bronnen)
    rewrite = build_rewrite_map(url_dupes)

    # Build the deduplicated bronnen list (keeping order; drop non-canonical entries
    # and replace canonical entry with the merged version).
    canonical_ids = set()
    for entries in url_dupes.values():
        canonical = max(entries, key=_richness)
        canonical_ids.add(canonical.get('id'))

    dedup_bronnen = []
    seen_canonical = set()
    for b in bronnen:
        bid = b.get('id')
        if bid in rewrite:
            continue  # this entry will be merged into its canonical
        if bid in canonical_ids and bid not in seen_canonical:
            entries = next(es for nu, es in url_dupes.items() if any(e.get('id') == bid for e in es))
            dedup_bronnen.append(merged_bron(entries, bid))
            seen_canonical.add(bid)
            continue
        dedup_bronnen.append(b)

    # Apply or preview
    if args.dry_run:
        preview_yaml = os.path.join(CONVERTED_DIR, 'bronnen.preview.yaml')
        write_bronnen_yaml(dedup_bronnen, preview_yaml)
        with open(REWRITE_MAP_PATH, 'w', encoding='utf-8') as f:
            json.dump(rewrite, f, ensure_ascii=False, indent=2)
        print(f'Dry run: previewed dedup to {preview_yaml}')
        print(f'Rewrite map written to {REWRITE_MAP_PATH}')
    else:
        write_bronnen_yaml(dedup_bronnen, os.path.join(CONTENT_DIR, 'bronnen.yaml'))
        rewritten_files = []
        if rewrite:
            for d in domains:
                if apply_rewrite_to_md_file(d['_path'], rewrite):
                    rewritten_files.append(os.path.relpath(d['_path'], REPO_ROOT))
            for p in practices:
                if apply_rewrite_to_md_file(p['_path'], rewrite):
                    rewritten_files.append(os.path.relpath(p['_path'], REPO_ROOT))
            glossery_path = os.path.join(CONTENT_DIR, 'glossery.yaml')
            if apply_rewrite_to_glossery(glossery_path, rewrite):
                rewritten_files.append(os.path.relpath(glossery_path, REPO_ROOT))
        with open(REWRITE_MAP_PATH, 'w', encoding='utf-8') as f:
            json.dump(rewrite, f, ensure_ascii=False, indent=2)
        print(f'Applied dedup. {len(rewrite)} ids rewritten across {len(rewritten_files)} files.')
        if rewritten_files:
            for f in sorted(set(rewritten_files)):
                print(f'  - {f}')

    # Reload after potential writes for orphan check
    refreshed_bronnen = load_bronnen() if not args.dry_run else dedup_bronnen
    refreshed_domains = load_domain_files() if not args.dry_run else domains
    refreshed_practices = load_practice_files() if not args.dry_run else practices
    refreshed_glossery = load_glossery() if not args.dry_run else glossery
    orphans = find_orphans(refreshed_bronnen, refreshed_domains, refreshed_practices, refreshed_glossery)

    # Write the report
    lines = ['# Dedupe report', '']
    lines.append(f'## URL-duplicates merged: {len(url_dupes)} groups, {len(rewrite)} ids rewritten')
    lines.append('')
    if url_dupes:
        for nu, entries in sorted(url_dupes.items()):
            ids = ', '.join(sorted(e.get('id', '?') for e in entries))
            canonical = max(entries, key=_richness).get('id')
            lines.append(f'- `{nu}` → canonical **{canonical}** (merged: {ids})')
    else:
        lines.append('_(none)_')
    lines.append('')
    lines.append(f'## Soft duplicates (similar title, different URL): {len(soft_dupes)}')
    lines.append('')
    if soft_dupes:
        for a, b, ratio in soft_dupes:
            lines.append(
                f'- {ratio:.2f}: **{a.get("id")}** "{a.get("title")}" ({a.get("url")})  '
                f'vs **{b.get("id")}** "{b.get("title")}" ({b.get("url")})'
            )
    else:
        lines.append('_(none)_')
    lines.append('')
    lines.append(f'## Orphan sources (defined but unreferenced): {len(orphans)}')
    lines.append('')
    if orphans:
        for oid in orphans:
            lines.append(f'- `{oid}`')
    else:
        lines.append('_(none)_')

    with open(DEDUP_REPORT_PATH, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f'\nReport: {DEDUP_REPORT_PATH}')

    return 0


if __name__ == '__main__':
    sys.exit(main())
