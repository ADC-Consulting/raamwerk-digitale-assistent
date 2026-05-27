/* global React, navigate, FrameworkDiagram, DomainGlyph, Icon, BronnenLijst */
const { useState: useS, useMemo: useM } = React;

const RAAM = window.RAAMWERK;

// Practice body items render as plain paragraphs (no auto-bolding). Tips read as
// natural prose; visual separation is handled by .practice-tips p in style.css.


/* ============================== COLLAPSIBLE SECTION ============================== */
function Section({ title, children, id, defaultOpen = false }) {
  const [open, setOpen] = useS(defaultOpen);
  return (
    <div id={id} className="section-block" style={{ scrollMarginTop: 80 }}>
      <button className="section-toggle" onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        <svg className={'section-chevron' + (open ? ' open' : '')} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && <div className="section-content">{children}</div>}
    </div>
  );
}

/* ============================== HOME ============================== */
function HomePage() {
  const h = RAAM.HOME;
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">{h.eyebrow}</span>
          <h1>{h.title}</h1>
          {(Array.isArray(h.lede) ? h.lede : [h.lede]).map((p, i) => (
            <p key={i} className="lede">{p}</p>
          ))}
          <p className="lede" style={{ fontSize: 16 }}>{h.lede_sub}</p>
          <div className="hero-meta">
            <div className="stat"><span className="num">4</span><span className="lbl">Fundamenten</span></div>
            <div className="stat"><span className="num">9</span><span className="lbl">Domeinen</span></div>
            <div className="stat"><span className="num">{RAAM.PRACTICES.length}</span><span className="lbl">Good Practices</span></div>
          </div>
          <div className="hero-cta">
            <button className="btn" onClick={() => navigate('/domeinen')}>Bekijk alle domeinen <Icon.Arrow/></button>
            <button className="btn btn-ghost" onClick={() => navigate('/practices')}>Overzicht Good Practices</button>
          </div>
        </div>
        <div>
          <FrameworkDiagram
            onSelectDomain={(id) => navigate('/domeinen/' + id)}
            onSelectAll={() => navigate('/domeinen#digitale-assistent')}
          />
          <p style={{ textAlign: 'center', color: 'var(--ink-500)', marginTop: 12, fontSize: 14 }}>
            {h.diagram_hint.split(/(segment|midden)/g).map((part, i) =>
              (part === 'segment' || part === 'midden')
                ? <span key={i} style={{ color: 'var(--ro-blue-600)', fontWeight: 600 }}>{part}</span>
                : part
            )}
          </p>
        </div>
      </section>

    </div>
  );
}

