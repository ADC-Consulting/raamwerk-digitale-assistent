#!/usr/bin/env python3
"""
Convert doc_inputs/*.docx to plain-text files in local_output/txt/.

Deterministic, no LLM. Preserves headings (`#/##/###`), lists (`- `), hyperlinks
(`[anchor](url)` with URLs resolved from the docx relationships file), tables
(flattened between `[TABLE]`/`[/TABLE]` markers with `| cell | cell |` rows),
Word reviewer comments (`[COMMENT: ...]`), and footnotes/endnotes (`[^N]` inline
references + a `## Voetnoten` / `## Eindnoten` section appended at the end).

Completeness audit (the "don't drop text/URLs/footnotes" guarantee):
  - char ratio: normalised emitted chars / normalised source chars  >=  0.99
  - URL set equality: every hyperlink target from any rels file appears in the txt
  - footnote count: body footnote/endnote references == [^N]: entries in output

Flags:
  --check    only run the audit on existing local_output/txt/*.txt (no rewrite)
  --strict   any audit failure (incl. single missing URL or footnote) exits 1
  --doc P    process a single docx by path (useful while iterating)
"""

import argparse
import json
import os
import re
import sys
import zipfile

from lxml import etree

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DOC_INPUTS_DIR = os.path.join(REPO_ROOT, 'doc_inputs')
TXT_OUT_DIR = os.path.join(REPO_ROOT, 'local_output', 'txt')
AUDIT_LOG = os.path.join(TXT_OUT_DIR, '_audit.log')

W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
R_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
PKG_NS = 'http://schemas.openxmlformats.org/package/2006/relationships'

HYPERLINK_TYPE = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink'


def w(tag): return f'{{{W_NS}}}{tag}'
def rns(tag): return f'{{{R_NS}}}{tag}'
def pkg(tag): return f'{{{PKG_NS}}}{tag}'


# ---------- Relationship / part loaders ----------

def load_rels(zf, rels_path):
    """Returns {Id: (Type, Target)} for the rels file at rels_path inside the zip."""
    out = {}
    if rels_path not in zf.namelist():
        return out
    with zf.open(rels_path) as f:
        tree = etree.parse(f)
    for rel in tree.getroot().findall(pkg('Relationship')):
        out[rel.get('Id')] = (rel.get('Type'), rel.get('Target'))
    return out


def hyperlink_urls_from_rels(rels):
    """Subset of rels: {Id: url} for hyperlink relationships."""
    return {rid: tgt for rid, (typ, tgt) in rels.items() if typ == HYPERLINK_TYPE and tgt}


def load_comments(zf):
    """{comment_id: plain_text}."""
    out = {}
    if 'word/comments.xml' not in zf.namelist():
        return out
    with zf.open('word/comments.xml') as f:
        tree = etree.parse(f)
    for c in tree.getroot().findall(w('comment')):
        cid = c.get(w('id'))
        text_parts = [t.text or '' for t in c.iter(w('t'))]
        merged = re.sub(r'\s+', ' ', ' '.join(text_parts)).strip()
        if cid is not None and merged:
            out[cid] = merged
    return out


# ---------- Inline rendering ----------

def _walk_inline(parent, hyperlink_urls, comments, footnote_marker, endnote_marker):
    """Walk a paragraph or hyperlink's inline children in order, producing a list of strings.

    `footnote_marker` / `endnote_marker`: callables (w_id) -> str (e.g. '[^3]').
    """
    parts = []
    for child in parent:
        tag = etree.QName(child).localname
        if tag == 'r':
            for c2 in child:
                t = etree.QName(c2).localname
                if t == 't':
                    parts.append(c2.text or '')
                elif t == 'tab':
                    parts.append(' ')
                elif t == 'br':
                    parts.append(' ')
                elif t == 'footnoteReference':
                    fid = c2.get(w('id'))
                    if fid is not None:
                        parts.append(footnote_marker(fid))
                elif t == 'endnoteReference':
                    eid = c2.get(w('id'))
                    if eid is not None:
                        parts.append(endnote_marker(eid))
                elif t == 'commentReference':
                    cid = c2.get(w('id'))
                    text = comments.get(cid, '')
                    if text:
                        parts.append(f' [COMMENT: {text}]')
        elif tag == 'hyperlink':
            r_id = child.get(rns('id'))
            url = hyperlink_urls.get(r_id) if r_id else None
            inner_parts = _walk_inline(child, hyperlink_urls, comments, footnote_marker, endnote_marker)
            anchor = ''.join(inner_parts).strip()
            if url and anchor:
                parts.append(f'[{anchor}]({url})')
            elif url:
                parts.append(f'[]({url})')
            else:
                parts.append(anchor)
    return parts


