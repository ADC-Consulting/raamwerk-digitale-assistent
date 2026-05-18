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
  Search: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
    </svg>
  ),
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </svg>
  ),
  Suggest: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M5.6 18.4l2.1-2.1M12 21v-3M18.4 18.4l-2.1-2.1M21 12h-3M18.4 5.6l-2.1 2.1"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
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
  Close: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M6 6l12 12M6 18 18 6"/>
    </svg>
  ),
};

/* ===== Domain icons — small abstract glyphs ===== */
function DomainGlyph({ id }) {
  // pick from a small set keyed by domain id
  const stroke = "currentColor";
  const sw = 1.6;
  const map = {
    'antwoordkwaliteit': <g fill="none" stroke={stroke} strokeWidth={sw}><path d="M5 7h14M5 12h10M5 17h7"/><path d="m17 15 2 2 4-4" stroke="currentColor"/></g>,
    'technische-prestaties': <g fill="none" stroke={stroke} strokeWidth={sw}><path d="M3 18h18"/><path d="m5 14 4-5 4 3 6-8"/><circle cx="5" cy="14" r="1.4"/><circle cx="9" cy="9" r="1.4"/><circle cx="13" cy="12" r="1.4"/><circle cx="19" cy="4" r="1.4"/></g>,
    'functionaliteit': <g fill="none" stroke={stroke} strokeWidth={sw}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="3.5"/></g>,
    'gebruikerservaring': <g fill="none" stroke={stroke} strokeWidth={sw}><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/></g>,
    'digitale-soevereiniteit': <g fill="none" stroke={stroke} strokeWidth={sw}><path d="M12 3 4 6v6c0 4.5 3 7.5 8 9 5-1.5 8-4.5 8-9V6l-8-3z"/><path d="m9 12 2 2 4-4"/></g>,
    'ethiek-mensenrechten': <g fill="none" stroke={stroke} strokeWidth={sw}><path d="M12 3v18M5 7h14M3 12c2 3 5 3 6 0M15 12c1 3 4 3 6 0"/></g>,
    'compliance': <g fill="none" stroke={stroke} strokeWidth={sw}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></g>,
    'beveiliging': <g fill="none" stroke={stroke} strokeWidth={sw}><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15" r="1.2" fill={stroke}/></g>,
    'cultuur-adoptie': <g fill="none" stroke={stroke} strokeWidth={sw}><circle cx="7" cy="8" r="2.5"/><circle cx="17" cy="8" r="2.5"/><circle cx="12" cy="16" r="2.5"/><path d="M9 9.5 11 14M15 9.5 13 14"/></g>,
    'kennis-capaciteit': <g fill="none" stroke={stroke} strokeWidth={sw}><path d="M4 5h7a3 3 0 0 1 3 3v12"/><path d="M20 5h-3a3 3 0 0 0-3 3v12"/><path d="M4 5v14h7"/><path d="M20 5v14h-3"/></g>,
    'governance': <g fill="none" stroke={stroke} strokeWidth={sw}><path d="M4 20h16M5 20V9M9 20V9M15 20V9M19 20V9M4 9l8-5 8 5"/></g>,
    'infrastructuur-data': <g fill="none" stroke={stroke} strokeWidth={sw}><ellipse cx="12" cy="6" rx="7" ry="2.5"/><path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6"/><path d="M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6"/></g>,
    'monitoring-evaluatie': <g fill="none" stroke={stroke} strokeWidth={sw}><circle cx="12" cy="12" r="9"/><path d="M12 12V5M12 12l5 3"/></g>,
    'inkoop-leveranciers': <g fill="none" stroke={stroke} strokeWidth={sw}><path d="M4 7h16l-1 12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></g>,
    'duurzaamheid': <g fill="none" stroke={stroke} strokeWidth={sw}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></g>,
  };
  return (
    <svg viewBox="0 0 24 24" className="domain-icon" aria-hidden="true">
      {map[id] || <circle cx="12" cy="12" r="9" fill="none" stroke={stroke} strokeWidth={sw}/>}
    </svg>
  );
}

/* ===== Logobar ===== */
function Brandbar() {
  return (
    <header className="logobar">
      <img src="docs/logo.png" alt="Rijksoverheid" className="site-logo" />
    </header>
  );
}

/* ===== Navbar ===== */
function Navbar({ route, theme, setTheme }) {
  const [dropOpen, setDropOpen] = useState(false);

  const items = [
    { id: '/', label: 'Home' },
    { id: '/domeinen', label: 'Domeinen' },
    { id: '/practices', label: 'Good Practices' },
  ];

  const overSubItems = [
    { id: '/over', label: 'Over dit raamwerk' },
    { id: '/bronnen', label: 'Bronnen' },
    { id: '/begrippenlijst', label: 'Begrippenlijst' },
  ];

  const isActive = (id) => {
    if (id === '/') return route === '/' || route === '';
    return route === id || route.startsWith(id + '/');
  };

  const overActive = ['/over', '/bronnen', '/begrippenlijst'].some(id => isActive(id));

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <div className="nav-links">
          {items.map(it => (
            <button
              key={it.id}
              className={'nav-link' + (isActive(it.id) ? ' active' : '')}
              onClick={() => navigate(it.id)}
            >
              {it.label}
            </button>
          ))}

          <div
            className="nav-dropdown-wrap"
            onMouseEnter={() => setDropOpen(true)}
            onMouseLeave={() => setDropOpen(false)}
          >
            <button
              className={'nav-link' + (overActive ? ' active' : '')}
              onClick={() => navigate('/over')}
            >
              Context
              <svg viewBox="0 0 10 6" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.8"
                style={{ marginLeft: 6, flexShrink: 0, transition: 'transform .15s', transform: dropOpen ? 'rotate(180deg)' : 'none' }}>
                <path d="M1 1l4 4 4-4"/>
              </svg>
            </button>

            {dropOpen && (
              <div className="nav-dropdown">
                {overSubItems.map(sub => (
                  <button
                    key={sub.id}
                    className={'nav-dropdown-item' + (isActive(sub.id) ? ' active' : '')}
                    onClick={() => { navigate(sub.id); setDropOpen(false); }}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="nav-actions" style={{ gap: 8 }}>
          <button className="nav-suggest" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Thema wisselen" aria-label="Thema wisselen">
            {theme === 'dark' ? <Icon.Sun/> : <Icon.Moon/>}
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ===== Footer ===== */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Raamwerk Digitale Assistenten</h4>
            <p style={{ margin: 0, maxWidth: 480 }}>
              Een handreiking voor overheidsorganisaties om digitale assistenten verantwoord,
              veilig en effectief in te zetten. Beheerd door ICTU in samenwerking met
              Digicampus en ADC.
            </p>
          </div>
          <div>
            <h4>Verken</h4>
            <ul>
              <li><a href="#/domeinen">Domeinen</a></li>
              <li><a href="#/practices">Good Practices</a></li>
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

/* ===== Helpers exposed ===== */
Object.assign(window, { Icon, DomainGlyph, Brandbar, Navbar, Footer, useRoute, navigate });
