#!/usr/bin/env python3
"""
Reads content/ and generates content/knowledge-graph.json — a machine-readable
knowledge graph of the raamwerk: domeinen, good practices, bronnen, begrippen and
filters, plus every cross-link between them.

Output shape (hybrid): a flat `nodes` + `edges` graph (consumable by cytoscape/d3/vis),
where each node also carries denormalized convenience arrays of related node ids and the
full authored (raw) text. Intended to be made clickable by a future UI via each node's
`href` (the hash routes the site already uses).

Run: python3 scripts/build_graph.py

Source of truth is content/; this file is generated — do not hand-edit the JSON.
Reuses the shared parsers in scripts/_content.py; adds no new parsing rules.
"""

import glob
import json
import os
import re

from _content import (
    CONTENT_DIR,
    FUNDAMENT_IDS,
    PRACTICES_DIR,
    REPO_ROOT,
    load_bronnen,
    load_domain_files,
    load_filters,
    load_glossery,
    parse_frontmatter,
)

OUTPUT_FILE = os.path.join(CONTENT_DIR, 'knowledge-graph.json')
# Same graph, wrapped as a window global so the standalone kennisgraaf/ page can read it
# synchronously — works over http.server AND when opened directly as a file:// URL.
WEB_DATA_FILE = os.path.join(REPO_ROOT, 'kennisgraaf', 'graph-data.js')

# --- node id helpers (type-prefixed for global uniqueness) --------------------

def nid(kind, key):
    return f'{kind}:{key}'


# --- raw practice loader ------------------------------------------------------
# load_practice_files() in _content.py HTML-converts tables/lists in `body`.
# We want raw text only, so re-parse here using the same split rules.

def load_practices_raw():
    result = []
    for path in sorted(glob.glob(os.path.join(PRACTICES_DIR, '*.md'))):
        with open(path, encoding='utf-8') as f:
            fm, body = parse_frontmatter(f.read(), path)
        if '<!-- tips -->' in body:
            toelichting_raw, tips_raw = body.split('<!-- tips -->', 1)
        else:
            toelichting_raw, tips_raw = '', body
        fm['toelichting'] = [p.strip() for p in toelichting_raw.split('\n\n') if p.strip()]
        fm['body'] = [p.strip() for p in tips_raw.split('\n\n') if p.strip()]
        fm['_slug'] = os.path.splitext(os.path.basename(path))[0]
        result.append(fm)
    return result


# --- graph builder ------------------------------------------------------------

