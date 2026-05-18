/* global React, navigate, DOMAINS, gsap */
const { useState: useStateD, useRef: useRefD, useEffect: useEffectD, useMemo: useMemoD } = React;

/* Variant B1 — "Schoon" (clean) expanding diagram.
   Closed state : 4 fundament half-rings around a dark "Digitale Assistent" disc.
   Open state   : the rings glide outward, revealing 9 floating chips around the
                  center; each chip carries the domain glyph and number, and links
                  to its detail page.
   No spokes, no orbit-ring — just the chips themselves, in a single brand color.
*/

const _polar = (cx, cy, r, deg) => {
  const a = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};
function _annulus(cx, cy, rOut, rIn, startA, endA) {
  const [x1, y1] = _polar(cx, cy, rOut, startA);
  const [x2, y2] = _polar(cx, cy, rOut, endA);
  const [x3, y3] = _polar(cx, cy, rIn,  endA);
  const [x4, y4] = _polar(cx, cy, rIn,  startA);
  const large = ((endA - startA + 360) % 360) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${rOut} ${rOut} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${rIn} ${rIn} 0 ${large} 0 ${x4} ${y4} Z`;
}

/* Same icon set as chrome.jsx's DomainGlyph, but redrawn around the origin
   so each chip can be a <g> translated to its orbit position. Stroke is white,
   1.4 px, rounded caps. */
const CHIP_GLYPH = {
  'antwoordkwaliteit':       <g><path d="M-7 -5h12M-7 0h8M-7 5h5"/><path d="m2 3 2 2 5-5"/></g>,
  'gebruikerservaring':      <g><circle cx="0" cy="-3" r="3"/><path d="M-7 7c1.4-3.2 3.6-4.5 7-4.5s5.6 1.3 7 4.5"/></g>,
  'technische-prestaties':   <g><path d="M-8 6h16"/><path d="m-7 2 4-5 4 3 6-8"/></g>,
  'functionaliteit':         <g><rect x="-7" y="-7" width="5.5" height="5.5" rx=".8"/><rect x="1.5" y="-7" width="5.5" height="5.5" rx=".8"/><rect x="-7" y="1.5" width="5.5" height="5.5" rx=".8"/><rect x="1.5" y="1.5" width="5.5" height="5.5" rx="2.75"/></g>,
  'duurzaamheid':            <g><path d="M-1 7a5 5 0 0 1-1-9.5C3 -3 4 -3.5 6 -6c1 1.6 1.5 3 1.5 5.5 0 4-3.5 7-7.5 7z"/><path d="M-7 7c0-2.2 1.4-3.8 3.6-4.2"/></g>,
  'digitale-soevereiniteit': <g><path d="M0-7-6-4.5v4c0 3.3 2.2 5.4 6 6.4 3.8-1 6-3.1 6-6.4v-4L0-7z"/><path d="m-2.5 0 2 2 3.5-3.5"/></g>,
  'ethiek-mensenrechten':    <g><path d="M0-7V7 M-6-3H6 M-7 0c1.5 2.2 3.7 2.2 4.5 0 M2.5 0c.8 2.2 3 2.2 4.5 0"/></g>,
  'compliance':              <g><rect x="-6" y="-7" width="12" height="14" rx="1.4"/><path d="M-3-3H3 M-3 0H3 M-3 3H1"/></g>,
  'beveiliging':             <g><rect x="-5.5" y="-1.5" width="11" height="8.5" rx="1.4"/><path d="M-3-1.5V-3.5a3 3 0 0 1 6 0v2"/><circle cx="0" cy="3" r="1" fill="currentColor" stroke="none"/></g>,
};

/* Ring geometry — closed = original concentric layout; open = pushed outward. */
const _RING_SEGS = [
  { id: 'governance',          band: 'out', half: 'top',    label: 'Governance' },
  { id: 'infrastructuur-data', band: 'out', half: 'bottom', label: 'Infrastructuur & Data' },
  { id: 'cultuur-adoptie',     band: 'mid', half: 'top',    label: 'Cultuur & Adoptie' },
  { id: 'kennis-capaciteit',   band: 'mid', half: 'bottom', label: 'Kennis & Capaciteit' },
];

function FrameworkDiagram({ onSelectDomain, onSelectAll }) {
  const SIZE = 560;
  const cx = SIZE / 2, cy = SIZE / 2;
  // Outer edge (outOut) stays ~constant between states — the rings just
  // thin out and shift outward to make room for the 9 chips when opened.
  const RADII = useMemoD(() => ({
    closed: { midIn: 95,  midOut: 180, outIn: 180, outOut: 268 },
    open:   { midIn: 170, midOut: 215, outIn: 225, outOut: 270 },
  }), []);
  const radii = useRefD({ ...RADII.closed });
  const rOrbit = 116;

  const [open, setOpen] = useStateD(false);
  const [hover, setHover] = useStateD(null);

  const ringRefs   = useRefD({});
  const labelRefs  = useRefD({});
  const chipRefs   = useRefD({});
  const seamRefs   = useRefD({}); // thin lines at the equator that split each ring's halves
  const baseCircleRef = useRefD(null);

  // Pull the 9 sub-domeinen from the global DOMAINS array, ordered by nr.
  const subDomains = useMemoD(() => {
    const fundamentIds = new Set(_RING_SEGS.map(r => r.id));
    return (typeof DOMAINS !== 'undefined' ? DOMAINS : [])
      .filter(d => !fundamentIds.has(d.id))
      .sort((a, b) => (a.nr || 99) - (b.nr || 99));
  }, []);

  const chipGeo = useMemoD(() => {
    const N = subDomains.length || 9;
    const step = 360 / N;
    return subDomains.map((d, i) => {
      const angle = -90 + (i + 0.5) * step;
      const a = angle * Math.PI / 180;
      return { ...d, x: cx + rOrbit * Math.cos(a), y: cy + rOrbit * Math.sin(a) };
    });
  }, [subDomains]);

  function buildD(band, half, r) {
    const rOut = band === 'out' ? r.outOut : r.midOut;
    const rIn  = band === 'out' ? r.outIn  : r.midIn;
    const [s, e] = half === 'top' ? [270, 90] : [90, 270];
    return _annulus(cx, cy, rOut, rIn, s, e);
  }
  function labelY(band, half, r) {
    const rOut = band === 'out' ? r.outOut : r.midOut;
    const rIn  = band === 'out' ? r.outIn  : r.midIn;
    const mid = (rOut + rIn) / 2;
    return half === 'top' ? cy - mid : cy + mid;
  }
  function applyRadii() {
    const r = radii.current;
    _RING_SEGS.forEach(ring => {
      ringRefs.current[ring.id]?.setAttribute('d', buildD(ring.band, ring.half, r));
      labelRefs.current[ring.id]?.setAttribute('y', String(labelY(ring.band, ring.half, r)));
    });
    // Seam lines at y = cy that visually split each ring's two halves.
    const seams = {
      outLeft:  [cx - r.outOut, cx - r.outIn],
      outRight: [cx + r.outIn,  cx + r.outOut],
      midLeft:  [cx - r.midOut, cx - r.midIn],
      midRight: [cx + r.midIn,  cx + r.midOut],
    };
    Object.entries(seams).forEach(([key, [x1, x2]]) => {
      const el = seamRefs.current[key];
      if (!el) return;
      el.setAttribute('x1', String(x1));
      el.setAttribute('x2', String(x2));
    });
    if (baseCircleRef.current) baseCircleRef.current.setAttribute('r', String(r.outOut));
  }

  /* Initial closed-state setup */
  useEffectD(() => {
    applyRadii();
    if (typeof gsap === 'undefined') return;
    chipGeo.forEach(d => {
      const el = chipRefs.current[d.id];
      if (el) gsap.set(el, { x: cx, y: cy, scale: 0.2, opacity: 0, transformOrigin: '0 0' });
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  /* Open / close timeline */
  useEffectD(() => {
    if (typeof gsap === 'undefined') {
      // Graceful fallback: jump to the target state without animation.
      Object.assign(radii.current, open ? RADII.open : RADII.closed);
      applyRadii();
      chipGeo.forEach(d => {
        const el = chipRefs.current[d.id];
        if (!el) return;
        if (open) { el.setAttribute('transform', `translate(${d.x} ${d.y})`); el.style.opacity = 1; }
        else      { el.setAttribute('transform', `translate(${cx} ${cy})`);   el.style.opacity = 0; }
      });
      return;
    }
    const target = open ? RADII.open : RADII.closed;
    const tl = gsap.timeline();
    tl.to(radii.current, { ...target, duration: .8, ease: 'expo.inOut', onUpdate: applyRadii }, 0);
    _RING_SEGS.forEach(ring => {
      const el = ringRefs.current[ring.id];
      if (el) tl.to(el, { opacity: open ? .85 : 1, duration: .4 }, 0);
    });
    chipGeo.forEach((d, i) => {
      const el = chipRefs.current[d.id];
      if (!el) return;
      if (open) tl.to(el, { x: d.x, y: d.y, scale: 1, opacity: 1, duration: .55, ease: 'back.out(1.4)' }, .2 + i * 0.04);
      else      tl.to(el, { x: cx, y: cy, scale: .2, opacity: 0, duration: .35, ease: 'power2.in' }, i * 0.02);
    });
  }, [open, chipGeo, RADII]);

  /* ESC closes the open state */
  useEffectD(() => {
    if (!open) return;
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function handleCenterClick(e) {
    e.stopPropagation();
    setOpen(o => !o);
  }
  function handleCenterKey(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCenterClick(e); }
  }

  const hoveredChip = chipGeo.find(d => d.id === hover);
  const hoveredRing = _RING_SEGS.find(r => r.id === hover);

  return (
    <div className={'diagram-wrap' + (open ? ' is-open' : '')}>
      <svg className="diagram-svg" viewBox={`0 0 ${SIZE} ${SIZE}`} role="img"
           aria-label="Raamwerk diagram. Klik op de kern om de negen domeinen te onthullen.">
        <defs>
          <filter id="b1-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodOpacity=".10"/>
          </filter>
          <filter id="b1-chip-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity=".22"/>
          </filter>
          <radialGradient id="b1-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1d5290"/>
            <stop offset="100%" stopColor="#0b3d68"/>
          </radialGradient>
        </defs>

        {/* Soft base disc */}
        <circle ref={baseCircleRef} cx={cx} cy={cy} r={268}
                fill="var(--ro-blue-100)" opacity=".55" pointerEvents="none"/>

        {/* 4 fundament half-rings (animate radii via GSAP) */}
        <g filter="url(#b1-shadow)">
          {_RING_SEGS.map(ring => {
            const isHover = hover === ring.id;
            return (
              <g key={ring.id}
                 onMouseEnter={() => setHover(ring.id)}
                 onMouseLeave={() => setHover(null)}
                 onClick={(e) => { e.stopPropagation(); onSelectDomain && onSelectDomain(ring.id); }}
                 onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectDomain && onSelectDomain(ring.id); } }}
                 tabIndex={0}
                 role="button"
                 aria-label={`Fundament: ${ring.label}`}
                 style={{ cursor: 'pointer' }}>
                <path ref={el => ringRefs.current[ring.id] = el}
                      d={buildD(ring.band, ring.half, RADII.closed)}
                      fill={isHover ? (ring.band === 'out' ? 'var(--ro-blue-300)' : '#7bbfe4')
                                    : (ring.band === 'out' ? 'var(--ro-blue-200)' : 'var(--ro-blue-300)')}
                      style={{ transition: 'fill .15s ease' }}/>
                <text ref={el => labelRefs.current[ring.id] = el}
                      x={cx}
                      y={labelY(ring.band, ring.half, RADII.closed)}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="12" fontWeight="700" letterSpacing="1.4"
                      fill="var(--ro-blue-900)" pointerEvents="none"
                      style={{ textTransform: 'uppercase', textDecoration: isHover ? 'underline' : 'none' }}>
                  {ring.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* Thin seam lines that visually split each ring's two halves at the equator */}
        <g pointerEvents="none" stroke="var(--paper)" strokeWidth="2" strokeLinecap="round">
          {['outLeft', 'outRight', 'midLeft', 'midRight'].map(key => (
            <line key={key}
                  ref={el => seamRefs.current[key] = el}
                  x1={cx} y1={cy} x2={cx} y2={cy}/>
          ))}
        </g>

        {/* 9 chip nodes — all the same color, drawn at origin then translated by GSAP */}
        <g>
          {chipGeo.map(d => (
            <g key={d.id}
               ref={el => chipRefs.current[d.id] = el}
               className={'chip' + (hover === d.id ? ' is-hover' : '')}
               onMouseEnter={() => setHover(d.id)}
               onMouseLeave={() => setHover(null)}
               onClick={(e) => { e.stopPropagation(); onSelectDomain && onSelectDomain(d.id); }}
               onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectDomain && onSelectDomain(d.id); } }}
               tabIndex={open ? 0 : -1}
               role="button"
               aria-label={`Domein ${d.nr}: ${d.title}`}
               style={{ cursor: 'pointer' }}>
              <circle r="22"
                      fill={hover === d.id ? 'var(--ro-blue-800)' : 'var(--ro-blue-700)'}
                      stroke="#fff" strokeWidth="2.5"
                      filter="url(#b1-chip-shadow)"
                      style={{ transition: 'fill .15s ease' }}/>
              {/* white glyph centered on chip */}
              <g stroke="#fff" strokeWidth="1.5" fill="none"
                 strokeLinecap="round" strokeLinejoin="round"
                 style={{ color: '#fff' }}
                 pointerEvents="none">
                {CHIP_GLYPH[d.id]}
              </g>
              {/* small white number badge top-right */}
              <g transform="translate(15 -15)" pointerEvents="none">
                <circle r="9" fill="#fff"/>
                <text textAnchor="middle" dominantBaseline="central"
                      fontSize="10" fontWeight="800"
                      fill="var(--ro-blue-700)">{d.nr}</text>
              </g>
            </g>
          ))}
        </g>

        {/* Center button — KERN / Digitale Assistent */}
        <g onClick={handleCenterClick}
           onMouseEnter={() => setHover('center')}
           onMouseLeave={() => setHover(null)}
           onKeyDown={handleCenterKey}
           tabIndex={0}
           role="button"
           aria-expanded={open}
           aria-label={open ? 'Sluit het overzicht van de negen domeinen' : 'Klik om de negen domeinen te onthullen'}
           style={{ cursor: 'pointer' }}>
          <circle cx={cx} cy={cy} r="75" fill="url(#b1-center)" filter="url(#b1-shadow)"/>
          <text x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="central"
                fontSize="17" fontWeight="700" fill="#fff" pointerEvents="none">
            Digitale
          </text>
          <text x={cx} y={cy + 10} textAnchor="middle" dominantBaseline="central"
                fontSize="17" fontWeight="700" fill="#fff" pointerEvents="none">
            Assistent
          </text>
          {/* +/- toggle hint at the bottom */}
          <g pointerEvents="none">
            <circle cx={cx} cy={cy + 48} r="10" fill="#fff" fillOpacity=".18"/>
            <g stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <line x1={cx - 4} y1={cy + 48} x2={cx + 4} y2={cy + 48}/>
              {!open && <line x1={cx} y1={cy + 44} x2={cx} y2={cy + 52}/>}
            </g>
          </g>
        </g>
      </svg>

      {/* Floating tip — shows the short summary of the hovered domain (or ring) */}
      <div className={'diagram-tip' + ((hoveredChip || hoveredRing) ? ' on' : '')} role="tooltip">
        {hoveredRing && !hoveredChip && (() => {
          // pull the short summary from the global DOMAINS for the ring's domain id
          const rd = (typeof DOMAINS !== 'undefined' ? DOMAINS : []).find(x => x.id === hoveredRing.id);
          return (
            <>
              <div className="diagram-tip-eyebrow">Fundament</div>
              <div className="diagram-tip-title">{hoveredRing.label}</div>
              {rd && rd.short && <div className="diagram-tip-body">{rd.short}</div>}
              <div className="diagram-tip-cta">Klik voor details →</div>
            </>
          );
        })()}
        {hoveredChip && (
          <>
            <div className="diagram-tip-eyebrow">Domein {String(hoveredChip.nr).padStart(2, '0')}</div>
            <div className="diagram-tip-title">{hoveredChip.title}</div>
            {hoveredChip.short && <div className="diagram-tip-body">{hoveredChip.short}</div>}
            <div className="diagram-tip-cta">Klik voor details →</div>
          </>
        )}
      </div>

    </div>
  );
}

window.FrameworkDiagram = FrameworkDiagram;
