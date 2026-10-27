/* global React, navigate, Glyph, kindLabel, gpCountFor, gpLabel */
/* ===== Site-wide search (ontwerpprincipes section 7) =====
   Searches the 14 onderwerpen, the good practices, the bronnen and the
   begrippen. The index is built once, at module scope. */

/* Scripts share global scope, so hooks are aliased per file. */
const { useState: useStateQ, useRef: useRefQ, useEffect: useEffectQ, useMemo: useMemoQ } = React;

const SEARCH_GROUPS = ['Onderwerpen', 'Good practices', 'Bronnen', 'Begrippen'];
const PER_GROUP = 6;

const SEARCH_INDEX = [].concat(
  window.RAAMWERK.DOMAINS.map(d => ({
    group: 'Onderwerpen',
    title: d.title,
    sub: kindLabel(d) + ' · ' + gpLabel(gpCountFor(d.id)),
    href: '#/domeinen/' + d.id,
    glyph: d.id,
    text: (d.title + ' ' + d.short).toLowerCase(),
  })),
  window.RAAMWERK.PRACTICES.map(p => ({
    group: 'Good practices',
    title: p.title,
    sub: 'Good practice · ' + p.domains
      .map(id => (window.RAAMWERK.DOMAINS.find(d => d.id === id) || {}).title)
      .filter(Boolean).join(', '),
    href: '#/practices/' + p.id,
    glyph: p.domains[0],
    text: (p.title + ' ' + p.summary).toLowerCase(),
  })),
  window.BRONNEN.map(b => ({
    group: 'Bronnen',
    title: b.title,
    sub: b.categorie,
    href: b.url,
    external: true,
    text: (b.title + ' ' + (b.omschrijving || '')).toLowerCase(),
  })),
  window.GLOSSARY.map(g => ({
    group: 'Begrippen',
    title: g.term,
    sub: 'Begrip',
    href: '#/begrippenlijst#begrip-' + g.id,
    text: (g.term + ' ' + (g.omschrijving || '')).toLowerCase(),
  }))
);

function searchFor(query) {
  const q = query.trim().toLowerCase();
  if (!q) return { total: 0, rows: [] };
  const hits = SEARCH_INDEX.filter(item => item.text.includes(q));
  const rows = [];
  SEARCH_GROUPS.forEach(group => {
    const inGroup = hits.filter(h => h.group === group);
    if (!inGroup.length) return;
    rows.push({ heading: group, count: inGroup.length });
    inGroup.slice(0, PER_GROUP).forEach(h => rows.push(h));
  });
  return { total: hits.length, rows };
}

function SearchBar({ placeholder }) {
  const [q, setQ] = useStateQ('');
  const [open, setOpen] = useStateQ(false);
  const [active, setActive] = useStateQ(-1);
  const boxRef = useRefQ(null);
  const inputRef = useRefQ(null);

  const { total, rows } = useMemoQ(() => searchFor(q), [q]);
  const options = rows.filter(r => !r.heading);
  const show = open && q.trim().length > 0;

  useEffectQ(() => { setActive(-1); }, [q]);

  useEffectQ(() => {
    if (!show) return;
    const onDocDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, [show]);

  const go = (item) => {
    if (!item) return;
    setOpen(false);
    setQ('');
    if (item.external) window.open(item.href, '_blank', 'noopener');
    else navigate(item.href.replace(/^#/, ''));
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { setOpen(false); inputRef.current.blur(); return; }
    if (!show || !options.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(a => (a + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(a => (a <= 0 ? options.length - 1 : a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(options[active >= 0 ? active : 0]);
    }
  };

  let optionIndex = -1;

  return (
    <div className="search" ref={boxRef}>
      <form
        className="search-bar"
        role="search"
        onSubmit={(e) => { e.preventDefault(); go(options[active >= 0 ? active : 0]); }}
      >
        <svg className="search-icon" viewBox="0 0 24 24" width="22" height="22" fill="none"
             stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
        </svg>
        <label className="visually-hidden" htmlFor="site-search">Zoeken</label>
        <input
          id="site-search"
          ref={inputRef}
          className="search-input"
          type="search"
          autoComplete="off"
          role="combobox"
          aria-expanded={show}
          aria-controls="search-results"
          aria-activedescendant={active >= 0 ? 'search-option-' + active : undefined}
          placeholder={placeholder || 'Zoek in onderwerpen, good practices, bronnen en begrippen'}
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        <button className="search-submit" type="submit">Zoek</button>
      </form>

      {show && (
        <div className="search-panel on-surface" id="search-results" role="listbox" aria-label="Zoekresultaten">
          <div className="search-count">
            {total > 0
              ? total + ' resultaten voor “' + q.trim() + '”'
              : 'Geen resultaten voor “' + q.trim() + '”. Probeer een ander woord.'}
          </div>
          {rows.map((row, i) => {
            if (row.heading) {
              return <div className="search-group" key={'h' + i}>{row.heading} ({row.count})</div>;
            }
            optionIndex += 1;
            const idx = optionIndex;
            return (
              <a
                key={'r' + i}
                id={'search-option-' + idx}
                role="option"
                aria-selected={active === idx}
                className={'search-row' + (active === idx ? ' active' : '')}
                href={row.href}
                target={row.external ? '_blank' : undefined}
                rel={row.external ? 'noopener noreferrer' : undefined}
                onMouseEnter={() => setActive(idx)}
                onClick={(e) => {
                  if (row.external) { setOpen(false); setQ(''); return; }
                  e.preventDefault();
                  go(row);
                }}
              >
                {row.glyph && <Glyph id={row.glyph} />}
                <span>
                  <span className="search-row-title">{row.title}</span><br/>
                  <span className="search-row-sub">{row.sub}</span>
                </span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { SearchBar, SEARCH_INDEX, searchFor });