def build_graph():
    domains = sorted(load_domain_files(), key=lambda d: (d['id'] not in FUNDAMENT_IDS, d['nr']))
    practices = load_practices_raw()
    bronnen = load_bronnen()
    glossary = load_glossery()
    filters = load_filters()
    phases = filters.get('phases', [])
    levels = filters.get('levels', [])

    domain_ids = {d['id'] for d in domains}
    practice_ids = {p['id'] for p in practices}
    bron_ids = {b['id'] for b in bronnen}

    # Resolve a samenhang_blokken `naam` (a free-text display name of another domain,
    # sometimes a legacy/variant name) to a domain id. Strategies, in order:
    #   1. exact title match, 2. normalized title ('&' -> 'en'), 3. slug of naam == id,
    #   4. explicit alias for the two legacy domain renames.
    def _norm(s):
        return ' '.join(s.lower().replace('&', ' en ').split())

    def _slug(s):
        return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

    domain_by_title = {d['title'].strip().lower(): d['id'] for d in domains}
    domain_by_norm = {_norm(d['title']): d['id'] for d in domains}
    SAMENHANG_ALIASES = {
        'antwoordkwaliteit / kwaliteit van de output': 'antwoordkwaliteit',
        'gebruikerservaring en toegankelijkheid': 'gebruikerservaring',
    }

    def resolve_domain_name(naam):
        key = naam.strip().lower()
        if key in domain_by_title:
            return domain_by_title[key]
        if _norm(naam) in domain_by_norm:
            return domain_by_norm[_norm(naam)]
        if _slug(naam) in domain_ids:
            return _slug(naam)
        return SAMENHANG_ALIASES.get(key)

    nodes = []
    edges = []
    warnings = []
    _edge_seq = [0]

    def add_edge(source, target, etype, label, **extra):
        _edge_seq[0] += 1
        edge = {'id': f'e{_edge_seq[0]}', 'source': source, 'target': target,
                'type': etype, 'label': label}
        edge.update(extra)
        edges.append(edge)

    # reverse-lookup accumulators (filled while emitting edges, applied afterwards)
    domain_practices = {d['id']: [] for d in domains}
    bron_cited_by_practices = {b['id']: [] for b in bronnen}
    bron_cited_by_domains = {b['id']: [] for b in bronnen}
    bron_referenced_by_begrippen = {b['id']: [] for b in bronnen}
    phase_practices = {ph: [] for ph in phases}
    level_practices = {lv: [] for lv in levels}
    categorie_bronnen = {}

    # ---- practice nodes + their outgoing edges ----
    # collect related_practice as unordered pairs (bidirectional in the UI)
    related_pairs = set()
    related_of = {p['id']: set() for p in practices}

    for p in practices:
        pid = p['id']
        node_domains, node_sources = [], []

        for did in p.get('domains') or []:
            if did in domain_ids:
                add_edge(nid('practice', pid), nid('domain', did),
                         'practice_in_domain', 'hoort bij domein')
                node_domains.append(nid('domain', did))
                domain_practices[did].append(nid('practice', pid))
            else:
                warnings.append({'kind': 'unresolved_domain',
                                 'from': nid('practice', pid), 'ref': did})

        for sid in p.get('sources') or []:
            if sid in bron_ids:
                add_edge(nid('practice', pid), nid('bron', sid),
                         'cites_source', 'gebruikt bron')
                node_sources.append(nid('bron', sid))
                bron_cited_by_practices[sid].append(nid('practice', pid))
            else:
                warnings.append({'kind': 'unresolved_source',
                                 'from': nid('practice', pid), 'ref': sid})

        for other in p.get('good_practise') or []:
            if other in practice_ids:
                related_of[pid].add(other)
                related_of[other].add(pid)
                related_pairs.add(frozenset((pid, other)))
            else:
                warnings.append({'kind': 'unresolved_related_practice',
                                 'from': nid('practice', pid), 'ref': other})

        node_phases, node_levels = [], []
        for ph in p.get('phases') or []:
            if ph in phase_practices:
                add_edge(nid('practice', pid), nid('phase', ph), 'has_phase', 'geldt in fase')
                node_phases.append(nid('phase', ph))
                phase_practices[ph].append(nid('practice', pid))
            else:
                warnings.append({'kind': 'unknown_phase', 'from': nid('practice', pid), 'ref': ph})
        for lv in p.get('levels') or []:
            if lv in level_practices:
                add_edge(nid('practice', pid), nid('level', lv), 'has_level', 'relevant voor niveau')
                node_levels.append(nid('level', lv))
                level_practices[lv].append(nid('practice', pid))
            else:
                warnings.append({'kind': 'unknown_level', 'from': nid('practice', pid), 'ref': lv})

        nodes.append({
            'id': nid('practice', pid),
            'type': 'practice',
            'label': p.get('title', pid),
            'href': f'#/practices/{pid}',
            'data': {
                'id': pid,
                'title': p.get('title', ''),
                'summary': (p.get('summary') or '').strip(),
                'toelichting': p.get('toelichting', []),
                'body': p.get('body', []),
                'image': p.get('image', ''),
                'image_top': p.get('image_top', False),
            },
            'domains': node_domains,
            'sources': node_sources,
            'related_practices': [],  # filled below (needs full related_of)
            'phases': node_phases,
            'levels': node_levels,
        })

    # emit related_practice edges once per unordered pair
    for pair in sorted(related_pairs, key=lambda fs: sorted(fs)):
        a, b = sorted(pair)
        add_edge(nid('practice', a), nid('practice', b),
                 'related_practice', 'samenhangende good practice', undirected=True)
    # backfill related_practices convenience arrays
    node_by_id = {n['id']: n for n in nodes}
    for pid, rel in related_of.items():
        node_by_id[nid('practice', pid)]['related_practices'] = \
            [nid('practice', r) for r in sorted(rel)]

    # ---- domain nodes + their outgoing edges ----
    for d in domains:
        did = d['id']
        node_sources = []
        for sid in d.get('sources') or []:
            if sid in bron_ids:
                add_edge(nid('domain', did), nid('bron', sid),
                         'domain_cites_source', 'basiskennis bron')
                node_sources.append(nid('bron', sid))
                bron_cited_by_domains[sid].append(nid('domain', did))
            else:
                warnings.append({'kind': 'unresolved_source',
                                 'from': nid('domain', did), 'ref': sid})

        related_domains = []
        for blok in d.get('samenhang_blokken') or []:
            naam = (blok.get('naam') or '').strip()
            target_id = resolve_domain_name(naam)
            if target_id and target_id != did:
                add_edge(nid('domain', did), nid('domain', target_id),
                         'domain_related', 'samenhang met domein',
                         resolved=True, omschrijving=(blok.get('omschrijving') or '').strip())
                related_domains.append(nid('domain', target_id))
            else:
                warnings.append({'kind': 'unresolved_samenhang',
                                 'from': nid('domain', did), 'ref': naam})

        nodes.append({
            'id': nid('domain', did),
            'type': 'domain',
            'label': d.get('title', did),
            'href': f'#/domeinen/{did}',
            'data': {
                'id': did,
                'nr': d.get('nr'),
                'group': 'fundament' if did in FUNDAMENT_IDS else 'domein',
                'title': d.get('title', ''),
                'short': (d.get('short') or '').strip(),
                'wat': (d.get('wat_raw') or '').strip(),
                'waarom': (d.get('waarom_raw') or '').strip(),
                'status': d.get('status', 'published'),
                'samenhang_blokken': d.get('samenhang_blokken', []),
            },
            'practices': domain_practices[did],
            'sources': node_sources,
            'related_domains': related_domains,
        })

    # ---- begrip (glossary) nodes + their edges ----
    for g in glossary:
        gid = g['id']
        node_sources = []
        for sid in g.get('seeAlso') or []:
            if sid in bron_ids:
                add_edge(nid('begrip', gid), nid('bron', sid),
                         'glossary_references_source', 'zie ook bron')
                node_sources.append(nid('bron', sid))
                bron_referenced_by_begrippen[sid].append(nid('begrip', gid))
            else:
                warnings.append({'kind': 'unresolved_source',
                                 'from': nid('begrip', gid), 'ref': sid})
        nodes.append({
            'id': nid('begrip', gid),
            'type': 'begrip',
            'label': g.get('term', gid),
            'href': '#/begrippenlijst',
            'data': {
                'id': gid,
                'term': g.get('term', ''),
                'omschrijving': (g.get('omschrijving') or '').strip(),
            },
            'sources': node_sources,
        })

    # ---- bron nodes + categorie edges ----
    for b in bronnen:
        bid = b['id']
        categorie = (b.get('categorie') or '').strip()
        if categorie:
            categorie_bronnen.setdefault(categorie, []).append(nid('bron', bid))
            add_edge(nid('bron', bid), nid('categorie', categorie),
                     'bron_in_category', 'valt onder categorie')
        nodes.append({
            'id': nid('bron', bid),
            'type': 'bron',
            'label': b.get('title', bid),
            'href': b.get('url', ''),
            'data': {
                'id': bid,
                'title': b.get('title', ''),
                'categorie': categorie,
                'omschrijving': (b.get('omschrijving') or '').strip(),
                'url': b.get('url', ''),
            },
            'cited_by_practices': bron_cited_by_practices[bid],
            'cited_by_domains': bron_cited_by_domains[bid],
            'referenced_by_begrippen': bron_referenced_by_begrippen[bid],
        })

    # ---- filter vocabulary nodes ----
    for ph in phases:
        nodes.append({
            'id': nid('phase', ph), 'type': 'phase', 'label': ph, 'href': '#/practices',
            'data': {'value': ph}, 'practices': phase_practices[ph],
        })
    for lv in levels:
        nodes.append({
            'id': nid('level', lv), 'type': 'level', 'label': lv, 'href': '#/practices',
            'data': {'value': lv}, 'practices': level_practices[lv],
        })
    for cat in sorted(categorie_bronnen):
        nodes.append({
            'id': nid('categorie', cat), 'type': 'categorie', 'label': cat, 'href': '#/bronnen',
            'data': {'value': cat}, 'bronnen': categorie_bronnen[cat],
        })

    # ---- meta ----
    node_type_labels = {
        'domain': 'Domein', 'practice': 'Good practice', 'bron': 'Bron',
        'begrip': 'Begrip', 'phase': 'Fase', 'level': 'Organisatieniveau',
        'categorie': 'Broncategorie',
    }
    edge_type_defs = {
        'practice_in_domain': ('hoort bij domein', 'practice', 'domain'),
        'related_practice': ('samenhangende good practice', 'practice', 'practice'),
        'cites_source': ('gebruikt bron', 'practice', 'bron'),
        'domain_cites_source': ('basiskennis bron', 'domain', 'bron'),
        'glossary_references_source': ('zie ook bron', 'begrip', 'bron'),
        'has_phase': ('geldt in fase', 'practice', 'phase'),
        'has_level': ('relevant voor niveau', 'practice', 'level'),
        'bron_in_category': ('valt onder categorie', 'bron', 'categorie'),
        'domain_related': ('samenhang met domein', 'domain', 'domain'),
    }

    node_counts = {}
    for n in nodes:
        node_counts[n['type']] = node_counts.get(n['type'], 0) + 1
    edge_counts = {}
    for e in edges:
        edge_counts[e['type']] = edge_counts.get(e['type'], 0) + 1

    bron_categories = [{'name': cat, 'count': len(ids)}
                       for cat, ids in sorted(categorie_bronnen.items(),
                                              key=lambda kv: (-len(kv[1]), kv[0]))]

    meta = {
        'name': 'Raamwerk Digitale Assistent — Kennisgraaf',
        'language': 'nl',
        'generated_from': 'content/',
        'generator': 'scripts/build_graph.py',
        'counts': {**node_counts, 'nodes': len(nodes), 'edges': len(edges)},
        'node_types': [{'type': t, 'label': node_type_labels.get(t, t),
                        'count': node_counts.get(t, 0)}
                       for t in ['domain', 'practice', 'bron', 'begrip',
                                 'phase', 'level', 'categorie']],
        'edge_types': [{'type': t, 'label': lbl, 'from': frm, 'to': to,
                        'count': edge_counts.get(t, 0)}
                       for t, (lbl, frm, to) in edge_type_defs.items()],
        'filters': {'phases': phases, 'levels': levels, 'bron_categories': bron_categories},
        'warnings': warnings,
    }

    return {'meta': meta, 'nodes': nodes, 'edges': edges}