/* ============================== DOMEINEN ============================== */
function DomeinenPage() {
  const FUND_IDS = ['governance','infrastructuur-data','cultuur-adoptie','kennis-capaciteit'];
  const fundamenten = RAAM.DOMAINS.filter(d => FUND_IDS.includes(d.id));
  const overige = RAAM.DOMAINS.filter(d => !FUND_IDS.includes(d.id));
  const renderCard = (d, isFundament = false) => {
    const count = RAAM.PRACTICES.filter(p => p.domains.includes(d.id)).length;
    const comingSoon = d.status === 'coming-soon';
    return (
      <a key={d.id} className={'card card-link domain-card' + (isFundament ? ' domain-card--fundament' : '') + (comingSoon ? ' domain-card--coming-soon' : '')}
         onClick={(e) => { e.preventDefault(); navigate('/domeinen/' + d.id); }}
         href={'#/domeinen/' + d.id}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <DomainGlyph id={d.id} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <span className="nr">{isFundament ? 'FUNDAMENT' : 'DOMEIN'} {String(d.nr).padStart(2, '0')}</span>
            {comingSoon && <span className="badge-coming-soon">Binnenkort</span>}
          </div>
        </div>
        <h3>{d.title}</h3>
        <p>{d.short}</p>
        <div className="meta">
          <span>{count} good practice{count===1?'':'s'}</span>
        </div>
      </a>
    );
  };
  return (
    <div className="container">
      <div className="section-title-row" style={{ marginBottom: 18 }}>
        <div>
          <span className="eyebrow">Overzicht</span>
          <h1 style={{ marginTop: 6, fontSize: 38 }}>Domeinen van het raamwerk</h1>
          <p className="lede" style={{ marginTop: 10 }}>
            Het raamwerk omvat vier fundamenten en negen domeinen die samen de digitale assistent vormen. Klik op een domein voor de volledige beschrijving, good practices en bronnen.
          </p>
        </div>
      </div>

      <div className="section-header" style={{ display: 'flex', alignItems: 'baseline', gap: 16, margin: '40px 0 4px' }}>
        <span className="eyebrow" style={{ fontSize: 13, letterSpacing: 1.6 }}>{RAAM.HOME.fundamenten_section.label}</span>
        <span style={{ flex: 1, height: 2, background: '#0b3d68' }}/>
        <span style={{ fontSize: 13, color: 'var(--ink-500)' }}>{fundamenten.length} fundamenten</span>
      </div>
      <p style={{ color: 'var(--ink-700)', maxWidth: 780, margin: '0 0 22px' }}>
        {RAAM.HOME.fundamenten_section.description}
      </p>
      <div className="domain-grid domain-grid--fundament">{fundamenten.map(d => renderCard(d, true))}</div>

      <div id="digitale-assistent" className="section-header" style={{ display: 'flex', alignItems: 'baseline', gap: 16, margin: '48px 0 4px', scrollMarginTop: 24 }}>
        <span className="eyebrow" style={{ fontSize: 13, letterSpacing: 1.6 }}>{RAAM.HOME.assistent_section.label}</span>
        <span style={{ flex: 1, height: 2, background: '#01689b' }}/>
        <span style={{ fontSize: 13, color: 'var(--ink-500)' }}>{overige.length} domeinen</span>
      </div>
      <p style={{ color: 'var(--ink-700)', maxWidth: 780, margin: '0 0 22px' }}>
        {RAAM.HOME.assistent_section.description}
      </p>
      <div className="domain-grid">{overige.map(d => renderCard(d, false))}</div>
    </div>
  );
}

