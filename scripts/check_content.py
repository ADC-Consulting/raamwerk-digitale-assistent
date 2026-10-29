#!/usr/bin/env python3
"""
Consistency checker for the raamwerk-digitale-assistent content base.

Validates content/ against the schema and cross-references. Exits 1 on errors.
Flags:
  --strict   treat warnings as errors
  --json     machine-readable JSON output (used by the conversion validation loop)
"""

import argparse
import json
import re
import sys
from collections import Counter, defaultdict

from _content import (
    CAT_TO_TYPEKEY,
    FUNDAMENT_IDS,
    load_bronnen,
    load_domain_files,
    load_filters,
    load_glossery,
    load_practice_files,
    normalise_url,
)

PLACEHOLDER_PATTERNS = [
    r'\bvul hier aan\b',
    r'beschrijf de eerste aanbeveling',
    r'\bvoorbeeld-bron-\w+\b',
]

REQUIRED_DOMAIN_FIELDS = ['id', 'nr', 'title', 'short']
REQUIRED_PRACTICE_FIELDS = ['id', 'title', 'summary', 'domains', 'phases', 'levels']
REQUIRED_BRON_FIELDS = ['id', 'title']
REQUIRED_GLOSS_FIELDS = ['id', 'term']

VALID_STATUS = {'published', 'coming-soon'}


class Report:
    def __init__(self):
        self.errors = []
        self.warnings = []

    def error(self, where, msg):
        self.errors.append({'where': where, 'msg': msg})

    def warn(self, where, msg):
        self.warnings.append({'where': where, 'msg': msg})

    def to_json(self):
        return {'errors': self.errors, 'warnings': self.warnings}

    def render_text(self):
        out = []
        if self.errors:
            out.append(f'ERRORS ({len(self.errors)}):')
            for e in self.errors:
                out.append(f'  [{e["where"]}] {e["msg"]}')
        if self.warnings:
            if out:
                out.append('')
            out.append(f'WARNINGS ({len(self.warnings)}):')
            for w in self.warnings:
                out.append(f'  [{w["where"]}] {w["msg"]}')
        if not self.errors and not self.warnings:
            out.append('OK — geen problemen gevonden.')
        return '\n'.join(out)


def check_per_file(report, domains, practices, bronnen, glossary):
    for d in domains:
        slug = d['_slug']
        where = f'domains/{slug}.md'
        for f in REQUIRED_DOMAIN_FIELDS:
            if f not in d or d.get(f) in (None, ''):
                report.error(where, f'missing required field `{f}`')
        if d.get('id') and d.get('id') != slug:
            report.error(where, f'id `{d.get("id")}` does not equal filename slug `{slug}`')
        status = d.get('status', 'published')
        if status not in VALID_STATUS:
            report.error(where, f'invalid status `{status}` (must be one of {sorted(VALID_STATUS)})')

    for p in practices:
        slug = p['_slug']
        where = f'practices/{slug}.md'
        for f in REQUIRED_PRACTICE_FIELDS:
            if f not in p or p.get(f) in (None, ''):
                report.error(where, f'missing required field `{f}`')
        if p.get('id') and p.get('id') != slug:
            report.error(where, f'id `{p.get("id")}` does not equal filename slug `{slug}`')

    for b in bronnen:
        bid = b.get('id', '<unknown>')
        where = f'bronnen.yaml#{bid}'
        for f in REQUIRED_BRON_FIELDS:
            if f not in b or b.get(f) in (None, ''):
                report.error(where, f'missing required field `{f}`')

    for g in glossary:
        gid = g.get('id', '<unknown>')
        where = f'glossery.yaml#{gid}'
        for f in REQUIRED_GLOSS_FIELDS:
            if f not in g or g.get(f) in (None, ''):
                report.error(where, f'missing required field `{f}`')