def main():
    graph = build_graph()
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(graph, f, ensure_ascii=False, indent=2)
        f.write('\n')

    # Also emit the graph as a window global for the standalone kennisgraaf/ page.
    if os.path.isdir(os.path.dirname(WEB_DATA_FILE)):
        with open(WEB_DATA_FILE, 'w', encoding='utf-8') as f:
            f.write('// Generated by scripts/build_graph.py — do not hand-edit.\n')
            f.write('// Canonical source: content/knowledge-graph.json\n')
            f.write('window.KNOWLEDGE_GRAPH = ')
            json.dump(graph, f, ensure_ascii=False, separators=(',', ':'))
            f.write(';\n')
        print(f'Written {WEB_DATA_FILE}')

    c = graph['meta']['counts']
    print(f'Written {OUTPUT_FILE}')
    print(f"  nodes: {c['nodes']} ("
          + ', '.join(f"{t}={c.get(t, 0)}" for t in
                      ['domain', 'practice', 'bron', 'begrip', 'phase', 'level', 'categorie'])
          + ')')
    print(f"  edges: {c['edges']}")
    if graph['meta']['warnings']:
        print(f"  warnings: {len(graph['meta']['warnings'])} "
              f"(see meta.warnings; samenhang name-misses are expected)")


if __name__ == '__main__':
    main()