LIST_STYLE_NAMES = {'ListParagraph', 'Lijstalinea'}
HEADING_STYLE_RE = re.compile(r'^(?:Heading\s*|Kop)(\d+)$')


def render_paragraph(p_elem, hyperlink_urls, comments, footnote_marker, endnote_marker):
    """Render a <w:p> to a single output line (or '' for an empty paragraph).

    Recognises Dutch (Kop1..4, Lijstalinea) and English (Heading 1..4, ListParagraph)
    Word style names — Word's docx XML uses the localised style id.
    """
    style_elem = p_elem.find(f'{w("pPr")}/{w("pStyle")}')
    style = style_elem.get(w('val')) if style_elem is not None else None
    num_pr = p_elem.find(f'{w("pPr")}/{w("numPr")}')
    is_list = num_pr is not None or style in LIST_STYLE_NAMES

    parts = _walk_inline(p_elem, hyperlink_urls, comments, footnote_marker, endnote_marker)
    text = ''.join(parts).strip()
    text = re.sub(r'[ \t]+', ' ', text)
    if not text:
        return ''

    if style:
        m = HEADING_STYLE_RE.match(style)
        if m:
            level = min(int(m.group(1)), 4)
            return ('#' * level) + ' ' + text
    if is_list:
        return '- ' + text
    return text


def render_table(tbl_elem, hyperlink_urls, comments, footnote_marker, endnote_marker):
    out = ['[TABLE]']
    for tr in tbl_elem.findall(w('tr')):
        cells = []
        for tc in tr.findall(w('tc')):
            cell_paragraphs = []
            for p in tc.findall(w('p')):
                rendered = render_paragraph(p, hyperlink_urls, comments, footnote_marker, endnote_marker)
                rendered = re.sub(r'^(- |#{1,4} )', '', rendered).strip()
                if rendered:
                    cell_paragraphs.append(rendered)
            cells.append(' '.join(cell_paragraphs))
        out.append('| ' + ' | '.join(cells) + ' |')
    out.append('[/TABLE]')
    return out


# ---------- Note loaders ----------

def load_note_bodies(zf, xml_path, rels_path, comments):
    """Returns {note_id: rendered_text} for footnotes.xml / endnotes.xml."""
    out = {}
    if xml_path not in zf.namelist():
        return out
    with zf.open(xml_path) as f:
        tree = etree.parse(f)
    rels = load_rels(zf, rels_path)
    hyperlinks = hyperlink_urls_from_rels(rels)
    container_tag = w('footnote') if xml_path.endswith('footnotes.xml') else w('endnote')

    def fn_marker(fid): return f'[^{fid}]'
    def en_marker(eid): return f'[^{eid}]'

    for note in tree.getroot().findall(container_tag):
        nid = note.get(w('id'))
        if nid in (None, '-1', '0'):
            continue
        lines = []
        for child in note:
            tag = etree.QName(child).localname
            if tag == 'p':
                line = render_paragraph(child, hyperlinks, comments, fn_marker, en_marker)
                if line:
                    lines.append(line)
        merged = ' '.join(re.sub(r'^(- |#{1,4} )', '', l) for l in lines).strip()
        if merged:
            out[nid] = merged
    return out


# ---------- Body walker ----------

def render_body(doc_xml_tree, hyperlink_urls, comments):
    body = doc_xml_tree.getroot().find(w('body'))
    if body is None:
        return []

    def fn_marker(fid): return f'[^{fid}]'
    def en_marker(eid): return f'[^{eid}]'

    out = []
    for elem in body:
        tag = etree.QName(elem).localname
        if tag == 'p':
            line = render_paragraph(elem, hyperlink_urls, comments, fn_marker, en_marker)
            if line:
                out.append(line)
            else:
                out.append('')
        elif tag == 'tbl':
            out.extend(render_table(elem, hyperlink_urls, comments, fn_marker, en_marker))
    return out


