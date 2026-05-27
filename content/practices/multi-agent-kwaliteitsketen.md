---
id: multi-agent-kwaliteitsketen
title: Verbeter kwaliteit in elke stap van de keten (RAG + multi-agent)
summary: >
  Antwoordkwaliteit is het resultaat van keuzes in elke stap van de pijplijn:
  modelkeuze, input-controle, bronnen, retrieval, generatie en output-controle.
  Een multi-agent setup met scherp afgebakende verantwoordelijkheden grijpt
  gericht in op meerdere plekken tegelijk.
domains: [antwoordkwaliteit, infrastructuur-data, functionaliteit, technische-prestaties]
phases: [Pilot, Productie]
levels: [Operationeel, Tactisch]
sources:
  - stackviv-multi-agent
  - helm-stanford
  - nvidia-chunking-strategy
---

Diversifieer en valideer bronnen in RAG: voorkom dat één onbetrouwbare bron de output domineert; weeg op autoriteit en actualiteit. Een RAG-systeem dat één blogpost als gezaghebbend behandelt levert hallucinaties met bronvermelding op — formeel correct, inhoudelijk fout.

Verbeter de kwaliteit van de opgehaalde data via chunking-strategie en relevantiecheck: een chunk is een stukje tekst waarin een groter document is opgeknipt. De keuze hoe te chunken (per pagina, per paragraaf, per semantisch blok) bepaalt of de juiste passages worden opgehaald. Combineer dat met een relevantiecheck op opgehaalde chunks — niet alles wat lijkt te matchen is daadwerkelijk relevant.

Richt een samenwerking in tussen agents met elk één duidelijk doel: één agent haalt relevante bronnen op, een tweede stelt een conceptantwoord op, een derde controleert juistheid en toon, een vierde bepaalt of escalatie naar een mens nodig is. Eén grote prompt die alles doet is moeilijker te debuggen, te testen én te verbeteren.

Koppel agents waar relevant aan een bestaande rol in de organisatie: de juridische outputcontrole valt onder de jurist; de inhoudelijke domeincheck onder de domeinexpert. Dat maakt verantwoordelijkheid expliciet en versterkt vertrouwen in de uitkomst.

Voeg een input-controle-agent toe: filter out-of-scope of schadelijke vragen vóór het generatie-proces. Een vraag die niet in de scope hoort, hoeft niet door het hele systeem te lopen — dat scheelt latency, kosten én risico.

Voeg een confidence-agent toe: laat het systeem inschatten hoe zeker het is over het antwoord, en escaleer naar een mens bij lage confidence. Confidence-scores tonen aan de gebruiker is óók een UX-keuze (zie de praktijk *Transparantie over de kwaliteit van de output*).

Implementeer een judge-loop: laat AI-judges output evalueren en verfijnen totdat een kwaliteitsdrempel is bereikt. Dit is duurder per request maar levert bij kritieke use cases meetbaar betere antwoorden op.

Kies het juiste model voor elke agent op basis van empirische evaluaties: HELM (Stanford) evalueert taalmodellen op meerdere scenario's en metrics. Wat voor een ophaal-agent werkt is niet automatisch wat voor een controle-agent werkt — match model aan rol.

Maak de afweging tussen kwaliteitsverbetering, latency en kosten expliciet: meer evaluatie- en controlestappen kunnen het systeem trager en duurder maken. Log per stap zowel kwaliteitswinst als extra latency en tokenverbruik; stop met stappen die meer kosten dan opleveren.
