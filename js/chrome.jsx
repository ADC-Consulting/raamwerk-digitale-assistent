/* global React */
const { useState, useEffect } = React;

/* ===== Routing (hash) ===== */
function parseHash() {
  const raw = (window.location.hash || '#/').replace(/^#/, '') || '/';
  // strip secondary anchor (e.g. /domeinen#digitale-assistent)
  return raw.split('#')[0];
}
function navigate(path) {
  const [base, anchor] = path.split('#');
  window.location.hash = '#' + base;
  if (anchor) {
    // wait a tick for the new route to render, then scroll the section into view
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 16;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}
function useRoute() {
  const [route, setRoute] = useState(parseHash());
  useEffect(() => {
    const fn = () => setRoute(parseHash());
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);
  return route;
}

/* ===== Icons ===== */
const Icon = {
  Sun: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>
    </svg>
  ),
  Moon: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
    </svg>
  ),
};

/* ===== Band (section 4): logo, navigation and search, on every page ===== */
const NAV_ITEMS = [
  { id: '/', label: 'Home' },
  { id: '/domeinen', label: 'Domeinen' },
  { id: '/practices', label: 'Good practices' },
  { id: '/bronnen', label: 'Bronnen' },
];

function isRouteActive(route, id) {
  if (id === '/') return route === '/' || route === '';
  return route === id || route.startsWith(id + '/');
}

function Band({ route, theme, setTheme, children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="band on-band">
      <div className="construction" role="status">
        <div className="construction-inner">
          <strong>In ontwikkeling</strong>
          <span>
            Sommige domeinen en teksten dienen nog als placeholder en kunnen op korte
            termijn wijzigen. Vragen of aanvullingen? Laat ze achter in de suggestiebox.
          </span>
        </div>
      </div>

      <div className="band-inner">
        <div className="topbar">
          <a className="logo" href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <span className="logo-lint" aria-hidden="true"></span>
            <span className="logo-text">Raamwerk<br/>Digitale Assistenten</span>
          </a>

          <button
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="hoofdnavigatie"
            onClick={() => setMenuOpen(o => !o)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
                 strokeWidth="2" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M6 18 18 6"/> : <path d="M4 7h16M4 12h16M4 17h16"/>}
            </svg>
            Menu
          </button>

          <nav id="hoofdnavigatie" className={'nav' + (menuOpen ? ' open' : '')}>
            {NAV_ITEMS.map(it => (
              <button
                key={it.id}
                className={'nav-item' + (isRouteActive(route, it.id) ? ' active' : '')}
                aria-current={isRouteActive(route, it.id) ? 'page' : undefined}
                onClick={() => { navigate(it.id); setMenuOpen(false); }}
              >
                {it.label}
              </button>
            ))}
            <button
              className="nav-item"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title="Thema wisselen"
              aria-label="Thema wisselen"
            >
              {theme === 'dark' ? <Icon.Sun/> : <Icon.Moon/>}
            </button>
          </nav>
        </div>
      </div>

      {children}

      <SearchBar />
    </header>
  );
}

/* ===== Footer ===== */
function SiteFooter() {
  return (
    <footer className="site-footer on-band">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h4>Raamwerk Digitale Assistenten</h4>
            <p style={{ maxWidth: 480 }}>
              Een handreiking voor overheidsorganisaties om digitale assistenten verantwoord,
              veilig en effectief in te zetten. Beheerd door ICTU in samenwerking met
              Digicampus en ADC.
            </p>
          </div>
          <div>
            <h4>Verken</h4>
            <ul>
              <li><a href="#/domeinen">Domeinen</a></li>
              <li><a href="#/practices">Good practices</a></li>
              <li><a href="#/bronnen">Bronnen</a></li>
              <li><a href="#/begrippenlijst">Begrippenlijst</a></li>
              <li><a href="#/over">Over dit raamwerk</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="#">placeholder: email</a></li>
              <li><a href="#">placeholder: ICTU</a></li>
              <li><a href="#">placeholder: ADC</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===== Suggestie blok ===== */
function SuggestieBlok() {
  return (
    <div className="side-card suggestie-blok">
      <h4>Suggestiebox</h4>
      <p className="suggestie-tekst">Vragen of aanvullingen? Help het raamwerk verbeteren met jouw praktijkervaring.</p>
      <a className="btn-primary suggestie-knop" href="https://forms.office.com/e/6Hn6uJGbn6"
         target="_blank" rel="noopener noreferrer">Suggestie indienen</a>
    </div>
  );
}

/* ===== Helpers exposed ===== */
Object.assign(window, { Icon, Band, SiteFooter, useRoute, navigate, SuggestieBlok, isRouteActive });
