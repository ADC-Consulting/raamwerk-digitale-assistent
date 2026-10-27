# Raamwerk Digitale Assistenten in Overheidsdienstverlening

Praktisch raamwerk voor overheidsorganisaties die digitale assistenten verantwoord willen ontwikkelen en inzetten. Gebouwd als statische website met React — geen bundler, geen framework, gewoon bestanden.

---

## Inhoudsopgave

- [Lokaal starten](#lokaal-starten)
- [Content aanpassen](#content-aanpassen)
- [Bestandsstructuur](#bestandsstructuur)
- [Afbeeldingen bij practices](#afbeeldingen-bij-practices)
- [index.html](#indexhtml)

---

## Lokaal starten

```bash
# Eenmalig: installeer dependencies
python3 -m venv venv
venv/bin/pip install pyyaml

# Start de lokale webserver
python3 -m http.server 8000
```

Open `http://localhost:8000` in de browser.

---

## Content aanpassen

Alle inhoud staat in `content/`. Na een wijziging moet `js/data.js` opnieuw gegenereerd worden.

**Automatisch (aanbevolen)** — start de watcher in een apart terminalvenster:

```bash
python3 scripts/watch.py
```

**Handmatig:**

```bash
python3 scripts/build.py
```

> De browser ververst niet automatisch — doe dit handmatig na een build.

---

## Bestandsstructuur

### Content (aanpassen)

| Bestand | Inhoud |
|--------|--------|
| `content/domains/*.md` | Domeinpagina's |
| `content/practices/*.md` | Good practices met filters en bronnen |
| `content/bronnen.yaml` | Alle bronnen en referenties met URL |
| `content/glossery.yaml` | Begrippenlijst (`gloss-` IDs, `seeAlso` verwijst naar `bronnen.yaml`) |
| `content/home.yaml` | Tekst op de homepage |
| `content/context_raamwerk.yaml` | Tekst op de 'Over'-pagina |
| `content/filters.yaml` | Filteropties (fasen, niveaus) |

### Gegenereerd (niet aanpassen)

| Bestand | Inhoud |
|--------|--------|
| `js/data.js` | Gegenereerd door `build.py` — wijzigingen worden overschreven |
| `js/glyph-data.js` | Gegenereerd door `scripts/glyphs/build_glyphs.py` — de 16x16 glyph-maskers |

### Overig

```
js/       ← React-componenten
css/      ← stijlen (tokens → base → chrome → components → pages)
scripts/  ← build-, watch- en controlescripts
docs/     ← statische assets en afbeeldingen voor practices
```

## Deployen

`scripts/build.py` zet een versiehash achter de css- en js-urls in `index.html`
(`css/base.css?v=abc123`). Zonder die hash serveert een browser of proxy een
verse `index.html` naast een gecachete `js/pages.jsx`, en dan breekt de site op
een manier die op een mislukte deploy lijkt.

> **Draai `python3 scripts/build.py` voordat je commit en deployt**, ook als je
> alleen css of jsx hebt aangepast. Anders blijft de hash staan op de vorige
> versie en krijgen bezoekers oude bestanden.

Gaat er na een deploy toch iets mis: ververs eerst hard (Cmd+Shift+R of
Ctrl+F5). Blijft het staan, kijk dan in de console welk bestand klaagt.

## Vormgeving

De vormgeving volgt `Ontwerpprincipes Raamwerk Digitale Assistenten`: lintblauw en
wit, Fira Sans, rechte hoeken (behalve de zoekbalk), geen schaduwen, en glyphs
waarin vorm betekenis draagt — fundamenten zijn blokken, domeinen zijn punten.

De CSS staat in vijf lagen. `tokens.css` bevat het ruwe palet en daarboven een
set semantische rollen (`--surface-band`, `--text-soft`, `--on-brand`, …).
**Componenten gebruiken alleen die rollen, nooit het ruwe palet.** "Tekst op
blauw" is geen kleur maar een context: de klasse `.on-band` herdefinieert de
rollen, `.on-surface` zet ze terug voor een wit paneel binnen de blauwe kop.

### Bewuste afwijkingen van de ontwerpprincipes

| Afwijking | Reden |
|---|---|
| Donkere modus | Bewust behouden. Het donkere thema herdefinieert het ruwe palet, zodat de rollen meebewegen. Let op: een fundament-tegel is in de lichte modus donkerder dan de pagina en in de donkere modus juist lichter — vorm (blok versus punt) draagt de betekenis, niet de tint. |
| Focusrand op de blauwe kop is wit | De voorgeschreven `#01689b` is vrijwel onzichtbaar op lintblauw; paragraaf 2 staat op dat vlak alleen wit of `#dce8f3` toe. |
| Accentkleur instelbaar | Het tweaks-paneel schrijft uitsluitend `--accent`. Het mag `--accent-hover` niet zetten: die is thema-afhankelijk en een inline-waarde wint het van het donkere thema. |

### Glyphs opnieuw genereren

De glyphs zijn het lijnicoon van een onderwerp, gerasterd op 16 × 16. De maskers
staan in `js/glyph-data.js`. Pas je een icoon aan in
`scripts/glyphs/build_glyphs.py`, draai dan:

```bash
python3 scripts/glyphs/build_glyphs.py   # vereist rsvg-convert en Pillow
```

`scripts/check_content.py` controleert dat elk onderwerp een masker heeft.

---

## index.html

Het ingangspunt van de website. Laadt React 18 en Babel via CDN, dan `js/data.js`, en daarna de JSX-componenten in volgorde:

1. `glyphs.jsx` ← tekent de glyphs uit `glyph-data.js`
2. `model.jsx` ← fundament/domein-indeling, labels en de kerncijfers
3. `tweaks-panel.jsx`
4. `search.jsx`
5. `chrome.jsx`
6. `page-home.jsx`
7. `pages.jsx`
8. `bronnen.jsx`
9. `glossary.jsx`
10. `app.jsx` ← altijd als laatste

De scripts delen één globale scope: elk bestand hangt zijn exports aan `window`
en hooks worden per bestand hernoemd (`useStateQ`, `useS`, …) om botsingen te
voorkomen. De volgorde in `index.html` ís daarmee de afhankelijkheidsvolgorde.

> Voeg nieuwe componenten toe vóór `app.jsx`.
