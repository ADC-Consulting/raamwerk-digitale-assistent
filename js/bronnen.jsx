// ── Eigen kleurpalet voor categorieën (blauw + roze + groen + amber) ──
const D_TYPES = {
  beleid:    { label: 'Beleidskader',     color: '#0B3A66', tint: '#D6E2F0' }, // diepblauw
  verplicht: { label: 'Verplicht kader',  color: '#9C1F54', tint: '#F4DCE6' }, // diep roze
  richtlijn: { label: 'Richtlijnen',      color: '#01689B', tint: '#DCEAF4' }, // middenblauw
  raamwerk:  { label: 'Raamwerk',         color: '#5E8FB0', tint: '#E6EEF4' }, // grijsblauw
  tools:     { label: 'Tools',            color: '#3A6B4F', tint: '#DDE7E0' }, // gedempt groen
  voorbeeld: { label: 'Voorbeeldproject', color: '#7A5A32', tint: '#ECDFCD' }, // gedempt amber
  infra:     { label: 'Overig',           color: '#6B7785', tint: '#EEF2F6' }, // grijs (fallback)
};

// Primaire UI-accent (gebruikt voor headings, actieve chip, hover-stripe):
const D_INK   = '#0B3A66'; // donkerblauw
const D_INK_2 = '#01689B'; // helder blauw (links/labels)
const D_TINT  = '#DCEAF4'; // lichte blauwe wash (chip count, actieve menu)
const D_ROSE  = '#9C1F54'; // accent roze (secundair)

const vdStyle = {
  toolbar: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    marginTop: 28,
    paddingBottom: 18,
    borderBottom: '1px solid #E8E8E2',
    flexWrap: 'wrap',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    background: '#FFFFFF',
    border: '1px solid #D8D8D2',
    borderRadius: 2,
    padding: '8px 12px',
    width: 280,
    gap: 8,
  },
  searchInput: {
    border: 'none', outline: 'none', fontSize: 14,
    color: '#1F2A36', fontFamily: 'inherit', background: 'transparent', flex: 1,
  },
  chip: (active) => ({
    fontFamily: 'inherit',
    fontSize: 13, fontWeight: 600,
    border: '1px solid ' + (active ? D_INK : '#D8D8D2'),
    background: active ? D_INK : '#FFFFFF',
    color: active ? '#FFFFFF' : D_INK,
    padding: '7px 14px',
    borderRadius: 2,
    cursor: 'pointer',
    letterSpacing: '0.01em',
    display: 'inline-flex', alignItems: 'center', gap: 7,
  }),
  countBadge: (active) => ({
    fontSize: 11, fontWeight: 700,
    background: active ? 'rgba(255,255,255,0.18)' : D_TINT,
    color: active ? '#FFFFFF' : D_INK,
    padding: '1px 7px',
    borderRadius: 999,
    minWidth: 16, textAlign: 'center',
  }),
  resultMeta: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    margin: '20px 0 4px',
    fontSize: 13, color: '#5B6671',
  },
  sortBtn: {
    background: 'transparent', border: 'none', color: D_INK_2,
    fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, padding: 0,
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '180px 1fr 40px',
    gap: '24px 48px',
    padding: '18px 0',
    borderBottom: '1px solid #E8E8E2',
    alignItems: 'start',
    cursor: 'pointer',
    transition: 'background 0.12s',
  },
  typeStripe: { display: 'flex', alignItems: 'center', gap: 8 },
  typeDot: (color) => ({
    width: 8, height: 8, borderRadius: 999, background: color, flexShrink: 0,
  }),
  typeLabel: {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: '#5B6671',
  },
  titleCol: { minWidth: 0 },
  title: {
    color: D_INK, fontSize: 17, fontWeight: 700,
    lineHeight: 1.25, margin: '0 0 4px',
    fontFamily: 'Arial, sans-serif',
  },
  desc: { color: '#5B6671', fontSize: 14, lineHeight: 1.5, margin: 0 },
  statusCol: {
    display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8,
  },
  arrow: {
    color: D_INK_2, fontWeight: 700, fontSize: 18, fontFamily: 'serif',
  },
};

function VdSearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B6671" strokeWidth="2.4">
      <circle cx="11" cy="11" r="7"/>
      <line x1="21" y1="21" x2="16.5" y2="16.5"/>
    </svg>
  );
}

