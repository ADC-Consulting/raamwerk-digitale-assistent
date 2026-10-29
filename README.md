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

### Overig

```
js/       ← React-componenten
css/      ← stijlen
scripts/  ← build- en watch-script
docs/     ← statische assets en afbeeldingen voor practices
```

---

## index.html

Het ingangspunt van de website. Laadt React 18 en Babel via CDN, dan `js/data.js`, en daarna de JSX-componenten in volgorde:

1. `tweaks-panel.jsx`
2. `chrome.jsx`
3. `diagram.jsx`
4. `pages.jsx`
5. `bronnen.jsx`
6. `glossary.jsx`
7. `app.jsx` ← altijd als laatste

> Voeg nieuwe componenten toe vóór `app.jsx`.
