/* global React, navigate, Glyph, Collapsible, TopicTile, kindLabel, phaseLabel, gpLabel, gpCountFor,
   practicesFor, isFundament, topicByName, FUNDAMENTEN, DOMEINEN, BronnenLijst, SuggestieBlok */
const { useState: useS, useMemo: useM } = React;

const RAAM = window.RAAMWERK;

function renderInlineMd(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part);
}

function ToelichtingBlock({ items }) {
  return (
    <div className="toelichting-block">
      {items.map((text, i) => {
        if (text.startsWith('- ') || text.includes('\n- ')) {
          const lines = text.split('\n').filter(l => l.trim());
          return (
            <ul key={i} className="toelichting-list">
              {lines.map((line, j) => <li key={j}>{renderInlineMd(line.replace(/^- /, ''))}</li>)}
            </ul>
          );
        }
        return <p key={i} className="toelichting-para">{renderInlineMd(text)}</p>;
      })}
    </div>
  );
}

/* Crumbs are the only way back up from a detail page. */
function Crumbs({ trail, current }) {
  return (
    <nav className="crumbs" aria-label="Kruimelpad">
      {trail.map(t => (
        <span key={t.href}>
          <a href={t.href} onClick={(e) => { e.preventDefault(); navigate(t.href.replace(/^#/, '')); }}>{t.label}</a>
          <span className="crumb-sep" aria-hidden="true">/</span>
        </span>
      ))}
      <span>{current}</span>
    </nav>
  );
}

/* Shows which fasen a good practice fits, as a filled track from the first to
   the last that applies. Section 1 allows no red here, so the track is blue. */
function MaturityStepper({ phases }) {
  const active = new Set(phases);
  const hit = RAAM.PHASES.map((f, i) => (active.has(f) ? i : -1)).filter(i => i >= 0);
  const first = hit.length ? hit[0] : -1;
  const last = hit.length ? hit[hit.length - 1] : -1;
  const spoken = phases.map(phaseLabel).join(', ');

  return (
    <div className="maturity">
      <span className="maturity-label">Volwassenheid</span>
      <ol className="maturity-track" aria-label={'Past in fase: ' + spoken}>
        {RAAM.PHASES.map((f, i) => (
          <li
            key={f}
            className={'maturity-step' + (active.has(f) ? ' is-on' : '')
              + (i > 0 && i > first && i <= last ? ' is-linked' : '')}
          >
            <span className="maturity-dot" aria-hidden="true"></span>
            <span className="maturity-name">{phaseLabel(f)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* The richer card used where there is room to show what a practice is about. */
function PracticeCard({ p }) {
  const path = '/practices/' + p.id;
  return (
    <a className="practice-card" href={'#' + path}
       onClick={(e) => { e.preventDefault(); navigate(path); }}>
      <div className="practice-card-text">
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
      </div>
      <MaturityStepper phases={p.phases} />
    </a>
  );
}

/* A result row. Section 6: the glyph always sits next to the full name. */
function PracticeRow({ p }) {
  const path = '/practices/' + p.id;
  return (
    <a className="row" href={'#' + path} onClick={(e) => { e.preventDefault(); navigate(path); }}>
      {p.domains[0] && <Glyph id={p.domains[0]} />}
      <span>
        <span className="row-title">{p.title}</span><br/>
        <span className="row-sub">
          Good practice &middot; {p.domains.map(id => (RAAM.DOMAINS.find(d => d.id === id) || {}).title).filter(Boolean).join(', ')}
        </span>
      </span>
    </a>
  );
}

/* ============================== DOMEINEN ============================== */
function DomeinenHero() {
  return (
    <div className="hero hero--page">
      <div>
        <h1>Fundamenten en domeinen</h1>
        <p className="hero-intro">
          Eerst het fundament, dan de assistent. Vier fundamenten dragen het geheel;
          tien domeinen vormen samen de digitale assistent.
        </p>
      </div>
    </div>
  );
}

function TopicSection({ section, two, topics }) {
  return (
    <section className={'step' + (two ? ' step--two' : '')}>
      <div>
        <span className="step-label">{section.step}</span>
        <h2>{section.title}</h2>
        <p className="step-intro">{section.description}</p>
      </div>
      <div className="tile-grid">
        {topics.map(t => (
          <TopicTile key={t.id} topic={t} fundament={!two} preview={null} onPreview={() => {}} />
        ))}
      </div>
    </section>
  );
}

function DomeinenPage() {
  return (
    <div className="wrap page">
      <div className="steps">
        <TopicSection section={RAAM.HOME.fundamenten_section} topics={FUNDAMENTEN} />
        <TopicSection section={RAAM.HOME.assistent_section} two topics={DOMEINEN} />
      </div>
    </div>
  );
}

/* ============================== DOMEIN DETAIL ============================== */
function DomeinHero({ id }) {
  const d = RAAM.DOMAINS.find(x => x.id === id);
  if (!d) return null;
  const practices = practicesFor(d.id);
  const bronnen = (d.sources || []).filter(b => typeof b !== 'string');
  return (
    <div className="hero">
      <div>
        <span className="hero-glyph hero-glyph--static">
          <Glyph id={d.id} variant={isFundament(d.id) ? 'sq' : 'dot'} />
        </span>
      </div>
      <div>
        <span className="hero-caption-kind">{kindLabel(d)}</span>
        <h1 className="hero-title--detail">{d.title}</h1>
        <p className="hero-intro">{d.short}</p>
        <div className="stats">
          <div><div className="stat-n">{practices.length}</div><div className="stat-l">good practices</div></div>
          <div><div className="stat-n">{bronnen.length}</div><div className="stat-l">bronnen</div></div>
          <div>
            <div className="stat-n">{(d.samenhang_blokken || []).length}</div>
            <div className="stat-l">verbanden</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DomeinDetail({ id }) {
  const d = RAAM.DOMAINS.find(x => x.id === id);
  if (!d) return <div className="wrap page"><h1>Onderwerp niet gevonden</h1></div>;
  const soort = isFundament(d.id) ? 'fundament' : 'domein';
  const practices = practicesFor(d.id);
  const bronnen = (d.sources || []).filter(b => typeof b !== 'string');

  return (
    <div className="wrap page">
      <Crumbs trail={[{ href: '#/', label: 'Home' }, { href: '#/domeinen', label: 'Domeinen' }]} current={d.title} />

      {d.status === 'coming-soon' && (
        <p className="notice" role="status">
          <strong>Binnenkort beschikbaar</strong> — dit {soort} is nog in review. De inhoud kan nog veranderen.
        </p>
      )}

      <div className="detail-layout">
        <div className="detail-main">
          <Collapsible title={'Over dit ' + soort} defaultOpen>
            <div dangerouslySetInnerHTML={{ __html: d.wat }} />
          </Collapsible>

          <Collapsible title={'Waarom is ' + d.title + ' belangrijk?'}>
            <div dangerouslySetInnerHTML={{ __html: d.waarom }} />
          </Collapsible>

          {bronnen.length > 0 && (
            <Collapsible title={'Basiskennis en bronnen (' + bronnen.length + ')'}>
              <BronnenLijst bronnen={bronnen} />
            </Collapsible>
          )}

          {d.samenhang_blokken && d.samenhang_blokken.length > 0 && (
            <Collapsible title="Samenhang met andere onderwerpen">
              <div className="samenhang-grid">
                {d.samenhang_blokken.map((b, i) => {
                  const other = topicByName(b.naam);
                  const nr = String(i + 1).padStart(2, '0');
                  return (
                    <article key={b.naam} className="samenhang-item">
                      {other ? (
                        <a className="samenhang-head" href={'#/domeinen/' + other.id}
                           onClick={(e) => { e.preventDefault(); navigate('/domeinen/' + other.id); }}>
                          <span className="samenhang-nr" aria-hidden="true">{nr}</span>
                          <Glyph id={other.id} variant={isFundament(other.id) ? 'sq' : 'dot'} />
                          <span className="samenhang-naam">
                            {other.title}
                            <span className="samenhang-kind">{kindLabel(other)}</span>
                          </span>
                        </a>
                      ) : (
                        <div className="samenhang-head">
                          <span className="samenhang-nr" aria-hidden="true">{nr}</span>
                          <span className="samenhang-naam">{b.naam}</span>
                        </div>
                      )}
                      <p>{b.omschrijving}</p>
                    </article>
                  );
                })}
              </div>
            </Collapsible>
          )}

          <section className="detail-section">
            <h2>Good practices</h2>
            {practices.length === 0
              ? <p className="muted">Nog geen good practices bij dit {soort}.</p>
              : <div className="practice-cards">{practices.map(p => <PracticeCard key={p.id} p={p} />)}</div>}
          </section>
        </div>

        <aside className="detail-side">
          <SuggestieBlok />
        </aside>
      </div>
    </div>
  );
}

/* ============================== GOOD PRACTICES ============================== */
function PracticesHero() {
  return (
    <div className="hero hero--page">
      <div>
        <h1>Good practices</h1>
        <p className="hero-intro">
          {RAAM.PRACTICES.length} concrete handvatten uit de praktijk, gekoppeld aan de
          fundamenten en domeinen van het raamwerk.
        </p>
      </div>
    </div>
  );
}

function PracticesPage() {
  const [q, setQ] = useS('');
  const [selDomains, setSelDomains] = useS(new Set());
  const [selPhases, setSelPhases] = useS(new Set());
  const [selLevels, setSelLevels] = useS(new Set());

  const toggle = (set, setSet, v) => {
    const next = new Set(set);
    if (next.has(v)) next.delete(v); else next.add(v);
    setSet(next);
  };
  const clearAll = () => { setQ(''); setSelDomains(new Set()); setSelPhases(new Set()); setSelLevels(new Set()); };

  const filtered = useM(() => {
    const ql = q.trim().toLowerCase();
    return RAAM.PRACTICES.filter(p => {
      if (ql && !(p.title + ' ' + p.summary).toLowerCase().includes(ql)) return false;
      if (selDomains.size && !p.domains.some(d => selDomains.has(d))) return false;
      if (selPhases.size && !p.phases.some(f => selPhases.has(f))) return false;
      if (selLevels.size && !p.levels.some(l => selLevels.has(l))) return false;
      return true;
    });
  }, [q, selDomains, selPhases, selLevels]);

  const active = selDomains.size + selPhases.size + selLevels.size + (q ? 1 : 0);

  return (
    <div className="wrap page">
      <div className="gp-layout">
        <aside className="gp-filters">
          <div className="filter-head">
            <h2>Filters</h2>
            {active > 0 && <button className="link-btn" onClick={clearAll}>Wis alles ({active})</button>}
          </div>

          <div className="filter-section">
            <h3>Zoek in good practices</h3>
            <input
              className="filter-input"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Titel of samenvatting"
              aria-label="Zoek in good practices"
            />
          </div>

          <div className="filter-section">
            <h3>Per onderwerp</h3>
            <div className="filter-chips">
              {RAAM.DOMAINS.map(d => {
                const cnt = gpCountFor(d.id);
                if (cnt === 0) return null;
                const on = selDomains.has(d.id);
                return (
                  <button key={d.id} className={'chip' + (on ? ' active' : '')}
                          aria-pressed={on}
                          onClick={() => toggle(selDomains, setSelDomains, d.id)}>
                    <Glyph id={d.id} />
                    <span>{d.title}</span>
                    <span className="chip-count">{cnt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="filter-section">
            <h3>Per oplossingsfase</h3>
            <div className="filter-chips">
              {RAAM.PHASES.map(p => {
                const on = selPhases.has(p);
                return (
                  <button key={p} className={'chip' + (on ? ' active' : '')} aria-pressed={on}
                          onClick={() => toggle(selPhases, setSelPhases, p)}>
                    <span>{p === 'PoC' ? 'Proof of concept' : p}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="filter-section">
            <h3>Per organisatieniveau</h3>
            <div className="filter-chips">
              {RAAM.LEVELS.map(l => {
                const on = selLevels.has(l);
                return (
                  <button key={l} className={'chip' + (on ? ' active' : '')} aria-pressed={on}
                          onClick={() => toggle(selLevels, setSelLevels, l)}>
                    <span>{l}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div>
          <p className="result-count" role="status">
            {filtered.length === RAAM.PRACTICES.length
              ? gpLabel(filtered.length)
              : gpLabel(filtered.length) + ' van ' + RAAM.PRACTICES.length}
          </p>
          {filtered.length === 0 ? (
            <div className="empty">
              <h3>Geen good practices gevonden</h3>
              <p>Verruim je zoekopdracht of wis een paar filters.</p>
              <button className="btn-primary" onClick={clearAll}>Wis alle filters</button>
            </div>
          ) : (
            <div className="row-list">{filtered.map(p => <PracticeRow key={p.id} p={p} />)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================== PRACTICE DETAIL ============================== */
function PracticeHero({ id }) {
  const p = RAAM.PRACTICES.find(x => x.id === id);
  if (!p) return null;
  return (
    <div className="hero hero--page">
      <div>
        <span className="hero-caption-kind">Good practice</span>
        <h1 className="hero-title--detail">{p.title}</h1>
        <p className="hero-intro">{p.summary}</p>
      </div>
    </div>
  );
}

function PracticeDetail({ id }) {
  const p = RAAM.PRACTICES.find(x => x.id === id);
  if (!p) return <div className="wrap page"><h1>Good practice niet gevonden</h1></div>;
  const domainObjs = p.domains.map(did => RAAM.DOMAINS.find(d => d.id === did)).filter(Boolean);
  const related = RAAM.PRACTICES.filter(r =>
    r.id !== p.id && ((p.good_practise || []).includes(r.id) || (r.good_practise || []).includes(p.id)));
  const bronnen = (p.sources || []).filter(b => typeof b !== 'string');

  return (
    <div className="wrap page">
      <Crumbs trail={[{ href: '#/', label: 'Home' }, { href: '#/practices', label: 'Good practices' }]} current={p.title} />

      <div className="detail-layout">
        <div className="detail-main">
          {p.image && p.image_top && <img className="detail-image" src={'content/docs/' + p.image} alt="" />}

          {p.toelichting_html
            ? <div className="toelichting-block" dangerouslySetInnerHTML={{ __html: p.toelichting_html }} />
            : p.toelichting && p.toelichting.length > 0 && <ToelichtingBlock items={p.toelichting} />}

          <section className="detail-section">
            <h2>Praktische tips</h2>
            <div className="tips">
              {p.body.map((b, i) => {
                if (/^\s*<(table|ul|img)/.test(b)) {
                  return <div key={i} dangerouslySetInnerHTML={{ __html: b }} />;
                }
                const colon = b.indexOf(': ');
                if (colon > 0) {
                  return <p key={i}><strong>{b.slice(0, colon)}:</strong> {b.slice(colon + 2)}</p>;
                }
                return <p key={i}>{b}</p>;
              })}
            </div>
          </section>

          {p.image && !p.image_top && <img className="detail-image" src={'content/docs/' + p.image} alt="" />}

          {bronnen.length > 0 && (
            <section className="detail-section">
              <h2>Relevante bronnen</h2>
              <BronnenLijst bronnen={bronnen} />
            </section>
          )}

          {related.length > 0 && (
            <section className="detail-section">
              <h2>Gerelateerde good practices</h2>
              <div className="row-list">{related.map(r => <PracticeRow key={r.id} p={r} />)}</div>
            </section>
          )}
        </div>

        <aside className="detail-side">
          <div className="side-card">
            <h4>Hoort bij</h4>
            <div className="side-links">
              {domainObjs.map(d => (
                <a key={d.id} className="row" href={'#/domeinen/' + d.id}
                   onClick={(e) => { e.preventDefault(); navigate('/domeinen/' + d.id); }}>
                  <Glyph id={d.id} />
                  <span>
                    <span className="row-title">{d.title}</span><br/>
                    <span className="row-sub">{kindLabel(d)}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="side-card">
            <h4>Past in fase</h4>
            <p className="side-value">{p.phases.map(f => f === 'PoC' ? 'Proof of concept' : f).join(', ')}</p>
          </div>
          <div className="side-card">
            <h4>Voor welk niveau?</h4>
            <p className="side-value">{p.levels.join(', ')}</p>
          </div>
          <SuggestieBlok />
        </aside>
      </div>
    </div>
  );
}

/* ============================== OVER ============================== */
function OverHero() {
  const o = RAAM.OVER;
  return (
    <div className="hero hero--page">
      <div>
        <span className="hero-caption-kind">{o.eyebrow}</span>
        <h1 className="hero-title--detail">{o.title}</h1>
        <p className="hero-intro">{o.lede}</p>
      </div>
    </div>
  );
}

function OverPage() {
  const o = RAAM.OVER;
  return (
    <div className="wrap page">
      <div className="detail-main">
        {o.sections.map((s, i) => (
          <Collapsible key={i} title={s.heading} defaultOpen={i === 0}>
            {(Array.isArray(s.body) ? s.body : [s.body]).map((para, j) => (
              <p key={j} style={para.includes('\n') ? { whiteSpace: 'pre-line' } : undefined}>{para}</p>
            ))}
          </Collapsible>
        ))}
      </div>
    </div>
  );
}

/* ============================== NIET GEVONDEN ============================== */
function NotFoundHero() {
  return (
    <div className="hero hero--page">
      <div>
        <h1>Pagina niet gevonden</h1>
        <p className="hero-intro">
          Deze pagina bestaat niet (meer). Zoek hieronder, of ga terug naar de homepage.
        </p>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="wrap page">
      <div className="empty">
        <h3>Er staat hier niets</h3>
        <p>Controleer het adres, of begin opnieuw vanaf de homepage.</p>
        <a className="btn-primary" href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          Naar de homepage
        </a>
      </div>
    </div>
  );
}

Object.assign(window, {
  DomeinenPage, DomeinenHero, DomeinDetail, DomeinHero, NotFoundHero, NotFoundPage,
  PracticesPage, PracticesHero, PracticeDetail, PracticeHero,
  OverPage, OverHero, PracticeRow, PracticeCard, MaturityStepper, Crumbs, ToelichtingBlock,
});