function VariantD() {
  const T = D_TYPES;
  const data = window.BRONNEN;

  const [active, setActive] = React.useState('alle');
  const [hover, setHover] = React.useState(null);
  const [sortBy, setSortBy] = React.useState('recent');
  const [sortDir, setSortDir] = React.useState('desc');
  const [sortOpen, setSortOpen] = React.useState(false);
  const sortRef = React.useRef(null);

  React.useEffect(() => {
    const onDoc = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const CATEGORY_ORDER = ['beleid', 'verplicht', 'richtlijn', 'raamwerk', 'tools', 'voorbeeld', 'infra'];

  const uniqueCats = [...new Set(data.map(d => d.categorie).filter(Boolean))];
  const tabs = [
    { key: 'alle', label: 'Alle bronnen', count: data.length },
    ...uniqueCats.map(cat => ({ key: cat, label: cat, count: data.filter(d => d.categorie === cat).length })),
  ];

  const filtered = data.filter(d => {
    if (active === 'alle') return true;
    return d.categorie === active;
  });

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortBy === 'categorie') {
      cmp = CATEGORY_ORDER.indexOf(a.typeKey) - CATEGORY_ORDER.indexOf(b.typeKey);
      if (cmp === 0) cmp = a.title.localeCompare(b.title, 'nl');
    } else if (sortBy === 'titel') {
      cmp = a.title.localeCompare(b.title, 'nl');
    } else {
      const ay = parseInt(a.year, 10) || 0;
      const by = parseInt(b.year, 10) || 0;
      cmp = ay - by;
      if (cmp === 0) cmp = (a.month || '').localeCompare(b.month || '');
    }
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const sortLabels = {
    recent:    { asc: 'oudst eerst', desc: 'meest recent' },
    categorie: { asc: 'A → Z',       desc: 'Z → A' },
    titel:     { asc: 'A → Z',       desc: 'Z → A' },
  };
  const sortNames = { recent: 'Datum', categorie: 'Categorie', titel: 'Titel' };

  return (
    <div className="container" style={{ fontFamily: 'Arial, sans-serif', color: '#1F2A36', paddingBottom: 56 }}>
      <div style={{ marginBottom: 18 }}>
        <span className="eyebrow">Bronnen &amp; kaders</span>
        <h1 style={{ marginTop: 6, fontSize: 38 }}>Bronnen</h1>
        <p className="lede" style={{ marginTop: 10 }}>De documenten, registers en kaders waar dit dossier op leunt. Filter op type of doorzoek de lijst om de juiste bron te vinden.</p>
      </div>

      <div style={vdStyle.toolbar}>
        <div style={vdStyle.search}>
          <VdSearchIcon />
          <input style={vdStyle.searchInput} placeholder="Zoek in bronnen…" />
        </div>
        <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          {tabs.map(t => (
            <button key={t.key} style={vdStyle.chip(active === t.key)} onClick={() => setActive(t.key)}>
              {t.label}
              <span style={vdStyle.countBadge(active === t.key)}>{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={vdStyle.resultMeta}>
        <span><strong style={{color:'#1F2A36'}}>{sorted.length}</strong> {sorted.length === 1 ? 'bron' : 'bronnen'} gevonden</span>
        <div ref={sortRef} style={{position:'relative', display:'inline-flex', alignItems:'center', gap:8}}>
          <button style={vdStyle.sortBtn} onClick={() => setSortOpen(o => !o)}>
            Sorteren: <strong style={{fontWeight:700, color:D_INK_2}}>{sortNames[sortBy]}</strong>
            <span style={{color:'#5B6671', fontWeight:500}}>({sortLabels[sortBy][sortDir]})</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={D_INK_2} strokeWidth="2.6" style={{transform: sortOpen ? 'rotate(180deg)' : 'none', transition:'transform .15s'}}><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button
            title={sortDir === 'asc' ? 'Oplopend — klik voor aflopend' : 'Aflopend — klik voor oplopend'}
            onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}
            style={{
              background:'#FFFFFF', border:'1px solid #D8D8D2', borderRadius:2,
              padding:'4px 6px', cursor:'pointer', display:'inline-flex', alignItems:'center',
              color: D_INK_2, fontFamily:'inherit',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              {sortDir === 'asc' ? (
                <>
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <polyline points="6 11 12 5 18 11"/>
                </>
              ) : (
                <>
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <polyline points="6 13 12 19 18 13"/>
                </>
              )}
            </svg>
          </button>

          {sortOpen && (
            <div style={{
              position:'absolute', top:'100%', right:0, marginTop:6, zIndex:10,
              background:'#FFFFFF', border:'1px solid #D8D8D2', minWidth:200,
              boxShadow:'0 6px 18px rgba(11,58,102,0.10)',
            }}>
              {['categorie', 'recent', 'titel'].map(key => {
                const isActive = sortBy === key;
                return (
                  <button
                    key={key}
                    onClick={() => { setSortBy(key); setSortOpen(false); }}
                    style={{
                      display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%',
                      padding:'10px 14px', background: isActive ? D_TINT : 'transparent',
                      color: isActive ? D_INK : '#1F2A36',
                      border:'none', borderBottom:'1px solid #F1F1EC',
                      fontFamily:'inherit', fontSize:13, fontWeight: isActive ? 700 : 500,
                      cursor:'pointer', textAlign:'left',
                    }}
                  >
                    <span>{sortNames[key]}</span>
                    {isActive && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={D_INK} strokeWidth="3">
                        <polyline points="4 12 10 18 20 6"/>
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div>
        {sorted.map(b => {
          const type = T[b.typeKey];
          const isHover = hover === b.id;
          return (
            <div
              key={b.id}
              style={{
                ...vdStyle.row,
                background: isHover ? '#FFFFFF' : 'transparent',
                boxShadow: isHover ? 'inset 3px 0 0 ' + D_ROSE : 'none',
                paddingLeft: isHover ? 16 : 0,
                paddingRight: isHover ? 16 : 0,
              }}
              onMouseEnter={() => setHover(b.id)}
              onMouseLeave={() => setHover(null)}
            >
              <div style={vdStyle.typeStripe}>
                <span style={vdStyle.typeDot(type.color)}></span>
                <span style={{...vdStyle.typeLabel, color: type.color}}>{b.categorie || type.label}</span>
              </div>

              <div style={vdStyle.titleCol}>
                <a href={b.url} target="_blank" rel="noopener noreferrer" style={{...vdStyle.title, textDecoration:'none', display:'block', marginBottom:4}}>{b.title}</a>
                <p style={{...vdStyle.desc, margin:0}}>{b.omschrijving}</p>
              </div>

              <div style={vdStyle.statusCol}>
                <span style={{...vdStyle.arrow, opacity: isHover ? 1 : 0.4}}>&rarr;</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

window.VariantD = VariantD;

/* ===== Herbruikbare bronnenlijst voor domein- en practicepagina's ===== */
function BronnenLijst({ bronnen }) {
  const [hover, setHover] = React.useState(null);
  const toKey = c => ({ 'Beleidskader':'beleid','Richtlijnen':'richtlijn','Richtlijn':'richtlijn','Verplicht kader':'verplicht','Raamwerk':'raamwerk','Register':'register' }[c] || 'infra');
  const rowStyle = {
    display: 'grid', gridTemplateColumns: '180px 1fr 32px',
    gap: '0 32px', padding: '14px 0',
    borderBottom: '1px solid #E8E8E2', alignItems: 'start', cursor: 'pointer',
    fontFamily: 'Arial, sans-serif',
  };
  return (
    <div>
      {bronnen.map((b, i) => {
        const type = D_TYPES[b.typeKey || toKey(b.categorie)] || D_TYPES.infra;
        const isHov = hover === (b.id || i);
        return (
          <div key={b.id || i} style={{ ...rowStyle, background: isHov ? '#fff' : 'transparent', boxShadow: isHov ? 'inset 3px 0 0 ' + D_ROSE : 'none', paddingLeft: isHov ? 12 : 0 }}
            onMouseEnter={() => setHover(b.id || i)} onMouseLeave={() => setHover(null)}>
            <div style={vdStyle.typeStripe}>
              <span style={vdStyle.typeDot(type.color)}></span>
              <span style={{ ...vdStyle.typeLabel, color: type.color }}>{b.categorie || type.label}</span>
            </div>
            <div>
              {b.url
                ? <a href={b.url} target="_blank" rel="noopener noreferrer" style={{ ...vdStyle.title, textDecoration: 'none', display: 'block', marginBottom: 4 }}>{b.title}</a>
                : <strong style={{ ...vdStyle.title, display: 'block', marginBottom: 4 }}>{b.title}</strong>}
              <p style={{ ...vdStyle.desc, margin: 0 }}>{b.omschrijving || b.short}</p>
            </div>
            <div style={{ ...vdStyle.statusCol, justifyContent: 'flex-start' }}>
              <span style={{ ...vdStyle.arrow, opacity: isHov ? 1 : 0.4 }}>&rarr;</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
window.BronnenLijst = BronnenLijst;