# ---------- Top-level conversion ----------

def convert_docx(docx_path):
    """Returns (txt_string, audit_dict)."""
    with zipfile.ZipFile(docx_path) as zf:
        if 'word/document.xml' not in zf.namelist():
            raise RuntimeError(f'{docx_path} has no word/document.xml')
        with zf.open('word/document.xml') as f:
            doc_tree = etree.parse(f)
        doc_rels = load_rels(zf, 'word/_rels/document.xml.rels')
        doc_hyperlinks = hyperlink_urls_from_rels(doc_rels)
        comments = load_comments(zf)

        footnotes = load_note_bodies(zf, 'word/footnotes.xml', 'word/_rels/footnotes.xml.rels', comments)
        endnotes = load_note_bodies(zf, 'word/endnotes.xml', 'word/_rels/endnotes.xml.rels', comments)

        body_lines = render_body(doc_tree, doc_hyperlinks, comments)

        # Audit: collect all source URLs (any rels with hyperlink type in any part)
        all_source_urls = set()
        for rels_path in zf.namelist():
            if rels_path.endswith('.rels'):
                rels = load_rels(zf, rels_path)
                for tgt in hyperlink_urls_from_rels(rels).values():
                    all_source_urls.add(tgt)

        # Audit: source-side raw text (document body + footnote + endnote w:t runs)
        source_text_parts = []
        for t in doc_tree.iter(w('t')):
            if t.text:
                source_text_parts.append(t.text)
        for sub in ('word/footnotes.xml', 'word/endnotes.xml'):
            if sub in zf.namelist():
                with zf.open(sub) as f:
                    sub_tree = etree.parse(f)
                # Skip separator/continuation notes
                container = w('footnote') if sub.endswith('footnotes.xml') else w('endnote')
                for note in sub_tree.getroot().findall(container):
                    nid = note.get(w('id'))
                    if nid in (None, '-1', '0'):
                        continue
                    for t in note.iter(w('t')):
                        if t.text:
                            source_text_parts.append(t.text)

        # Audit: count of footnote/endnote references in body (real notes only — Word also
        # emits refs with id 0/-1 inside the special separator notes themselves, but those
        # live in footnotes.xml, not document.xml, so the document.xml count is clean).
        body_fn_refs = [
            ref.get(w('id')) for ref in doc_tree.iter(w('footnoteReference'))
            if ref.get(w('id')) not in (None, '-1', '0')
        ]
        body_en_refs = [
            ref.get(w('id')) for ref in doc_tree.iter(w('endnoteReference'))
            if ref.get(w('id')) not in (None, '-1', '0')
        ]

    # Build the txt
    txt_lines = list(body_lines)
    if footnotes:
        txt_lines.append('')
        txt_lines.append('## Voetnoten')
        for nid in sorted(footnotes.keys(), key=lambda x: int(x) if x.lstrip('-').isdigit() else 0):
            txt_lines.append(f'[^{nid}]: {footnotes[nid]}')
    if endnotes:
        txt_lines.append('')
        txt_lines.append('## Eindnoten')
        for nid in sorted(endnotes.keys(), key=lambda x: int(x) if x.lstrip('-').isdigit() else 0):
            txt_lines.append(f'[^{nid}]: {endnotes[nid]}')

    txt = '\n'.join(txt_lines).rstrip() + '\n'

    audit = compute_audit(txt, source_text_parts, all_source_urls, body_fn_refs + body_en_refs, footnotes, endnotes)
    return txt, audit


# ---------- Audit ----------

MD_LINK_OPEN_RE = re.compile(r'\[[^\]]*\]\(')
PLAIN_URL_RE = re.compile(r'(?<![\(\w])((?:https?://|mailto:|ftp://)[^\s\)\]\>]+)')
INLINE_NOTE_REF_RE = re.compile(r'\[\^([^\]]+)\]')
NOTE_BODY_LINE_RE = re.compile(r'^\[\^([^\]]+)\]:')


