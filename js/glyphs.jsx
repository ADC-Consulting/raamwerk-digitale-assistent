/* global React */

/* ===== Glyphs =====
   Each onderwerp has a 16x16 mask in js/glyph-data.js (see scripts/glyphs/build_glyphs.py).
   Shape carries meaning: fundamenten are squares, domeinen are dots.
   The svg fills its parent, so callers size the box in CSS. */

const GLYPH_N = window.GLYPH_GRID;

const _glyphCache = new Map();

function glyphCells(id) {
  const hex = window.GLYPH_BITS[id];
  const cells = [];
  for (let j = 0; j < hex.length; j++) {
    const nib = parseInt(hex[j], 16);
    cells.push((nib & 8) !== 0, (nib & 4) !== 0, (nib & 2) !== 0, (nib & 1) !== 0);
  }
  return cells;
}

function glyphShapes(id, variant) {
  const cells = glyphCells(id);
  const shapes = [];
  cells.forEach((on, i) => {
    const x = i % GLYPH_N;
    const y = Math.floor(i / GLYPH_N);
    if (variant === 'dot') {
      shapes.push(on
        ? <circle key={i} cx={x + 0.5} cy={y + 0.5} r={0.44}/>
        : <circle key={i} cx={x + 0.5} cy={y + 0.5} r={0.09} opacity={0.3}/>);
    } else if (variant === 'ghost') {
      shapes.push(<rect key={i} x={x + 0.08} y={y + 0.08} width={0.84} height={0.84} opacity={on ? 1 : 0.07}/>);
    } else if (on) {
      shapes.push(<rect key={i} x={x + 0.07} y={y + 0.07} width={0.86} height={0.86}/>);
    }
  });
  return shapes;
}

function Glyph({ id, variant = 'sq', className }) {
  const key = id + ':' + variant;
  if (!_glyphCache.has(key)) _glyphCache.set(key, glyphShapes(id, variant));
  return (
    <svg
      viewBox={'0 0 ' + GLYPH_N + ' ' + GLYPH_N}
      className={'glyph' + (className ? ' ' + className : '')}
      fill="currentColor"
      aria-hidden="true"
    >
      {_glyphCache.get(key)}
    </svg>
  );
}

Object.assign(window, { Glyph });
