/* global SuggestieBlok */
// Begrippenlijst — lettergroepen gemarkeerd met een inline header.

const gloss2Style = {
  toolbar: {
    display: 'flex', gap: 10, alignItems: 'center',
    marginTop: 28, paddingBottom: 18,
    borderBottom: '1px solid #E8E8E2', flexWrap: 'wrap',
  },
  search: {
    display: 'flex', alignItems: 'center',
    background: '#FFFFFF', border: '1px solid #D8D8D2', borderRadius: 2,
    padding: '8px 12px', width: 280, gap: 8,
  },
  searchInput: {
    border: 'none', outline: 'none', fontSize: 14, color: '#1F2A36',
    fontFamily: 'inherit', background: 'transparent', flex: 1,
  },
  jumpbarWrap: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 20, paddingTop: 6, paddingBottom: 18,
    borderBottom: '1px solid #E8E8E2',
  },
  jumpbar: { display: 'flex', flexWrap: 'wrap', gap: 2 },
  letterBtn: (has) => ({
    fontFamily: 'Arial, sans-serif',
    fontSize: 14, fontWeight: 700,
    width: 30, height: 30,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'transparent',
    color: has ? '#154273' : '#C8CDD3',
    border: '1px solid transparent',
    cursor: has ? 'pointer' : 'default',
    transition: 'background .12s, color .12s',
    padding: 0,
  }),
  resultMeta: { fontSize: 13, color: '#5B6671' },

  // ── Letter section — alleen header-strip, geen grote letter ──
  letterSection: { padding: '4px 0 0' },
  letterHead: {
    display: 'grid',
    gridTemplateColumns: '40px 1fr auto',
    alignItems: 'center',
    gap: 14,
    padding: '20px 0 10px',
  },
  letterTag: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 13, fontWeight: 700,
    color: '#154273',
    letterSpacing: '0.08em',
  },
  letterRule: {
    height: 1, background: '#E0E4EA', width: '100%',
  },
  letterCount: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 11, color: '#9AA1A8', letterSpacing: '0.06em',
  },

  // ── Entry ───────────────────────────────────────
  entry: {
    padding: '18px 0',
    borderBottom: '1px solid #EFEFEA',
    transition: 'background 0.12s, padding 0.12s, box-shadow 0.12s',
  },
  termRow: {
    display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap',
    marginBottom: 6,
  },
  term: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 18, color: '#154273', fontWeight: 700,
    margin: 0, letterSpacing: '-0.005em',
  },
  def: {
    color: '#1F2A36', fontSize: 14.5, lineHeight: 1.55, margin: 0,
    maxWidth: 760,
  },
  seeAlso: {
    marginTop: 8, fontSize: 12, color: '#5B6671',
    display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap',
  },
  seeAlsoLabel: {
    color: '#9AA1A8', letterSpacing: '0.05em',
    textTransform: 'uppercase', fontWeight: 600,
  },
  seeAlsoLink: {
    color: '#01689B', textDecoration: 'none', fontWeight: 600,
  },
};


const GLOSSARY_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');


function Glossary2SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B6671" strokeWidth="2.4">
      <circle cx="11" cy="11" r="7"/>
      <line x1="21" y1="21" x2="16.5" y2="16.5"/>
    </svg>
  );
}