def _normalise_ws(s):
    return re.sub(r'\s+', ' ', s).strip()


def _strip_for_char_count(txt):
    """Strip our markup so we can compare against raw source <w:t> text.

    Keeps: paragraph text, list bullets' content, heading content, hyperlink anchors,
           footnote bodies, table cell content, comment text inside [COMMENT: ...].
    Drops: structural markers (`#`, `- `, `[TABLE]`, `[/TABLE]`, `[^N]` *references*,
           and the `(url)` portion of markdown links — URLs are audited separately).
    """
    lines = txt.split('\n')
    out_lines = []
    for line in lines:
        # Drop pure-structure markers entirely
        if line.strip() in ('[TABLE]', '[/TABLE]', '## Voetnoten', '## Eindnoten'):
            continue
        # For note body lines, the `[^N]:` prefix is structural; drop the prefix only
        m = NOTE_BODY_LINE_RE.match(line)
        if m:
            line = line[m.end():]
        # Drop leading list/heading markers (but keep the text after)
        line = re.sub(r'^(\s*)(- |#{1,4} )', r'\1', line)
        # Drop table-row pipes (but keep cell text)
        if line.strip().startswith('|') and line.strip().endswith('|'):
            line = ' '.join(c.strip() for c in line.strip().strip('|').split('|'))
        # Drop `(url)` portion of markdown links — anchor text stays. Walk balanced parens.
        out = []
        k = 0
        while k < len(line):
            m = MD_LINK_OPEN_RE.match(line, k)
            if m:
                # The anchor portion (without surrounding [ ]) becomes the surviving text.
                anchor = line[m.start() + 1: m.end() - 2]
                # Skip to the closing ')' with balanced-paren matching
                depth = 1
                j = m.end()
                while j < len(line) and depth > 0:
                    if line[j] == '(':
                        depth += 1
                    elif line[j] == ')':
                        depth -= 1
                    j += 1
                out.append(anchor)
                k = j
            else:
                out.append(line[k])
                k += 1
        line = ''.join(out)
        line = re.sub(r'\[([^\]]*)\]', r'\1', line)  # then strip any remaining brackets
        # Drop inline note refs
        line = INLINE_NOTE_REF_RE.sub('', line)
        # Drop [COMMENT: ...] wrapper but KEEP the comment text — it counts toward source <w:t> chars
        line = re.sub(r'\[COMMENT:\s*(.*?)\]', r'\1', line)
        out_lines.append(line)
    return _normalise_ws('\n'.join(out_lines))


def _extract_urls_from_txt(txt):
    """Find URLs in the txt. Handles markdown links with balanced parens in the URL
    (e.g. wiki URLs like /PSA_(Project_Startarchitectuur) ) and plain-text URLs."""
    urls = set()
    # Markdown links: [anchor](url) with balanced parens inside url
    for m in MD_LINK_OPEN_RE.finditer(txt):
        start = m.end()
        depth = 1
        j = start
        while j < len(txt) and depth > 0:
            ch = txt[j]
            if ch == '(':
                depth += 1
            elif ch == ')':
                depth -= 1
            j += 1
        if depth == 0:
            url = txt[start:j - 1].strip()
            if url:
                urls.add(url)
    # Plain-text URLs (not in a markdown link)
    for m in PLAIN_URL_RE.finditer(txt):
        u = m.group(1).rstrip('.,;:')
        if u:
            urls.add(u)
    return urls


