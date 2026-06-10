---
id: multi-agent-kwaliteitsketen
title: Verbeter kwaliteit in elke stap van de keten (RAG + multi-agent)
summary: >
  Antwoordkwaliteit is het resultaat van keuzes in elke stap van de pijplijn van de assistent. De sleutel ligt hierbij in het gronden van antwoorden in echte data uit de organisatie (RAG) en in het verschuiven van een reactieve chatbot naar een agentische opzet waarin meerdere gespecialiseerde agents samenwerken (multi-agent setup). In een multi-agent setup grijp je gericht op meerdere plekken in — bij de modelkeuze(s), input-controle, bronnen, retrieval, generatie en output-controle — om de kwaliteit van de output te verbeteren.  
domains: [antwoordkwaliteit]
phases: [Pilot, Productie]
levels: [Developer/ Engineer]
sources:
  - stackviv-multi-agent
  - helm-stanford
  - nvidia-chunking-strategy
---
Bij RAG: 

Diversifieer en valideer bronnen in RAG: voorkom dat één onbetrouwbare bron de output domineert; weeg op autoriteit en actualiteit. Een RAG-systeem dat één blogpost als gezaghebbend behandelt levert hallucinaties met bronvermelding op: formeel correct, inhoudelijk fout.

Verbeter de kwaliteit van de opgehaalde data via chunking-strategie en relevantiecheck: een chunk is een stukje tekst waarin een groter document is opgeknipt. De keuze hoe te chunken (per pagina, per paragraaf, per semantisch blok) bepaalt of de juiste passages worden opgehaald. Combineer dat met een relevantiecheck op opgehaalde chunks. Niet alles wat lijkt te matchen is daadwerkelijk relevant.

Bij multi-agent setups:

- **Richt een samenwerking in tussen agents en geef elke agent één duidelijk doel**: één agent haalt relevante bronnen op, een tweede redeneert en stelt een conceptantwoord op, een derde controleert juistheid, compliance en toon, en een vierde bepaalt of escalatie naar een mens nodig is. Koppel iedere agent, wanneer relevant, aan een bestaande rol in de organisatie (bijv. de juridische outputcontrole is onder verantwoordelijkheid van de jurist). Overige voorbeelden van agents:
  - **Voeg een input-controle toe**: filter out-of-scope of schadelijke vragen vóór het generatie-proces door een specifieke input-controle-agent toe te voegen.
  - **Een confidence-agent**: laat het systeem inschatten hoe zeker het is over het antwoord, en escaleer naar een mens bij lage confidence.
  - **Een judge-loop**: laat AI-"judges" output evalueren en verfijnen totdat een kwaliteitsdrempel is bereikt (zie good practice 5).
- **Kies het juiste AI-model voor iedere agent** : HELM, een initiatief van Stanford, evalueert taalmodellen op meerdere scenario's tegelijk (bijvoorbeeld vraag en antwoord, samenvatten, redeneren) en op meerdere metrics (zoals nauwkeurigheid, robuustheid, bias, eerlijkheid).
- **Maak de afweging tussen kwaliteitsverbetering, latency en kosten expliciet**: Er is altijd een afweging tussen het toevoegen van kwaliteitsverbeteringen met latency en kosten: meer evaluatie- en controlestappen kunnen het systeem trager en duurder maken. Log per stap zowel kwaliteitswinst als extra latency en tokenverbruik; stop met stappen die meer kosten dan opleveren.
