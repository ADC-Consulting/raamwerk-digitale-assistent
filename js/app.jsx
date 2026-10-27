/* global React, ReactDOM, Band, SiteFooter, useRoute */
/* global HomeHero, HomePage, DomeinenHero, DomeinenPage, DomeinHero, DomeinDetail */
/* global PracticesHero, PracticesPage, PracticeHero, PracticeDetail, OverHero, OverPage */
/* global BronnenHero, BronnenPage, GlossaryHero, Glossary2, NotFoundHero, NotFoundPage */
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
  // Which onderwerp the big glyph in the band is showing. Lives here because
  // the glyph sits in the band and the tiles that drive it sit in <main>.
  const [preview, setPreview] = useStateA('governance');

  useEffectA(() => {
    document.documentElement.setAttribute('data-theme', t.theme);
    document.documentElement.setAttribute('data-density', t.density);
    // accent color
    // Accent writes only --accent. It must not touch --accent-hover: that is
    // theme-dependent, and an inline value here would beat the dark theme.
    const accents = { rijksblauw: '#01689b', hemelblauw: '#007bc7' };
    document.documentElement.style.setProperty('--accent', accents[t.accent] || accents.rijksblauw);
  }, [t.theme, t.density, t.accent]);

  function setTheme(theme) { setTweak('theme', theme); }

  // Render route. `hero` fills the slot inside the blue band.
  let hero = null;
  let page;
  const home = route === '/' || route === '';
  if (home) {
    hero = <HomeHero sel={preview}/>;
    page = <HomePage preview={preview} onPreview={setPreview}/>;
  }
  else if (route === '/domeinen') { hero = <DomeinenHero/>; page = <DomeinenPage/>; }
  else if (route.startsWith('/domeinen/')) {
    const id = route.slice('/domeinen/'.length);
    hero = <DomeinHero id={id}/>; page = <DomeinDetail id={id}/>;
  }
  else if (route === '/practices') { hero = <PracticesHero/>; page = <PracticesPage/>; }
  else if (route.startsWith('/practices/')) {
    const id = route.slice('/practices/'.length);
    hero = <PracticeHero id={id}/>; page = <PracticeDetail id={id}/>;
  }
  else if (route === '/over') { hero = <OverHero/>; page = <OverPage/>; }
  else if (route === '/bronnen') { hero = <BronnenHero/>; page = <BronnenPage/>; }
  else if (route === '/begrippenlijst') { hero = <GlossaryHero/>; page = <Glossary2/>; }
  else { hero = <NotFoundHero/>; page = <NotFoundPage/>; }

  return (
    <div className="app">
      <Band route={route} theme={t.theme} setTheme={setTheme}>{hero}</Band>
      <main>{page}</main>
      <SiteFooter/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Thema">
          <TweakRadio label="Modus" value={t.theme} onChange={v => setTweak('theme', v)}
                      options={[{label:'Licht', value:'light'},{label:'Donker', value:'dark'}]}/>
          <TweakRadio label="Accentkleur" value={t.accent} onChange={v => setTweak('accent', v)}
                      options={[{label:'Rijksblauw', value:'rijksblauw'},{label:'Hemelblauw', value:'hemelblauw'}]}/>
        </TweakSection>
        <TweakSection label="Layout">
          <TweakRadio label="Density" value={t.density} onChange={v => setTweak('density', v)}
                      options={[{label:'Ruim', value:'comfort'},{label:'Compact', value:'compact'}]}/>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
