#!/usr/bin/env python3
"""
Rasterises the per-onderwerp line icons into 16x16 glyph masks and writes js/glyph-data.js.

Run: python3 scripts/glyphs/build_glyphs.py     (needs rsvg-convert and Pillow)

Each icon is drawn at 96x96, the alpha channel is averaged per 6x6 cell, and a cell
is "on" when coverage exceeds THRESHOLD. The 256 resulting bits ship as 64 hex chars,
so the browser renders a glyph synchronously instead of rasterising on every load.

Ontwerpprincipes section 6 fixes the grid, the threshold and the three render variants.
"""

import os
import subprocess
import sys
import tempfile

from PIL import Image

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DOMAINS_DIR = os.path.join(REPO_ROOT, 'content', 'domains')
OUTPUT_FILE = os.path.join(REPO_ROOT, 'js', 'glyph-data.js')

N = 16          # grid is N x N cells
S = 96          # render size in px
K = S // N      # cell size in px
THRESHOLD = 0.28

# Line icons per onderwerp: viewBox 24x24, stroke-width 2, round caps and joins.
# The id must match a file in content/domains/.
ICONS = {
    'cultuur-adoptie':
        '<circle cx="7" cy="8" r="2.5"/><circle cx="17" cy="8" r="2.5"/>'
        '<circle cx="12" cy="16" r="2.5"/><path d="M9 9.5 11 14M15 9.5 13 14"/>',
    'kennis-capaciteit':
        '<path d="M4 5h7a3 3 0 0 1 3 3v12"/><path d="M20 5h-3a3 3 0 0 0-3 3v12"/>'
        '<path d="M4 5v14h7"/><path d="M20 5v14h-3"/>',
    'governance':
        '<path d="M4 20h16M5 20V9M9 20V9M15 20V9M19 20V9M4 9l8-5 8 5"/>',
    'infrastructuur-data':
        '<ellipse cx="12" cy="6" rx="7" ry="2.5"/>'
        '<path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6"/>'
        '<path d="M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6"/>',
    'evaluatie-assistent':
        '<circle cx="10" cy="10" r="6"/><path d="m15 15 4 4"/><path d="M7 12l2-3 2 2 2-4"/>',
    'antwoordkwaliteit':
        '<path d="M5 7h14M5 12h10M5 17h7"/><path d="m17 15 2 2 4-4"/>',
    'gebruikerservaring':
        '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/>',
    'technische-prestaties':
        '<path d="M3 18h18"/><path d="m5 14 4-5 4 3 6-8"/><circle cx="5" cy="14" r="1.4"/>'
        '<circle cx="9" cy="9" r="1.4"/><circle cx="13" cy="12" r="1.4"/>'
        '<circle cx="19" cy="4" r="1.4"/>',
    'functionaliteit':
        '<rect x="3" y="3" width="7" height="7" rx="1"/>'
        '<rect x="14" y="3" width="7" height="7" rx="1"/>'
        '<rect x="3" y="14" width="7" height="7" rx="1"/>'
        '<rect x="14" y="14" width="7" height="7" rx="3.5"/>',
    'duurzaamheid':
        '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>'
        '<path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
    'digitale-soevereiniteit':
        '<path d="M12 3 4 6v6c0 4.5 3 7.5 8 9 5-1.5 8-4.5 8-9V6l-8-3z"/><path d="m9 12 2 2 4-4"/>',
    'ethiek-mensenrechten':
        '<path d="M12 3v18M5 7h14M3 12c2 3 5 3 6 0M15 12c1 3 4 3 6 0"/>',
    'compliance':
        '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    'beveiliging':
        '<rect x="5" y="10" width="14" height="10" rx="2"/>'
        '<path d="M8 10V7a4 4 0 0 1 8 0v3"/>'
        '<circle cx="12" cy="15" r="1.2" fill="currentColor"/>',
}


def wrap_svg(inner):
    inner = inner.replace('currentColor', '#000')
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" '
        'width="%d" height="%d">'
        '<g fill="none" stroke="#000" stroke-width="2" '
        'stroke-linecap="round" stroke-linejoin="round">%s</g></svg>'
    ) % (S, S, inner)


def coverage(inner, workdir):
    """Render one icon and return N*N alpha-coverage floats, row-major."""
    svg_path = os.path.join(workdir, 'icon.svg')
    png_path = os.path.join(workdir, 'icon.png')
    with open(svg_path, 'w', encoding='utf-8') as fh:
        fh.write(wrap_svg(inner))
    subprocess.run(['rsvg-convert', svg_path, '-o', png_path], check=True)

    alpha = Image.open(png_path).convert('RGBA').split()[3]
    if alpha.size != (S, S):
        raise SystemExit('rsvg-convert produced %s, expected %dx%d' % (alpha.size, S, S))
    px = alpha.load()

    cells = []
    for row in range(N):
        for col in range(N):
            total = 0
            for yy in range(K):
                for xx in range(K):
                    total += px[col * K + xx, row * K + yy]
            cells.append(total / (K * K * 255))
    return cells


def to_hex_mask(cells):
    """256 coverage floats -> 64 hex chars, most significant bit = cell 0."""
    bits = ''.join('1' if v > THRESHOLD else '0' for v in cells)
    return '%064x' % int(bits, 2)


def main():
    known = {f[:-3] for f in os.listdir(DOMAINS_DIR) if f.endswith('.md')}
    missing = known - set(ICONS)
    unknown = set(ICONS) - known
    if missing:
        raise SystemExit('No icon defined for: %s' % ', '.join(sorted(missing)))
    if unknown:
        raise SystemExit('Icon defined for unknown onderwerp: %s' % ', '.join(sorted(unknown)))

    masks = {}
    with tempfile.TemporaryDirectory() as workdir:
        for glyph_id, inner in ICONS.items():
            cells = coverage(inner, workdir)
            masks[glyph_id] = to_hex_mask(cells)
            on = sum(1 for v in cells if v > THRESHOLD)
            print('%-26s %3d/%d cells on' % (glyph_id, on, N * N))

    lines = [
        '// GENERATED by scripts/glyphs/build_glyphs.py - do not edit.',
        '// One %dx%d mask per onderwerp as %d hex chars; bit 0 is the top-left cell.' % (N, N, N * N // 4),
        'window.GLYPH_BITS = {',
    ]
    for glyph_id in sorted(masks):
        lines.append("  '%s': '%s'," % (glyph_id, masks[glyph_id]))
    lines.append('};')
    lines.append('window.GLYPH_GRID = %d;' % N)
    lines.append('')

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as fh:
        fh.write('\n'.join(lines))
    print('\nWritten %s (%d masks)' % (OUTPUT_FILE, len(masks)))


if __name__ == '__main__':
    sys.exit(main())
