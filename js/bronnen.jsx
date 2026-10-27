/* global React, navigate, Glyph, SuggestieBlok, kindLabel */
/* ===== Bronnen (ontwerpprincipes section 10) =====
   A white page with a lintblauw title and a list of sources carrying the
   glyphs of the onderwerpen that cite them. No colour coding by category —
   section 1 allows only blue and white, so the category is a word. */

const { useState: useStateB, useMemo: useMemoB, useEffect: useEffectB, useRef: useRefB } = React;

/* Which onderwerpen cite a given bron, directly or through a good practice. */
const BRON_TOPICS = (() => {
  const map = new Map();
  const add = (bron, topicId) => {
    const id = typeof bron === 'string' ? bron : bron.id;
    if (!id) return;
    if (!map.has(id)) map.set(id, new Set());
    map.get(id).add(topicId);
  };
  window.RAAMWERK.DOMAINS.forEach(d => (d.sources || []).forEach(b => add(b, d.id)));
  window.RAAMWERK.PRACTICES.forEach(p =>
    (p.sources || []).forEach(b => p.domains.forEach(did => add(b, did))));
  return map;
})();

const topicsForBron = (id) => Array.from(BRON_TOPICS.get(id) || []);

function BronRow({ bron }) {
  const topics = topicsForBron(bron.id);
  return (
    <article className="bron">
      <div className="bron-main">
        <a className="bron-title" href={bron.url} target="_blank" rel="noopener noreferrer">
          {bron.title}
        </a>
        {bron.omschrijving && <p className="bron-omschrijving">{bron.omschrijving}</p>}
        <div className="bron-meta">
          <span className="bron-categorie">{bron.categorie || 'Overig'}</span>
          {topics.length > 0 && (
            <span className="bron-topics">
              {topics.map(id => {
                const d = window.RAAMWERK.DOMAINS.find(x => x.id === id);
                if (!d) return null;
                return (
                  <a key={id} className="bron-topic" href={'#/domeinen/' + id}
                     onClick={(e) => { e.preventDefault(); navigate('/domeinen/' + id); }}>
                    <Glyph id={id} />
                    <span>{d.title}</span>
                  </a>
                );
              })}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/* Reused on the domein and good-practice detail pages. */
function BronnenLijst({ bronnen }) {
  if (!bronnen || bronnen.length === 0) return null;
  return <div className="bron-list">{bronnen.map(b => <BronRow key={b.id} bron={b} />)}</div>;
}

function BronnenHero() {
  return (
    <div className="hero hero--page">
      <div>
        <h1>Bronnen</h1>
        <p className="hero-intro">
          De {window.BRONNEN.length} documenten, registers en kaders waar dit raamwerk op
          leunt. Filter op categorie of doorzoek de lijst.
        </p>
      </div>
    </div>
  );
}

function BronnenPage() {
  const data = window.BRONNEN;
  const [active, setActive] = useStateB('alle');
  const [q, setQ] = useStateB('');
  const [sortDir, setSortDir] = useStateB('asc');

  const categories = useMemoB(() => {
    const counts = new Map();
    data.forEach(b => {
      const c = b.categorie || 'Overig';
      counts.set(c, (counts.get(c) || 0) + 1);
    });
    return [{ key: 'alle', label: 'Alle bronnen', count: data.length }].concat(
      Array.from(counts.entries())
        .map(([label, count]) => ({ key: label, label, count }))
        .sort((a, b) => a.label.localeCompare(b.label, 'nl'))
    );
  }, [data]);

  const shown = useMemoB(() => {
    const ql = q.trim().toLowerCase();
    const out = data.filter(b => {
      if (active !== 'alle' && (b.categorie || 'Overig') !== active) return false;
      if (!ql) return true;
      return (b.title + ' ' + (b.omschrijving || '')).toLowerCase().includes(ql);
    });
    out.sort((a, b) => {
      const cmp = a.title.localeCompare(b.title, 'nl');
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return out;
  }, [data, active, q, sortDir]);

  return (
    <div className="wrap page">
      <div className="gp-layout">
        <aside className="gp-filters">
          <div className="filter-section">
            <h3>Zoek in bronnen</h3>
            <input
              className="filter-input"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Titel of omschrijving"
              aria-label="Zoek in bronnen"
            />
          </div>
          <div className="filter-section">
            <h3>Per categorie</h3>
            <div className="filter-chips">
              {categories.map(c => (
                <button key={c.key} className={'chip' + (active === c.key ? ' active' : '')}
                        aria-pressed={active === c.key}
                        onClick={() => setActive(c.key)}>
                  <span>{c.label}</span>
                  <span className="chip-count">{c.count}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="filter-section">
            <h3>Sorteren op titel</h3>
            <div className="filter-chips">
              <button className={'chip' + (sortDir === 'asc' ? ' active' : '')}
                      aria-pressed={sortDir === 'asc'} onClick={() => setSortDir('asc')}>A → Z</button>
              <button className={'chip' + (sortDir === 'desc' ? ' active' : '')}
                      aria-pressed={sortDir === 'desc'} onClick={() => setSortDir('desc')}>Z → A</button>
            </div>
          </div>
          <SuggestieBlok />
        </aside>

        <div>
          <p className="result-count" role="status">
            {shown.length} {shown.length === 1 ? 'bron' : 'bronnen'}
            {shown.length !== data.length ? ' van ' + data.length : ''}
          </p>
          {shown.length === 0 ? (
            <div className="empty">
              <h3>Geen bronnen gevonden</h3>
              <p>Probeer een ander woord of kies een andere categorie.</p>
            </div>
          ) : (
            <div className="bron-list">{shown.map(b => <BronRow key={b.id} bron={b} />)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BronnenPage, BronnenHero, BronnenLijst, topicsForBron });
