/* global React, SuggestieBlok */
/* ===== Begrippenlijst ===== */

const { useState: useStateG, useMemo: useMemoG } = React;

const GLOSSARY_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function GlossaryHero() {
  return (
    <div className="hero hero--page">
      <div>
        <h1>Begrippenlijst</h1>
        <p className="hero-intro">
          {window.GLOSSARY.length} termen die in dit raamwerk voorkomen, van
          agentic AI tot zero trust, kort uitgelegd.
        </p>
      </div>
    </div>
  );
}

function Glossary2() {
  const [query, setQuery] = useStateG('');

  const grouped = useMemoG(() => {
    const q = query.trim().toLowerCase();
    const hits = window.GLOSSARY.filter(g =>
      !q || (g.term + ' ' + (g.omschrijving || '')).toLowerCase().includes(q));
    const out = {};
    hits.forEach(g => {
      const letter = g.term[0].toUpperCase();
      (out[letter] = out[letter] || []).push(g);
    });
    Object.keys(out).forEach(l => out[l].sort((a, b) => a.term.localeCompare(b.term, 'nl')));
    return out;
  }, [query]);

  const present = new Set(Object.keys(grouped));
  const total = Object.values(grouped).reduce((n, list) => n + list.length, 0);

  const jump = (letter) => {
    const el = document.getElementById('letter-' + letter);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="wrap page">
      <div className="gp-layout">
        <aside className="gp-filters">
          <div className="filter-section">
            <h3>Zoek een begrip</h3>
            <input
              className="filter-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Term of omschrijving"
              aria-label="Zoek een begrip"
            />
          </div>
          <div className="filter-section">
            <h3>Spring naar letter</h3>
            <div className="az-bar">
              {GLOSSARY_LETTERS.map(l => (
                <button
                  key={l}
                  className="az-letter"
                  disabled={!present.has(l)}
                  onClick={() => jump(l)}
                >{l}</button>
              ))}
            </div>
          </div>
          <SuggestieBlok />
        </aside>

        <div>
          <p className="result-count" role="status">
            {total} {total === 1 ? 'begrip' : 'begrippen'}
            {total !== window.GLOSSARY.length ? ' van ' + window.GLOSSARY.length : ''}
          </p>

          {total === 0 ? (
            <div className="empty">
              <h3>Geen begrippen gevonden</h3>
              <p>Probeer een ander woord.</p>
            </div>
          ) : (
            GLOSSARY_LETTERS.filter(l => present.has(l)).map(letter => (
              <section key={letter} className="gloss-group" id={'letter-' + letter}>
                <h2 className="gloss-letter">{letter}</h2>
                {grouped[letter].map(g => (
                  <article key={g.id} className="gloss-entry" id={'begrip-' + g.id}>
                    <h3>{g.term}</h3>
                    <p>{g.omschrijving}</p>
                    {g.seeAlso && g.seeAlso.length > 0 && (
                      <p className="gloss-seealso">
                        <span className="gloss-seealso-label">Zie ook</span>
                        {g.seeAlso.map((s, i) => (
                          <React.Fragment key={s.title}>
                            <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>
                            {i < g.seeAlso.length - 1 && <span aria-hidden="true"> &middot; </span>}
                          </React.Fragment>
                        ))}
                      </p>
                    )}
                  </article>
                ))}
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Glossary2, GlossaryHero });
