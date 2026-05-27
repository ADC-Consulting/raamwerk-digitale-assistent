#!/usr/bin/env python3
"""
Shared parsing utilities for the raamwerk-digitale-assistent content base.

Used by scripts/build.py, scripts/check_content.py, scripts/export_review_docx.py,
scripts/dedupe_bronnen.py.

Schema lives under content/:
- content/domains/*.md    one domain per file; body split on `\\n---\\n` into wat / waarom
- content/practices/*.md  one practice per file; body split on blank lines into paragraphs
- content/bronnen.yaml    sources, referenced by id from practices/domains/glossery
- content/glossery.yaml   glossary terms, seeAlso references bronnen
- content/filters.yaml    closed vocabularies (phases, levels)
"""

import glob
import os
import re
import urllib.parse

import yaml

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
CONTENT_DIR = os.path.join(REPO_ROOT, 'content')
DOMAINS_DIR = os.path.join(CONTENT_DIR, 'domains')
PRACTICES_DIR = os.path.join(CONTENT_DIR, 'practices')

# The raamwerk has 4 fundamenten and 9 domeinen. `nr` is unique within each group.
# Mirrored in js/pages.jsx (FUND_IDS + the hardcoded list on the detail-page check).
FUNDAMENT_IDS = frozenset({
    'cultuur-adoptie',
    'kennis-capaciteit',
    'governance',
    'infrastructuur-data',
})

CAT_TO_TYPEKEY = {
    'Beleidskader':     'beleid',
    'Verplicht kader':  'verplicht',
    'Richtlijnen':      'richtlijn',
    'Raamwerk':         'raamwerk',
    'Tools':            'tools',
    'Voorbeeldproject': 'voorbeeld',
}

_FRONTMATTER_RE = re.compile(r'^---\n(.*?)\n---\n(.*)', re.DOTALL)


def parse_frontmatter(text, path=None):
    """Returns (frontmatter_dict, body_str). Raises if no frontmatter block is present."""
    match = _FRONTMATTER_RE.match(text)
    if not match:
        where = f' in {path}' if path else ''
        raise ValueError(f'No frontmatter found{where}')
    return yaml.safe_load(match.group(1)) or {}, match.group(2).strip()


def md_to_html(text):
    """Minimal markdown → HTML: paragraphs, `- ` bullets, `**bold**`, soft newlines."""
    html = []
    for para in text.strip().split('\n\n'):
        para = para.strip()
        if not para:
            continue
        lines = para.split('\n')
        if all(line.startswith('- ') for line in lines if line.strip()):
            items = []
            for line in lines:
                if line.strip():
                    item = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', line[2:])
                    items.append(f'<li>{item}</li>')
            html.append('<ul>' + ''.join(items) + '</ul>')
        else:
            para = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', para)
            para = para.replace('\n', '<br/>')
            html.append(f'<p>{para}</p>')
    return ''.join(html)


def _read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()


def load_yaml(path):
    with open(path, encoding='utf-8') as f:
        return yaml.safe_load(f)


def load_filters():
    return load_yaml(os.path.join(CONTENT_DIR, 'filters.yaml'))


def load_bronnen():
    return load_yaml(os.path.join(CONTENT_DIR, 'bronnen.yaml')) or []


def load_glossery():
    return load_yaml(os.path.join(CONTENT_DIR, 'glossery.yaml')) or []


def load_domain_files():
    """One dict per content/domains/*.md.

    Body split on `\\n---\\n` into raw markdown sections:
      sections[0] -> 'wat_raw'
      sections[1] -> 'waarom_raw'
    Adds '_path' (absolute) and '_slug' (basename without .md). Defaults `sources` to [].
    """
    result = []
    for path in sorted(glob.glob(os.path.join(DOMAINS_DIR, '*.md'))):
        fm, body = parse_frontmatter(_read(path), path)
        sections = body.split('\n---\n')
        fm['wat_raw'] = sections[0].strip() if len(sections) > 0 else ''
        fm['waarom_raw'] = sections[1].strip() if len(sections) > 1 else ''
        fm.setdefault('sources', [])
        fm['_path'] = path
        fm['_slug'] = os.path.splitext(os.path.basename(path))[0]
        result.append(fm)
    return result


def load_practice_files():
    """One dict per content/practices/*.md.

    Body split on blank lines into a list of paragraph/bullet strings under 'body'.
    Adds '_path' and '_slug'.
    """
    result = []
    for path in sorted(glob.glob(os.path.join(PRACTICES_DIR, '*.md'))):
        fm, body = parse_frontmatter(_read(path), path)
        fm['body'] = [p.strip() for p in body.split('\n\n') if p.strip()]
        fm['_path'] = path
        fm['_slug'] = os.path.splitext(os.path.basename(path))[0]
        result.append(fm)
    return result


def resolve_sources(sources, bronnen_by_id):
    """Map a list of source ids (or already-resolved objects) to bron objects.
    Unresolved string ids pass through unchanged."""
    resolved = []
    for s in sources or []:
        if isinstance(s, str) and s in bronnen_by_id:
            resolved.append(bronnen_by_id[s])
        else:
            resolved.append(s)
    return resolved


def normalise_url(url):
    """Canonical form for source identity.

    Lowercases the host, drops scheme, drops a leading `www.`, drops trailing slash,
    drops query and fragment. Returns '' for empty/None input.
    """
    if not url:
        return ''
    url = url.strip()
    if '//' not in url:
        url = '//' + url
    parts = urllib.parse.urlsplit(url)
    host = (parts.hostname or '').lower()
    if host.startswith('www.'):
        host = host[4:]
    path = parts.path or ''
    if path.endswith('/'):
        path = path[:-1]
    return host + path
