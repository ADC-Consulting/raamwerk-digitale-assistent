---
id: llm-judges
title: Gebruik LLM-judges voor schaalbare evaluatie
summary: >
  Een LLM-judge is een taalmodel dat andere AI-output beoordeelt. Mensen
  kunnen niet duizend antwoorden per dag nakijken; LLM-judges wel. Houd het
  scoringssysteem simpel (bij voorkeur binair), geef één judge één taak, en
  kalibreer continu op menselijke beoordelingen.
domains: [antwoordkwaliteit, governance]
phases: [Pilot, Productie]
levels: [Operationeel, Tactisch]
sources:
  - ragas
  - deepeval
  - langfuse
  - langwatch
  - llm-council
---

Houd het scoringssysteem zo simpel mogelijk: bij voorkeur binair (goed / niet goed), met heldere uitleg wat goed en niet goed betekent. Vijfpuntsschalen klinken precies maar leveren onbetrouwbare metingen — een LLM-judge kalibreert binair vrijwel altijd beter dan numeriek.

Geef een judge maximaal één complexe taak: een judge die tegelijk feitelijke juistheid, toon én compliance moet beoordelen, geeft inconsistente uitkomsten. Eén judge per dimensie levert betere én verklaarbare resultaten op.

Gebruik LLM-judges om edge cases te identificeren, niet als enige scheidsrechter: een LLM-judge is niet foutloos, maar kan duizenden antwoorden razendsnel scoren. De echte waarde zit in het zichtbaar maken van twijfelgevallen en mogelijke fouten — die leg je vervolgens voor aan een mens. Zo houd je menselijke review behapbaar.

Aggregeer meerdere judge-runs voor stabiliteit: LLMs zijn stochastisch. Draai dezelfde judge meerdere keren of laat meerdere modellen oordelen (Karpathy's `llm-council` is een concreet open-source voorbeeld van een multi-LLM-judge-aanpak). Aggregatie reduceert ruis aanzienlijk.

Kalibreer continu op echte fouten: vang negatieve gebruikersfeedback (thumbs-down, afgekeurde acties) systematisch op, voeg het geval toe aan de evaluatieset, label het, en gebruik die nieuwe voorbeelden om de judge-prompt aan te scherpen. Een judge die niet leert van productie-fouten loopt achter de feiten aan.

Zet LLM-judges in als agents in een multi-agent setup: een controle-agent specifiek voor feitelijke juistheid, één voor toon, één voor compliance ("Je mag geen uitspraken doen alsof je een dokter bent"). Eén grote judge-prompt werkt slecht; gescheiden judges met scherpe scope werken beter.

Documenteer de judge-prompts als productiecode: judge-prompts versioner je in Git met PR-review, niet in een vendor-UI. Een judge-prompt is meet-instrumentarium — wijzigingen erin beïnvloeden alle historische metingen en moeten daarom transparant zijn.

Vergelijk judges met menselijke beoordeling op een gekalibreerde sample: laat een QA-analist en de LLM-judge dezelfde 100 cases scoren en vergelijk de afwijking. Pas de judge-prompt aan tot de scores convergeren. Zonder kalibratie weet je niet of de judge meet wat je denkt.

Gebruik bestaande RAG-evaluatieframeworks waar mogelijk: RAGAS biedt faithfulness, answer relevancy, context precision en context recall als out-of-the-box judge-metrics. DeepEval ("Pytest voor LLM's") integreert in CI/CD. Langfuse en LangWatch bieden tracing met geïntegreerde judges. Begin daar in plaats van zelf judge-frameworks te bouwen.