def check_vocabularies(report, practices, bronnen, filters):
    valid_phases = set(filters.get('phases') or [])
    valid_levels = set(filters.get('levels') or [])
    for p in practices:
        where = f'practices/{p["_slug"]}.md'
        for ph in p.get('phases') or []:
            if ph not in valid_phases:
                report.error(where, f'phase `{ph}` not in filters.yaml phases ({sorted(valid_phases)})')
        for lv in p.get('levels') or []:
            if lv not in valid_levels:
                report.error(where, f'level `{lv}` not in filters.yaml levels ({sorted(valid_levels)})')
    for b in bronnen:
        bid = b.get('id', '<unknown>')
        cat = b.get('categorie', '')
        if cat and cat not in CAT_TO_TYPEKEY:
            report.warn(
                f'bronnen.yaml#{bid}',
                f'categorie `{cat}` not in CAT_TO_TYPEKEY (typeKey defaults to "infra")',
            )


def check_cross_references(report, domains, practices, bronnen, glossary):
    bron_ids = {b['id'] for b in bronnen if 'id' in b}
    practice_slugs = {p['_slug'] for p in practices}
    domain_slugs = {d['_slug'] for d in domains}
    practices_by_slug = {p['_slug']: p for p in practices}

    for p in practices:
        where = f'practices/{p["_slug"]}.md'
        for sid in p.get('sources') or []:
            if isinstance(sid, str) and sid not in bron_ids:
                report.error(where, f'sources references unknown bron id `{sid}`')
        for did in p.get('domains') or []:
            if did not in domain_slugs:
                report.error(where, f'domains references unknown domain id `{did}`')

    for d in domains:
        where = f'domains/{d["_slug"]}.md'
        for sid in d.get('sources') or []:
            if isinstance(sid, str) and sid not in bron_ids:
                report.error(where, f'sources references unknown bron id `{sid}`')
        for pid in d.get('practices') or []:
            if pid not in practice_slugs:
                report.error(where, f'practices references unknown practice id `{pid}`')
            else:
                practice = practices_by_slug[pid]
                if d['_slug'] not in (practice.get('domains') or []):
                    report.error(
                        where,
                        f'practice `{pid}` is listed here but does not list this domain in its own `domains:`',
                    )

    for g in glossary:
        for ref in g.get('seeAlso') or []:
            if isinstance(ref, str) and ref not in bron_ids:
                report.error(f'glossery.yaml#{g.get("id")}', f'seeAlso references unknown bron id `{ref}`')


def check_uniqueness(report, domains, practices, bronnen):
    bid_counts = Counter(b.get('id') for b in bronnen if b.get('id'))
    for bid, c in bid_counts.items():
        if c > 1:
            report.error('bronnen.yaml', f'duplicate bron id `{bid}` ({c}x)')

    # `nr` is unique within fundamenten (4) and within domeinen (9), not across both groups.
    for group_label, in_group in (
        ('fundamenten', lambda s: s in FUNDAMENT_IDS),
        ('domeinen', lambda s: s not in FUNDAMENT_IDS),
    ):
        nr_to_slugs = defaultdict(list)
        for d in domains:
            if in_group(d['_slug']):
                nr_to_slugs[d.get('nr')].append(d['_slug'])
        for nr, slugs in nr_to_slugs.items():
            if nr is not None and len(slugs) > 1:
                report.error(
                    'domains/',
                    f'duplicate nr `{nr}` within {group_label}: {", ".join(sorted(slugs))}',
                )

    pid_counts = Counter(p.get('id') for p in practices if p.get('id'))
    for pid, c in pid_counts.items():
        if c > 1:
            report.error('practices/', f'duplicate practice id `{pid}` ({c}x)')

    for d in domains:
        where = f'domains/{d["_slug"]}.md'
        for field in ('practices', 'sources'):
            vals = [v for v in (d.get(field) or []) if isinstance(v, str)]
            for dup, c in Counter(vals).items():
                if c > 1:
                    report.error(where, f'duplicate id `{dup}` inside `{field}:` list ({c}x)')

    for p in practices:
        where = f'practices/{p["_slug"]}.md'
        for field in ('domains', 'phases', 'levels', 'sources'):
            vals = [v for v in (p.get(field) or []) if isinstance(v, str)]
            for dup, c in Counter(vals).items():
                if c > 1:
                    report.error(where, f'duplicate value `{dup}` inside `{field}:` list ({c}x)')

    url_to_ids = defaultdict(list)
    for b in bronnen:
        nu = normalise_url(b.get('url', ''))
        if nu:
            url_to_ids[nu].append(b.get('id', '<unknown>'))
    for nu, ids in url_to_ids.items():
        if len(ids) > 1:
            report.error('bronnen.yaml', f'duplicate sources by normalised URL `{nu}`: {", ".join(sorted(ids))}')


