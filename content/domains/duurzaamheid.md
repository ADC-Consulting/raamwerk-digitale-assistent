---
id: duurzaamheid
nr: 5
title: Duurzaamheid
short: De milieu-impact van een digitale assistent over de hele levenscyclus — energie, CO₂, water, hardware — en hoe je die actief stuurt.
status: published
practices:
  - kleinste-model-per-taak
  - zuinige-inferentie
  - meet-energie-emissies
samenhang_blokken:
  - naam: Infrastructuur & Data
    omschrijving: "AI-rekeninfrastructuur is energie-intensief. Modelroutering, kwantisatie en efficiënt model-serving zijn zowel kosten- als duurzaamheidsmaatregelen. Kies het 'smallest sufficient model' per taak en pas semantische caching toe in RAG-pipelines."
  - naam: Technische Prestaties
    omschrijving: "Modelgrootte, batching en caching beïnvloeden latency én energieverbruik tegelijk. Een zuiniger model is doorgaans ook een sneller model — maar over-optimalisatie (te agressieve chunking, te lage retrieval-thresholds) kan kwaliteit kosten. Meet beide dimensies."
  - naam: Compliance
    omschrijving: "EU AI Act artikel 40 mandateert standaarden voor energie-efficiëntie over de hele AI-levenscyclus. CSRD verplicht Scope 3-rapportage waarin AI-uitstoot meegenomen moet worden — zonder meting geen auditable rapportage."
  - naam: Governance
    omschrijving: "Portfolio-keuzes (welke use cases krijgen prioriteit?) en SLA-doelen (welke CO₂-limieten gelden?) zijn duurzaamheidsbeslissingen op bestuurlijk niveau. Borg duurzaamheid in het AI-transformatieplan en in MVI-eisen."
  - naam: Antwoordkwaliteit
    omschrijving: "Kleinere modellen besparen energie maar kunnen kwaliteit kosten. De juiste afweging vereist een golden dataset waarop modelkeuzes vergelijkend gemeten worden — anders verschuif je het probleem in plaats van het op te lossen."
sources:
  - eu-ai-act-art40
  - itu-l1801
  - nerds-duurzaamheid
  - eindrapport-genai-duurzaamheid
  - actieplan-duurzame-digitalisering
  - nora-digitale-duurzaamheid
---

Duurzaamheid van een digitale assistent gaat over de milieu-impact die ontstaat door het bouwen, trainen, gebruiken en uiteindelijk afbouwen van die assistent. Het draait primair om energieverbruik, CO₂-uitstoot, waterverbruik (voor koeling en stroomopwekking) en materiaal- en e-waste-impact van de onderliggende modellen en infrastructuur — en om het voorkomen van onnodige verspilling over de hele levenscyclus.

Voor de Nederlandse overheid is dit uitgewerkt in het Eindrapport Generatieve AI en duurzaamheid (BZK / Universiteit Utrecht, januari 2025), dat duurzaamheid expliciet benoemt als randvoorwaarde voor verantwoorde inzet van generatieve AI, en het Actieplan Duurzame Digitalisering (EZK, 2024, geactualiseerd 2025) dat de digitale sector als geheel wil vergroenen. Op Europees niveau vraagt de AI-verordening (artikel 40) om standaarden voor het terugdringen van energie- en hulpbronnengebruik over de hele AI-levenscyclus.

Duurzaamheid valt uiteen in vier samenhangende lagen die je alle vier expliciet moet maken:

- **Operationele impact per interactie** — Direct energie- en waterverbruik tijdens inference: het rekenwerk op de server (CPU/GPU) om tokens te verwerken, het netwerkverkeer tussen gebruiker, applicatie en datacenter, en datacenter-overhead (koeling, stroomvoorziening). Bij volwassen AI-diensten is niet de eenmalige training maar juist inferentie verantwoordelijk voor 80–90% van het totale energiegebruik over de levensduur.
- **Ingebedde (embodied) impact** — CO₂ en grondstoffen die vastzitten in de productie van GPU's, servers en netwerkhardware. Deze telt mee in de SCI for AI-specificatie en wordt relevanter naarmate stroom verder vergroent.
- **Levenscyclus-impact** — Experimenteerfasen (hyperparameter-tuning, modelvergelijkingen), bewaartermijnen van embeddings en logs, en het niet tijdig afschalen of opschonen van ongebruikte modellen en indexen.
- **Water- en locatie-impact** — Koeling en stroomopwekking gebruiken water. Bij AI-datacenters kan dit oplopen tot miljoenen liters per dag. Locatie en koeltechniek maken hier grote verschillen.

---

Een digitale assistent schaalt zijn voetafdruk mee met het aantal interacties. Een inefficiënte assistent wordt op schaal niet alleen duur, maar ook een zichtbare belemmering aan de klimaatdoelen die de overheid zichzelf stelt. Bij goede invulling staan daar reële voordelen tegenover: beheersbare kosten, een kleinere voetafdruk per use case, betere aansluiting bij Maatschappelijk Verantwoord Inkopen (MVI) van de rijksoverheid en een overheid die geloofwaardig blijft op haar eigen klimaatbeleid.

- **Belangrijk voor de burger:** Lagere overheidskosten, minder papierwerk, en vertrouwen dat de overheid vooruitdenkt over haar eigen voetafdruk. Een efficiënte assistent levert dezelfde service met minder maatschappelijke kosten.
- **Belangrijk voor de organisatie:** Controleerbare kosten en betere regie over het AI-budget. Modelkeuze en inferentie-optimalisatie zijn de grootste kostendrijvers; duurzaamheidsmaatregelen zijn vrijwel altijd ook kostenbesparingen.
- **Belangrijk voor de overheid als geheel:** Verplichte CSRD-rapportage over Scope 3-emissies, voldoen aan AI Act artikel 40, minder afhankelijkheid van energie-intensieve buitenlandse aanbieders en meer digitale soevereiniteit. Een duurzame AI-overheid is geloofwaardiger en weerbaarder.
