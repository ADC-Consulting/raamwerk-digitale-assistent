# Kennisgraaf — interactieve kennisgraaf

Een standalone, interactieve visualisatie van het Raamwerk Digitale Assistent:
domeinen, good practices, bronnen, begrippen en filters (fases/niveaus/categorieën)
en al hun onderlinge verbanden. **401 knooppunten, 1111 verbindingen.**

Twee weergaven (schakel bovenin heen en weer):
- **`index.html`** — "Sterrenbeeld": domeinen als binnenring, good practices in de middenring,
  bronnen in de buitenring, met verbindingen als sterrenbeelden. Volledig dependency-vrij
  (geen bibliotheek, geen internet nodig). Dit is de standaard-landingspagina.
- **`netwerk.html`** — netwerk-versie (force-directed, alle knooptypen + filters + zoeken).

## Bekijken

**Dubbelklik gewoon `kennisgraaf/index.html`** — de pagina is volledig zelfstandig
(geen server, geen internet, geen login nodig). De graafbibliotheek
([force-graph](https://github.com/vasturiano/force-graph)) is lokaal meegeleverd in
`vendor/`; er zijn geen externe verzoeken.

Wil je toch via een server werken, kies dan een vrije poort (niet 8000 als daar al
iets draait):

```
python3 -m http.server 8777     # vanuit de repo-root
# → http://localhost:8777/kennisgraaf/
```

## Gebruik

- **Sleep** om te pannen, **scroll** om te zoomen, **sleep een knoop** om te herschikken.
- **Hover** over een knoop → buren lichten op.
- **Klik** een knoop → detailpaneel met de volledige tekst en klikbare relaties.
- **Legenda** links: klik een knooptype om het te tonen/verbergen.
- **Filters**: fase / organisatieniveau (good practices) en broncategorie (bronnen).
- **Zoek** rechtsboven; **thema** licht/donker met de knop ernaast.
- Deep-links: `?node=<id>` opent een knoop, `?theme=dark|light` forceert het thema.
  Voorbeeld: `?node=practice:rag-pijplijn`.

## Data

De graaf leest `graph-data.js` (`window.KNOWLEDGE_GRAPH`). Die wordt — samen met de
canonieke `content/knowledge-graph.json` — gegenereerd uit `content/`:

```
python3 scripts/build_graph.py
```

Niet met de hand bewerken; pas de inhoud aan in `content/` en genereer opnieuw.
Elke knoop bevat een `href` die teruglinkt naar de bijbehorende pagina op de
hoofdsite (`https://demo-opschalingsticket-digitale-assistent.dokploy.adc-it.com/#/...`);
bron-knopen linken naar hun externe URL.