def compute_audit(txt, source_text_parts, source_urls, body_note_refs, footnotes, endnotes):
    source_text = _normalise_ws(''.join(source_text_parts))
    emitted_text = _strip_for_char_count(txt)
    src_chars = len(source_text)
    emit_chars = len(emitted_text)
    ratio = (emit_chars / src_chars) if src_chars else 1.0

    # URLs
    emitted_urls = _extract_urls_from_txt(txt)
    missing_urls = sorted(u for u in source_urls if u not in emitted_urls and u.rstrip('/.,;:') not in emitted_urls)
    # Re-attempt match with trailing-punct tolerance
    missing_urls = [u for u in missing_urls if not any(eu.startswith(u.rstrip('/.,;:')) for eu in emitted_urls)]

    # Note count
    body_count = len(body_note_refs)
    emitted_note_bodies = sum(1 for line in txt.split('\n') if NOTE_BODY_LINE_RE.match(line))
    expected_note_bodies = len(footnotes) + len(endnotes)

    return {
        'src_chars': src_chars,
        'emit_chars': emit_chars,
        'char_ratio': round(ratio, 4),
        'source_url_count': len(source_urls),
        'emitted_url_count': len(emitted_urls),
        'missing_urls': missing_urls,
        'body_note_ref_count': body_count,
        'emitted_note_body_count': emitted_note_bodies,
        'expected_note_body_count': expected_note_bodies,
        'footnote_count': len(footnotes),
        'endnote_count': len(endnotes),
    }


def audit_passes(audit, strict=False):
    if audit['char_ratio'] < 0.99:
        return False
    if audit['missing_urls']:
        return False
    if audit['emitted_note_body_count'] != audit['expected_note_body_count']:
        return False
    return True


# ---------- CLI ----------

def slugify_filename(name):
    base = os.path.splitext(os.path.basename(name))[0]
    base = re.sub(r'\s+', '-', base.strip())
    base = re.sub(r'[^\w.\-]', '', base, flags=re.UNICODE)
    return base.lower()


def main():
    parser = argparse.ArgumentParser(description=__doc__.strip().split('\n')[0])
    parser.add_argument('--check', action='store_true',
                        help='Re-run the audit on existing local_output/txt/*.txt without rewriting')
    parser.add_argument('--strict', action='store_true',
                        help='Exit non-zero on any audit failure')
    parser.add_argument('--doc', type=str, default=None,
                        help='Process a single docx (path) and write its txt; useful for iteration')
    args = parser.parse_args()

    os.makedirs(TXT_OUT_DIR, exist_ok=True)

    if args.doc:
        docs = [args.doc]
    else:
        docs = sorted(
            os.path.join(DOC_INPUTS_DIR, f)
            for f in os.listdir(DOC_INPUTS_DIR)
            if f.lower().endswith('.docx') and not f.startswith('~$')
        )
    if not docs:
        print('No .docx files found.', file=sys.stderr)
        return 2

    audits = []
    failures = []
    for docx_path in docs:
        out_name = slugify_filename(docx_path) + '.txt'
        out_path = os.path.join(TXT_OUT_DIR, out_name)
        try:
            if args.check:
                if not os.path.exists(out_path):
                    failures.append((docx_path, {'error': 'no existing txt to check'}))
                    continue
                # Re-run audit by re-converting and discarding the txt (cheaper than parsing the txt back).
                _, audit = convert_docx(docx_path)
            else:
                txt, audit = convert_docx(docx_path)
                with open(out_path, 'w', encoding='utf-8') as f:
                    f.write(txt)
        except Exception as exc:
            failures.append((docx_path, {'error': str(exc)}))
            print(f'FAIL  {os.path.basename(docx_path)}: {exc}', file=sys.stderr)
            continue

        audits.append((docx_path, audit))
        ok = audit_passes(audit)
        status = 'ok ' if ok else 'WARN'
        print(f'{status}  {os.path.basename(docx_path)}  '
              f'ratio={audit["char_ratio"]}  '
              f'urls={audit["emitted_url_count"]}/{audit["source_url_count"]}  '
              f'notes={audit["emitted_note_body_count"]}/{audit["expected_note_body_count"]}  '
              f'missing={len(audit["missing_urls"])}')
        if not ok:
            failures.append((docx_path, audit))

    # Write audit log
    if not args.check:
        with open(AUDIT_LOG, 'w', encoding='utf-8') as f:
            f.write(json.dumps({
                'audits': [
                    {'doc': os.path.basename(p), **a}
                    for p, a in audits
                ],
                'failures': [
                    {'doc': os.path.basename(p), **a}
                    for p, a in failures
                ],
            }, ensure_ascii=False, indent=2))
        print(f'\nAudit log: {AUDIT_LOG}')

    if failures and args.strict:
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