def check_content_smells(report, domains, practices):
    placeholder_re = re.compile('|'.join(PLACEHOLDER_PATTERNS), re.IGNORECASE)

    for d in domains:
        where = f'domains/{d["_slug"]}.md'
        for field in ('wat_raw', 'waarom_raw'):
            text = d.get(field, '') or ''
            for m in placeholder_re.findall(text):
                report.warn(where, f'placeholder text in `{field.replace("_raw", "")}`: `{m}`')

    for p in practices:
        where = f'practices/{p["_slug"]}.md'
        for i, para in enumerate(p.get('body') or []):
            for m in placeholder_re.findall(para):
                report.warn(where, f'placeholder text in body: `{m}`')
            # Practice body items render as plain paragraphs — raw markdown shows literally.
            if '**' in para:
                report.warn(where, f'body[{i}] contains `**` (raw markdown does not render — write plain prose)')
            if para.startswith('- '):
                report.warn(where, f'body[{i}] starts with `- ` (raw markdown bullets do not render — write as a paragraph)')
        for sid in p.get('sources') or []:
            if isinstance(sid, str) and placeholder_re.search(sid):
                report.warn(where, f'placeholder source id `{sid}`')

    for d in domains:
        if d.get('status', 'published') != 'published':
            continue
        explicit = d.get('practices') or []
        claimed = [p['_slug'] for p in practices if d['_slug'] in (p.get('domains') or [])]
        if not explicit and not claimed:
            report.warn(
                f'domains/{d["_slug"]}.md',
                'published domain has zero practices (not listed in frontmatter and no practice claims it)',
            )

    wat_to_slugs = defaultdict(list)
    for d in domains:
        first_para = (d.get('wat_raw') or '').strip().split('\n\n')[0].strip()
        if first_para:
            wat_to_slugs[first_para].append(d['_slug'])
    for para, slugs in wat_to_slugs.items():
        if len(slugs) > 1:
            report.warn('domains/', f'identical first paragraph of `wat` across: {", ".join(sorted(slugs))}')


def main():
    parser = argparse.ArgumentParser(description=__doc__.strip().split('\n')[0])
    parser.add_argument('--strict', action='store_true', help='Treat warnings as errors')
    parser.add_argument('--json', action='store_true', help='Machine-readable JSON output')
    args = parser.parse_args()

    report = Report()

    try:
        domains = load_domain_files()
        practices = load_practice_files()
        bronnen = load_bronnen()
        glossary = load_glossery()
        filters = load_filters()
    except Exception as exc:
        if args.json:
            print(json.dumps({'errors': [{'where': 'load', 'msg': str(exc)}], 'warnings': []},
                             ensure_ascii=False, indent=2))
        else:
            print(f'FATAL load error: {exc}', file=sys.stderr)
        return 2

    check_per_file(report, domains, practices, bronnen, glossary)
    check_vocabularies(report, practices, bronnen, filters)
    check_cross_references(report, domains, practices, bronnen, glossary)
    check_uniqueness(report, domains, practices, bronnen)
    check_content_smells(report, domains, practices)

    if args.json:
        print(json.dumps(report.to_json(), ensure_ascii=False, indent=2))
    else:
        print(report.render_text())

    fail = bool(report.errors) or (args.strict and bool(report.warnings))
    return 1 if fail else 0


if __name__ == '__main__':
    sys.exit(main())