function Glossary2() {
  const [query, setQuery] = React.useState('');
  const [hover, setHover] = React.useState(null);

  const filtered = window.GLOSSARY.filter(g => {
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      return g.term.toLowerCase().includes(q)
          || (g.omschrijving || '').toLowerCase().includes(q);
    }
    return true;
  });

  const grouped = {};
  filtered.forEach(g => {
    const L = g.term[0].toUpperCase();
    (grouped[L] = grouped[L] || []).push(g);
  });
  Object.keys(grouped).forEach(L => grouped[L].sort((a, b) => a.term.localeCompare(b.term, 'nl')));

  const presentLetters = new Set(Object.keys(grouped));
  const visibleLetters = GLOSSARY_LETTERS.filter(L => presentLetters.has(L));

  const scrollTo = (L) => {
    const el = document.getElementById('gloss2-letter-' + L);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="container" style={{ fontFamily: 'Arial, sans-serif', color: '#1F2A36', paddingBottom: 56 }}>
      <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32 }}>
        <div>
          <span className="eyebrow">Begrippenlijst</span>
          <h1 style={{ marginTop: 6, fontSize: 38 }}>Begrippenlijst</h1>
          <p className="lede" style={{ marginTop: 10 }}>De begrippen, afkortingen en kaders die in dit dossier voorkomen — kort gedefinieerd, met verwijzingen naar verwante termen en de oorspronkelijke bron.</p>
        </div>
        <SuggestieBlok />
      </div>

      <div style={gloss2Style.toolbar}>
        <div style={gloss2Style.search}>
          <Glossary2SearchIcon />
          <input
            style={gloss2Style.searchInput}
            placeholder="Zoek in begrippen…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div style={gloss2Style.jumpbarWrap}>
        <div style={gloss2Style.jumpbar}>
          {GLOSSARY_LETTERS.map(L => {
            const has = presentLetters.has(L);
            return (
              <button
                key={L}
                disabled={!has}
                onClick={() => has && scrollTo(L)}
                style={gloss2Style.letterBtn(has)}
              >
                {L}
              </button>
            );
          })}
        </div>
        <div style={gloss2Style.resultMeta}>
          <strong style={{color:'#1F2A36'}}>{filtered.length}</strong>
          {' '}{filtered.length === 1 ? 'term' : 'termen'}
        </div>
      </div>

      {visibleLetters.length === 0 && (
        <div style={{padding:'48px 0', color:'#5B6671', fontSize:15, textAlign:'center'}}>
          Geen termen gevonden voor deze zoekopdracht.
        </div>
      )}

      {visibleLetters.map(L => (
        <div key={L} id={'gloss2-letter-' + L} style={gloss2Style.letterSection}>
          <div style={gloss2Style.letterHead}>
            <span style={gloss2Style.letterTag}>{L}</span>
            <span style={gloss2Style.letterRule}></span>
            <span style={gloss2Style.letterCount}>
              {String(grouped[L].length).padStart(2, '0')} {grouped[L].length === 1 ? 'term' : 'termen'}
            </span>
          </div>

          {grouped[L].map(g => {
            const isHover = hover === g.term;
            return (
              <div
                key={g.term}
                style={{
                  ...gloss2Style.entry,
                  background: isHover ? '#FAFAF7' : 'transparent',
                  boxShadow: isHover ? 'inset 3px 0 0 #01689B' : 'none',
                  paddingLeft: isHover ? 16 : 0,
                  paddingRight: isHover ? 16 : 0,
                }}
                onMouseEnter={() => setHover(g.term)}
                onMouseLeave={() => setHover(null)}
              >
                <div style={gloss2Style.termRow}>
                  <h3 style={gloss2Style.term}>{g.term}</h3>
                </div>
                <p style={gloss2Style.def}>{g.omschrijving}</p>

                {g.seeAlso && g.seeAlso.length > 0 && (
                  <div style={gloss2Style.seeAlso}>
                    <span style={gloss2Style.seeAlsoLabel}>Zie ook</span>
                    {g.seeAlso.map((s, idx) => (
                      <React.Fragment key={s.title}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={gloss2Style.seeAlsoLink}
                        >{s.title}</a>
                        {idx < g.seeAlso.length - 1 && <span style={{color:'#C8CDD3'}}>·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      <div style={{marginTop: 32, paddingTop: 16, borderTop: '1px solid #E8E8E2', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12, color:'#9AA1A8'}}>
        <span>{window.GLOSSARY.length} termen in totaal</span>
        <span>Laatste update 14 mei 2026</span>
      </div>
    </div>
  );
}

window.Glossary2 = Glossary2;
