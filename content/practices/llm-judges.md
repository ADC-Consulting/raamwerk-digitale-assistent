---
id: llm-judges
title: Gebruik LLM-judges voor schaalbare evaluatie
summary: >
  Een LLM-judge is een taalmodel dat je inzet om andere AI-output te beoordelen. In plaats van dat een mens elk antwoord nakijkt, laat je een LLM de rol van "beoordelaar" spelen: hij krijgt een vraag, een antwoord, en een set criteria, en geeft daar een oordeel over.  Het werkt onder voorwaarden: maak het scoringssysteem zo simpel mogelijk (bij voorkeur binair: goed / niet goed, met heldere uitleg wat goed en niet goed betekent).
domains: [evaluatie-assistent]
phases: [Pilot, Productie]
levels: [Developer/ Engineer]
sources:
  - ragas
  - deepeval
  - langfuse
  - langwatch
  - llm-council
---

Gebruik een LLM-judge om edge cases te identificeren: Een LLM judge is niet foutloos, maar hij kan duizenden antwoorden razendsnel scoren. Zijn echte waarde zit in het zichtbaar maken van de twijfelgevallen en de mogelijke fouten. Die leg je vervolgens voor aan een mens. Zo houd je menselijke review behapbaar én blijf je grip houden op kwaliteit. 

Aggregeer meerdere judge-runs voor stabiliteit: LLMs zijn stochastisch; draai dezelfde judge meerdere keren of laat meerdere modellen oordelen (zie Karpathy's llm-council als concreet open-source voorbeeld). 

Zet LLM judges in als agents in een multi-agent setup van de assistent: Een multi-agent setup is een AI-systeem dat niet uit één groot taalmodel met één grote opdracht bestaat, maar uit meerdere kleinere "agents" die elk een eigen, afgebakende taak hebben. Samen werken ze aan het uiteindelijke antwoord. Zet bijvoorbeeld één judge in om feitelijke juistheid te toetsen, één voor toon, één voor compliance ("Je mag geen uitspraken doen alsof je een dokter bent").  


Houd mens‑in‑de‑loop bij gevoelige domeinen: Combineer LLM‑as‑a‑judge altijd met steekproefsgewijze menselijke review, zeker bij juridische, beleidsmatige of andere gevoelige toepassingen. Betrek inhoudsexperts (juristen, beleidsmedewerkers, vakdeskundigen) nadrukkelijk bij de beoordeling van “moeilijke” categorieën en randgevallen.

Pas op: Wees je ervan bewust dat een LLM als 'scheidsrechter' bij evaluaties niet altijd consistent is. Dezelfde modeloutput kan bij herhaalde beoordelingen door hetzelfde model toch een andere score krijgen. Deze mogelijke inconsistentie moet expliciet als risico worden benoemd en meegenomen in het evaluatie‑ en risicobeoordeling.
