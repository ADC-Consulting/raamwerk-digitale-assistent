/* global React, navigate, Glyph, kindLabel, gpCountFor, gpLabel, FUNDAMENTEN, DOMEINEN, STATS, isFundament */
/* ===== Home (ontwerpprincipes sections 7 and 10) ===== */

const { useState: useStateH } = React;

/* HOME comes from js/data.js. Section 3: soft hyphens so the long compound
   breaks cleanly on phones. */
const HOME_TITLE = HOME.title.replace(
  'Overheidsdienstverlening',
  'Overheids­dienst­verlening'
);

/* Fills the slot inside the blue band. */
function HomeHero({ sel }) {
  const d = window.RAAMWERK.DOMAINS.find(x => x.id === sel) || FUNDAMENTEN[0];
  const href = '#/domeinen/' + d.id;
  return (
    <div className="hero">
      <div>
        <a
          className="hero-glyph"
          href={href}
          aria-label={d.title}
          onClick={(e) => { e.preventDefault(); navigate('/domeinen/' + d.id); }}
        >
          <Glyph id={d.id} variant="dot" />
        </a>
        <div className="hero-caption">
          <span className="hero-caption-kind">
            {kindLabel(d)} &middot; {gpLabel(gpCountFor(d.id))}
          </span>
          <a
            className="hero-caption-title"
            href={href}
            onClick={(e) => { e.preventDefault(); navigate('/domeinen/' + d.id); }}
          >
            {d.title} &rarr;
          </a>
          <span className="hero-caption-short">{d.short}</span>
        </div>
      </div>

      <div>
        <h1>{HOME_TITLE}</h1>
        <p className="hero-intro">{HOME.lede[0]}</p>
        <div className="stats">
          {STATS.map(s => (
            <div key={s.label}>
              <div className="stat-n">{s.n}</div>
              <div className="stat-l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Collapsible({ title, children, id, defaultOpen = false }) {
  const [open, setOpen] = useStateH(defaultOpen);
  return (
    <section className="collapsible" id={id}>
      <button className="collapsible-toggle" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        {title}
        <span className="collapsible-sign" aria-hidden="true">{open ? '–' : '+'}</span>
      </button>
      {open && <div className="collapsible-body">{children}</div>}
    </section>
  );
}

/* A tile previews on hover and on focus. On touch there is no hover, so the
   first tap previews and the second opens — hence the preview check here. */
function TopicTile({ topic, fundament, preview, onPreview }) {
  const path = '/domeinen/' + topic.id;
  const isPreviewing = preview === topic.id;
  return (
    <a
      className={'tile ' + (fundament ? 'tile--fundament' : 'tile--domein') + (isPreviewing ? ' is-preview' : '')}
      href={'#' + path}
      onMouseEnter={() => onPreview(topic.id)}
      onFocus={() => onPreview(topic.id)}
      onClick={(e) => {
        e.preventDefault();
        if (window.matchMedia('(hover: none)').matches && !isPreviewing) {
          onPreview(topic.id);
          return;
        }
        navigate(path);
      }}
    >
      <Glyph id={topic.id} variant={fundament ? 'sq' : 'dot'} />
      <span className="tile-title">{topic.title}</span>
      <span className="tile-meta">{gpLabel(gpCountFor(topic.id))}</span>
    </a>
  );
}

function Step({ section, two, topics, preview, onPreview }) {
  return (
    <section className={'step' + (two ? ' step--two' : '')}>
      <div>
        <span className="step-label">{section.step}</span>
        <h2>{section.title}</h2>
        <p className="step-intro">{section.description}</p>
      </div>
      <div className="tile-grid">
        {topics.map(t => (
          <TopicTile key={t.id} topic={t} fundament={!two} preview={preview} onPreview={onPreview} />
        ))}
      </div>
    </section>
  );
}

function HomePage({ preview, onPreview }) {
  return (
    <div className="wrap page">
      <Collapsible title="Over het raamwerk">
        {HOME.lede.slice(1).map((para, i) => <p key={i}>{para}</p>)}
        <p className="doelgroep">{HOME.lede_sub}</p>
      </Collapsible>

      <div className="steps">
        <Step section={HOME.fundamenten_section} topics={FUNDAMENTEN}
              preview={preview} onPreview={onPreview} />
        <Step section={HOME.assistent_section} two topics={DOMEINEN}
              preview={preview} onPreview={onPreview} />
      </div>
    </div>
  );
}

Object.assign(window, { HomeHero, HomePage, Collapsible, TopicTile });
