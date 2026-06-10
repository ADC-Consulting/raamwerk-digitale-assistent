---
id: llm-judges
title: Gebruik LLM-judges voor schaalbare evaluatie
summary: >
  Een LLM-judge is een taalmodel dat je inzet om andere AI-output te beoordelen. In plaats van dat een mens elk antwoord nakijkt, laat je een LLM de rol van "beoordelaar" spelen: hij krijgt een vraag, een antwoord, en een set criteria, en geeft daar een oordeel over.  Het werkt onder voorwaarden: maak het scoringssysteem zo simpel mogelijk (bij voorkeur binair: goed / niet goed, met heldere uitleg wat goed en niet goed betekent), en geef een judge maximaal één complexe taak.  
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
Een LLM-judge zou je ook kunnen inzetten om antwoorden van de assistent te vergelijken met antwoorden uit de golden dataset. In de praktijk werkt dit minder goed omdat semantische gelijkenis is een onbetrouwbare proxy is voor kwaliteit. 

<!-- tips -->

Gebruik een LLM-judge om edge cases te identificeren: Een LLM judge is niet foutloos, maar hij kan duizenden antwoorden razendsnel scoren. Zijn echte waarde zit in het zichtbaar maken van de twijfelgevallen en de mogelijke fouten. Die leg je vervolgens voor aan een mens. Zo houd je menselijke review behapbaar én blijf je grip houden op kwaliteit. 

Aggregeer meerdere judge-runs voor stabiliteit: LLMs zijn stochastisch; draai dezelfde judge meerdere keren of laat meerdere modellen oordelen (zie Karpathy's llm-council als concreet open-source voorbeeld). 

Kalibreer continu op echte fouten: Vang negatieve gebruikersfeedback (zoals een thumbs-down of een afgekeurde actie) systematisch op: voeg het geval toe aan je evaluatieset, label het, en gebruik deze nieuwe voorbeelden om de judge-prompt aan te scherpen. 

Zet LLM judges in als agents in een multi-agent setup van de assistent: Een multi-agent setup is een AI-systeem dat niet uit één groot taalmodel met één grote opdracht bestaat, maar uit meerdere kleinere "agents" die elk een eigen, afgebakende taak hebben. Samen werken ze aan het uiteindelijke antwoord. Zet bijvoorbeeld één judge in om feitelijke juistheid te toetsen, één voor toon, één voor compliance ("Je mag geen uitspraken doen alsof je een dokter bent"). Eén grote judge-prompt werkt slecht. 