/* ============================== DOMEIN DETAIL ============================== */
function DomeinDetail({ id }) {
  const d = RAAM.DOMAINS.find(x => x.id === id);
  if (!d) return <div className="container"><h1>Domein niet gevonden</h1></div>;
  const isFundament = ['governance','infrastructuur-data','cultuur-adoptie','kennis-capaciteit'].includes(d.id);
  const typeLabel = isFundament ? 'fundament' : 'domein';
  // Single source of truth: a practice belongs to a domain when its own
  // `domains:` frontmatter includes the domain id. The overview-card count
  // (renderCard) uses the same filter — they always agree.
  const practices = RAAM.PRACTICES.filter(p => p.domains.includes(d.id));
  const comingSoon = d.status === 'coming-soon';
  return (
    <div className="container">
      <div className="crumbs">
        <a href="#/">Home</a><span className="sep">/</span>
        <a href="#/domeinen">Domeinen</a><span className="sep">/</span>
        <span>{d.title}</span>
      </div>
      {comingSoon && (
        <div className="banner-coming-soon" role="status">
          <strong>Binnenkort beschikbaar</strong> — dit {typeLabel} is nog in review. De inhoud op deze pagina is een eerste opzet en kan nog veranderen.
        </div>
      )}
      <div className="detail-header">
        <span className="eyebrow">{isFundament ? 'Fundament' : 'Domein'} {String(d.nr).padStart(2, '0')}</span>
        <h1>{d.title}</h1>
        <p className="lede" style={{ fontSize: 19 }}>{d.short}</p>
      </div>

      <div className="detail-with-toc">
        <nav className="detail-toc">
          <p className="toc-heading">Inhoud</p>
          <ul>
            {[
              { id: 'sec-wat', label: `Wat houdt dit ${typeLabel} in?` },
              { id: 'sec-waarom', label: 'Waarom is het belangrijk?' },
              ...(d.sources && d.sources.length > 0 ? [{ id: 'sec-kennis', label: 'Basiskennis' }] : []),
              { id: 'sec-practices', label: 'Good practices' },
              { id: 'sec-keuze', label: 'Keuzemomenten' },
              { id: 'sec-samenhang', label: 'Samenhang' },
            ].map(item => (
              <li key={item.id}>
                <button className="toc-link" onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="detail-body">
          <Section id="sec-wat" defaultOpen title={isFundament ? `Wat wordt verstaan onder ${d.title} bij een digitale assistent?` : `Wat is ${d.title} in een digitale assistent?`}>
            <div dangerouslySetInnerHTML={{ __html: d.wat }} />
          </Section>

          <Section id="sec-waarom" title={`Waarom is ${d.title} belangrijk in een digitale assistent?`}>
            <div dangerouslySetInnerHTML={{ __html: d.waarom }} />
          </Section>

          {d.sources && d.sources.length > 0 && (
            <Section id="sec-kennis" title="Welke basiskennis is nodig?">
              <BronnenLijst bronnen={d.sources.filter(b => typeof b !== 'string')} />
            </Section>
          )}

          <Section id="sec-practices" title="Good practices">
            {practices.length === 0 ? (
              <p style={{ color: 'var(--ink-500)' }}>Nog geen good practices in dit domein. Heb je er een? <a href="#">Dien een suggestie in</a>.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {practices.map(p => (
                  <a key={p.id} className="card card-link practice-card"
                     onClick={(e) => { e.preventDefault(); navigate('/practices/' + p.id); }}
                     href={'#/practices/' + p.id}>
                    <h3 style={{ margin: 0 }}>{p.title}</h3>
                    <p>{p.summary}</p>
                    <div className="tag-row">
                      {p.phases.map(ph => <span key={ph} className={'tag tag-phase-' + ph.toLowerCase()}>{ph}</span>)}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </Section>

          <Section id="sec-keuze" title={`Keuzemomenten die dit ${typeLabel} raken`}>
            {d.keuzemomenten
              ? <div dangerouslySetInnerHTML={{ __html: d.keuzemomenten }} />
              : <p style={{ color: 'var(--ink-500)' }}>Nog geen inhoud toegevoegd.</p>}
          </Section>

          <Section id="sec-samenhang" title="Samenhang met andere fundamenten en domeinen">
            {d.samenhang_blokken && d.samenhang_blokken.length > 0
              ? <div className="samenhang-grid">
                  {d.samenhang_blokken.map((b, i) => (
                    <article key={b.naam} className="samenhang-item">
                      <header className="samenhang-head">
                        <span className="samenhang-num">{String(i + 1).padStart(2, '0')}</span>
                        <h3 className="samenhang-title">{b.naam}</h3>
                      </header>
                      <p className="samenhang-body">{b.omschrijving}</p>
                    </article>
                  ))}
                </div>
              : <p style={{ color: 'var(--ink-500)' }}>Nog geen inhoud toegevoegd.</p>}
          </Section>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
        <div className="side-card" style={{ width: 320, textAlign: 'center' }}>
          <h4>Vragen of aanvullingen?</h4>
          <p style={{ margin: '0 0 12px', color: 'var(--ink-700)', fontSize: 13 }}>Help het raamwerk verbeteren met jouw praktijkervaring.</p>
          <button className="btn btn-sm btn-ghost" onClick={() => alert('Suggestie indienen')}><Icon.Suggest/> Suggestie indienen</button>
        </div>
      </div>
    </div>
  );
}

/* ============================== GOOD PRACTICES ============================== */
function PracticesPage() {
  const [q, setQ] = useS('');
  const [selDomains, setSelDomains] = useS(new Set());
  const [selPhases, setSelPhases] = useS(new Set());
  const [selLevels, setSelLevels] = useS(new Set());

  function toggle(set, setSet, v) {
    const n = new Set(set);
    if (n.has(v)) n.delete(v); else n.add(v);
    setSet(n);
  }
  function clearAll() {
    setQ(''); setSelDomains(new Set()); setSelPhases(new Set()); setSelLevels(new Set());
  }

  const filtered = useM(() => {
    const qq = q.trim().toLowerCase();
    return RAAM.PRACTICES.filter(p => {
      if (qq && !(p.title.toLowerCase().includes(qq) || p.summary.toLowerCase().includes(qq))) return false;
      if (selDomains.size && !p.domains.some(d => selDomains.has(d))) return false;
      if (selPhases.size && !p.phases.some(d => selPhases.has(d))) return false;
      if (selLevels.size && !p.levels.some(d => selLevels.has(d))) return false;
      return true;
    });
  }, [q, selDomains, selPhases, selLevels]);

  const active = selDomains.size + selPhases.size + selLevels.size + (q ? 1 : 0);

  return (
    <div className="container">
      <div className="section-title-row" style={{ marginBottom: 18 }}>
        <div>
          <span className="eyebrow">Praktijk</span>
          <h1 style={{ marginTop: 6, fontSize: 38 }}>Overzicht Good Practices</h1>
          <p className="lede" style={{ marginTop: 10 }}>
            {RAAM.PRACTICES.length} concrete handvatten, methoden en technieken voor de (door)ontwikkeling van digitale assistenten.
          </p>
        </div>
      </div>

      <div className="searchbar" style={{ marginBottom: 24 }}>
        <Icon.Search/>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Zoek in titels en beschrijvingen…" aria-label="Zoeken"/>
        {q && <button onClick={() => setQ('')} className="filter-clear" style={{ display: 'flex', alignItems:'center' }}><Icon.Close/></button>}
      </div>

      <div className="gp-layout">
        <aside className="gp-sidebar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <h3 style={{ margin: 0 }}>Filters</h3>
            {active > 0 && <button className="filter-clear" onClick={clearAll}>Alle wissen</button>}
          </div>
          <div className="search-meta" style={{ marginBottom: 8 }}>
            {filtered.length} van {RAAM.PRACTICES.length} good practices
          </div>

          <div className="filter-section">
            <h4>Per domein</h4>
            <div className="filter-chips">
              {RAAM.DOMAINS.map(d => {
                const cnt = RAAM.PRACTICES.filter(p => p.domains.includes(d.id)).length;
                if (cnt === 0) return null;
                return (
                  <button key={d.id} className={'filter-chip filter-chip--domain' + (selDomains.has(d.id) ? ' active' : '')}
                          onClick={() => toggle(selDomains, setSelDomains, d.id)}>
                    <DomainGlyph id={d.id} /> {d.title} <span className="count">{cnt}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="filter-section">
            <h4>Per oplossingsfase</h4>
            <div className="filter-chips">
              {RAAM.PHASES.map(p => (
                <button key={p} className={'filter-chip' + (selPhases.has(p) ? ' active' : '')}
                        onClick={() => toggle(selPhases, setSelPhases, p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-section">
            <h4>Per organisatieniveau</h4>
            <div className="filter-chips">
              {RAAM.LEVELS.map(p => (
                <button key={p} className={'filter-chip' + (selLevels.has(p) ? ' active' : '')}
                        onClick={() => toggle(selLevels, setSelLevels, p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <Icon.Search style={{ width: 32, height: 32, color: 'var(--ink-400)' }}/>
              <h3>Geen good practices gevonden</h3>
              <p style={{ margin: 0 }}>Verruim je zoekopdracht of wis een paar filters.</p>
              <button className="btn btn-ghost btn-sm" onClick={clearAll}>Wis alle filters</button>
            </div>
          ) : (
            <div className="gp-list">
              {filtered.map(p => (
                <a key={p.id} className="card card-link practice-card"
                   onClick={(e) => { e.preventDefault(); navigate('/practices/' + p.id); }}
                   href={'#/practices/' + p.id}>
                  <h3 style={{ margin: '0 0 4px' }}>{p.title}</h3>
                  <p>{p.summary}</p>
                  <div className="tag-row">
                    {p.domains.slice(0,2).map(did => {
                      const dd = RAAM.DOMAINS.find(x => x.id === did);
                      return <span key={did} className="tag tag-domain tag-domain--icon" title={dd.title}><DomainGlyph id={did}/></span>;
                    })}
                    {p.phases.map(ph => <span key={ph} className={'tag tag-phase-' + ph.toLowerCase()}>{ph}</span>)}
                    {p.levels.map(l => <span key={l} className={'tag tag-level-' + l.toLowerCase()}>{l}</span>)}
                  </div>
                  <div className="row-meta">
                    <span className="read-more">Lees meer <Icon.Arrow/></span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================== PRACTICE DETAIL ============================== */
function PracticeDetail({ id }) {
  const p = RAAM.PRACTICES.find(x => x.id === id);
  if (!p) return <div className="container"><h1>Good practice niet gevonden</h1></div>;
  const domainObjs = p.domains.map(did => RAAM.DOMAINS.find(d => d.id === did)).filter(Boolean);
  return (
    <div className="container">
      <div className="crumbs">
        <a href="#/">Home</a><span className="sep">/</span>
        <a href="#/practices">Good Practices</a><span className="sep">/</span>
        <span>{p.title}</span>
      </div>
      <div className="detail-header">
        <span className="eyebrow">Good Practice</span>
        <h1>{p.title}</h1>
        <p className="lede" style={{ fontSize: 19 }}>{p.summary}</p>
      </div>

      <div className="detail-grid">
        <div className="detail-body">
          <h2>Praktische tips</h2>
          <div className="practice-tips">
            {p.body.map((b, i) => <p key={i}>{b}</p>)}
          </div>

          {p.sources && p.sources.length > 0 && (
            <>
              <h2>Relevante bronnen</h2>
              <BronnenLijst bronnen={p.sources.filter(b => typeof b !== 'string')} />
            </>
          )}
        </div>
        <aside className="detail-side">
          <div className="side-card">
            <h4>Relevante domeinen</h4>
            <ul>
              {domainObjs.map(d => (
                <li key={d.id}>
                  <a onClick={(e)=>{e.preventDefault();navigate('/domeinen/'+d.id);}} href={'#/domeinen/'+d.id}>{d.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="side-card">
            <h4>Past in fase</h4>
            <div className="tag-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.phases.map(ph => <span key={ph} className={'tag tag-phase-' + ph.toLowerCase()}>{ph}</span>)}
            </div>
          </div>
          <div className="side-card">
            <h4>Voor welk niveau?</h4>
            <div className="tag-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.levels.map(l => <span key={l} className="tag tag-level">{l}</span>)}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ============================== OVER ============================== */
function OverPage() {
  const o = RAAM.OVER;
  const sectionIds = o.sections.map((_, i) => 'over-sec-' + i);
  return (
    <div className="container">
      <div className="detail-header">
        <span className="eyebrow">{o.eyebrow}</span>
        <h1>{o.title}</h1>
        <p className="lede" style={{ fontSize: 19 }}>{o.lede}</p>
      </div>

      <div className="detail-with-toc">
        <nav className="detail-toc">
          <p className="toc-heading">Inhoud</p>
          <ul>
            {o.sections.map((s, i) => (
              <li key={i}>
                <button className="toc-link" onClick={() => document.getElementById(sectionIds[i])?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                  {s.heading}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="detail-body">
          {o.sections.map((s, i) => (
            <Section key={i} id={sectionIds[i]} title={s.heading} defaultOpen={i === 0}>
              {(Array.isArray(s.body) ? s.body : [s.body]).map((p, j) => (
                <p key={j} style={p.includes('\n') ? { whiteSpace: 'pre-line' } : undefined}>{p}</p>
              ))}
            </Section>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomePage, DomeinenPage, DomeinDetail, PracticesPage, PracticeDetail, OverPage });
