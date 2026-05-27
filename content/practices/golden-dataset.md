---
id: golden-dataset
title: Bouw een golden dataset voor output, judges én RAG
summary: >
  Een golden dataset is het fundament van elke evaluatiestrategie — een
  gecureerde verzameling vragen met "ideale antwoorden" (en bij RAG: de
  bijbehorende bronnen) waartegen je elke wijziging in prompts, modellen of
  pijplijn kunt testen. Hij groeit met de werkelijkheid mee of raakt
  achterhaald.
domains: [antwoordkwaliteit, governance, kennis-capaciteit]
phases: [Pilot, Productie]
levels: [Tactisch, Bestuurlijk]
sources: []
---

Gebruik historische data als de assistent een klassieke tool vervangt: bestaande Q&A-paren, gecureerde casussen of e-mailbeantwoording zijn een goede startset. Niet vanaf nul beginnen — gebruik wat de organisatie al heeft als seed.

Laat experts voor-de-hand-liggende én edge cases maken: een dataset met alleen gemiddelde vragen meet alleen het makkelijke deel. Edge cases (uitzonderingen, gevoelige situaties, juridische randen) onthullen waar de assistent breekt.

Gebruik AI om de dataset uit te breiden, met expert-review: een LLM kan varianten genereren (parafrases, kleinere taalvariaties, foutieve formuleringen), maar elke gegenereerde sample wordt door een mens gevalideerd voordat hij de set instroomt. Anders bouw je een dataset die het model dat hem genereerde toetst — niet een dataset die de werkelijkheid toetst.

Bouw voor RAG een aparte golden dataset met verwachte bronnen per vraag: breng in kaart welke artikelen of chunks moeten worden opgehaald bij een bepaalde input. Zo kun je evalueren of je RAG-oplossing de juiste bronnen weet te identificeren — los van of het uiteindelijke antwoord goed is.

Kalibreer LLM-judges tegen menselijke scores op een sample: laat een QA-analist en de LLM-judge dezelfde set scoren en vergelijk. Pas de judge-prompt aan tot de scores convergeren. Zonder die kalibratie is je judge een willekeurige meter.

Behandel de golden dataset als levend document: voer edge cases uit de praktijk en gevonden fouten terug aan domeinexperts voor validatie en voeg ze toe aan de set. Een dataset die niet groeit met de werkelijkheid, raakt binnen maanden achterhaald.

Bouw de dataset in samenwerking met diverse stakeholders: engineers kunnen het niet alleen. Domeinexperts, productmanagers én gebruikers moeten vroeg betrokken worden voor label-curatie en ground truth. Een dataset zonder gebruikers-perspectief mist precies de signalen die er toe doen.

Documenteer eigenaarschap in een RACI-matrix: wie definieert "goed", wie zet de dataset op, wie cureert hem, wie draait evaluaties? Zonder expliciete verdeling valt het werk tussen wal en schip — en raakt de dataset stil.

Versionier de golden dataset: behandel hem als code, met PR-review op nieuwe samples en versielabels op runs. Anders weet je niet meer waartegen je een verbetering vergelijkt.
