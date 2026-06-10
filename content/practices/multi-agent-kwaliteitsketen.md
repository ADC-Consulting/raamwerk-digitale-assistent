---
id: multi-agent-kwaliteitsketen
title: Verbeter kwaliteit in elke stap van de keten (RAG + multi-agent)
summary: >
  Antwoordkwaliteit is het resultaat van keuzes in elke stap van de pijplijn van de assistent. De sleutel ligt hierbij in het gronden van antwoorden in echte data uit de organisatie (RAG) en in het verschuiven van een reactieve chatbot naar een agentische opzet waarin meerdere gespecialiseerde agents samenwerken (multi-agent setup). In een multi-agent setup grijp je gericht op meerdere plekken in — bij de modelkeuze(s), input-controle, bronnen, retrieval, generatie en output-controle — om de kwaliteit van de output te verbeteren. Spiegel die agents aan bestaande organisatie- en governance-rollen, zodat duidelijk blijft wie waarvoor verantwoordelijk is.
domains: [antwoordkwaliteit, governance]
phases: [Pilot, Productie]
levels: [Developer/ Engineer, Compliance officer, Projectmanager]
sources:
  - stackviv-multi-agent
  - helm-stanford
  - nvidia-chunking-strategy
---

Antwoordkwaliteit ontstaat in elke stap van de keten. Combineer daarom het gronden van antwoorden in echte data (RAG) met een multi-agent opzet waarin gespecialiseerde agents samenwerken. Spiegel die agents aan bestaande organisatie- en governance-functies, zodat de verantwoordelijkheid helder blijft en de agents helpen governance af te dwingen en te automatiseren.

<!-- tips -->

Richt een keten van gespecialiseerde agents in en spiegel ze aan bestaande rollen: geef elke agent één duidelijk doel en spiegel de keten aan bestaande organisatie- en governance-functies, zodat duidelijk blijft wie waarvoor verantwoordelijk is en de agents helpen governance af te dwingen of te automatiseren. Koppel waar relevant elke agent aan een bestaande rol (bijvoorbeeld de juridische outputcontrole onder verantwoordelijkheid van de jurist). Een voorbeeldketen voor publieke dienstverlening ziet er als volgt uit.

Intaker: een agent die de vraag classificeert en bepaalt wat voor type vraag het is (informatieverzoek, klacht, aanvraag, out of scope). Vergelijkbaar met een receptie- of triagefunctie aan de balie.

Domeinexpert: een agent die op basis van het type vraag de juiste bronnen ophaalt en relevante context aanlevert. Vergelijkbaar met de inhoudelijk expert die het dossier voorbereidt.

Behandelaar: een agent die op basis van de bronnen redeneert en een conceptantwoord opstelt. Vergelijkbaar met de medewerker die het inhoudelijke antwoord formuleert.

Jurist of compliance officer: een agent die het conceptantwoord toetst op juistheid, beleidsconformiteit en aansluiting op wet- en regelgeving. Vergelijkbaar met de juridische toetsing voordat een brief de deur uit gaat.

Kwaliteitscontroleur: een agent die toon, volledigheid en leesbaarheid checkt. Vergelijkbaar met een eindredacteur of senior collega die meeleest.

Voeg een input-controle-agent toe: filter out-of-scope of schadelijke vragen vóór het generatie-proces door een specifieke input-controle-agent toe te voegen.

Voeg een confidence-agent toe: laat het systeem inschatten hoe zeker het is over het antwoord, en escaleer naar een mens bij lage confidence.

Bouw een judge-loop: laat AI-"judges" output evalueren en verfijnen totdat een kwaliteitsdrempel is bereikt (zie de praktijk over LLM-judges voor schaalbare evaluatie).

Kies het juiste AI-model voor iedere agent: HELM, een initiatief van Stanford, evalueert taalmodellen op meerdere scenario's tegelijk (bijvoorbeeld vraag en antwoord, samenvatten, redeneren) en op meerdere metrics (zoals nauwkeurigheid, robuustheid, bias, eerlijkheid).
