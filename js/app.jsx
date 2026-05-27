/* global React, ReactDOM, Brandbar, Navbar, Footer, useRoute, HomePage, DomeinenPage, DomeinDetail, PracticesPage, PracticeDetail, OverPage, VariantD, Glossary2 */
/* global useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle */
const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "density": "comfort",
  "accent": "rijksblauw"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const route = useRoute();

  useEffectA(() => {
    document.documentElement.setAttribute('data-theme', t.theme);
    document.documentElement.setAttribute('data-density', t.density);
    // accent color
    const accents = {
      rijksblauw:  { c600: '#01689b', c700: '#0a78b0' },
      hemelblauw:  { c600: '#007bc7', c700: '#01689b' },
      donkergroen: { c600: '#39870c', c700: '#2e6c09' },
    };
    const a = accents[t.accent] || accents.rijksblauw;
    document.documentElement.style.setProperty('--ro-blue-600', a.c600);
    document.documentElement.style.setProperty('--ro-blue-700', a.c700);
  }, [t.theme, t.density, t.accent]);

  function setTheme(theme) { setTweak('theme', theme); }

  // Render route
  let page;
  if (route === '/' || route === '') page = <HomePage tweaks={t}/>;
  else if (route === '/domeinen') page = <DomeinenPage/>;
  else if (route.startsWith('/domeinen/')) page = <DomeinDetail id={route.slice('/domeinen/'.length)}/>;
  else if (route === '/practices') page = <PracticesPage/>;
  else if (route.startsWith('/practices/')) page = <PracticeDetail id={route.slice('/practices/'.length)}/>;
  else if (route === '/over') page = <OverPage/>;
  else if (route === '/bronnen') page = <VariantD/>;
  else if (route === '/begrippenlijst') page = <Glossary2/>;
  else page = <HomePage tweaks={t}/>;

  return (
    <div className="app">
      <div className="dev-banner" role="status" aria-live="polite">
        <span className="dev-banner-dot" aria-hidden="true"></span>
        <span>
          <strong>In ontwikkeling</strong> — deze website is nog onder review.
          Sommige domeinen en teksten zijn nog placeholder en kunnen wijzigen.
        </span>
      </div>
      <Brandbar/>
      <Navbar route={route} theme={t.theme} setTheme={setTheme}/>
      <main>{page}</main>
      <Footer/>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Thema">
          <TweakRadio label="Modus" value={t.theme} onChange={v => setTweak('theme', v)}
                      options={[{label:'Licht', value:'light'},{label:'Donker', value:'dark'}]}/>
          <TweakRadio label="Accentkleur" value={t.accent} onChange={v => setTweak('accent', v)}
                      options={[{label:'Rijksblauw', value:'rijksblauw'},{label:'Hemelblauw', value:'hemelblauw'},{label:'Donkergroen', value:'donkergroen'}]}/>
        </TweakSection>
        <TweakSection title="Layout">
          <TweakRadio label="Density" value={t.density} onChange={v => setTweak('density', v)}
                      options={[{label:'Ruim', value:'comfort'},{label:'Compact', value:'compact'}]}/>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
