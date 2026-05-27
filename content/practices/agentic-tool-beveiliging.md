---
id: agentic-tool-beveiliging
title: Tool- en integratie-beveiliging voor agentische assistenten
summary: >
  Zodra een assistent via tools of API's acties kan uitvoeren, ontstaat het
  risico van excessive agency — acties buiten de bedoelde scope, vaak
  aangestuurd door verborgen instructies. Sandboxing, allowlists,
  policy-engines en menselijke tussenkomst zijn essentieel.
domains: [beveiliging, infrastructuur-data, functionaliteit]
phases: [Pilot, Productie]
levels: [Operationeel, Tactisch]
sources:
  - owasp-agentic-top10
  - owasp-excessive-agency
  - owasp-agentic-initiative
  - mitre-atlas
  - aws-rag-permissions
  - promptfoo
---

Werk met allowlists in plaats van blocklists voor beschikbare tools en endpoints: een blocklist vergeet altijd iets; een allowlist faalt gesloten. Een nieuwe endpoint die per ongeluk niet op de blocklist staat, is direct bereikbaar; een nieuwe endpoint die niet expliciet is toegevoegd aan de allowlist, blijft buiten bereik.

Sandbox tool-executie in geïsoleerde omgevingen: isoleer uitvoering van code, externe calls of bestandstoegang zodat mislukte of aangevallen tools de rest van het systeem niet raken. Containers met minimale privileges, time-outs en resource-limits zijn de basis. Voor outbound API-calls: route alles via een gateway met endpoint-allowlist.

Beperk tool-scopes tot het minimaal benodigde: lees-only waar mogelijk, specifieke endpoints in plaats van hele API's, tijdgebonden tokens. Brede scopes maken excessive agency vele malen schadelijker — een agent die per ongeluk verkeerd handelt met read-write-toegang doet meer schade dan eentje met alleen lees-rechten.

Vereis expliciete menselijke bevestiging voor onomkeerbare acties: betalingen, mutaties in registraties, outbound communicatie namens een organisatie. Het verschil tussen "agent geeft fout antwoord" en "agent verstuurt verkeerd bericht aan duizenden burgers" is een menselijke ja/nee. Maak die ja/nee niet wegklikbaar in een batch — het moet werkelijke aandacht eisen.

Pas permission-aware retrieval toe bij RAG: zoekresultaten moeten autorisatiegrenzen van bronsystemen volgen. AWS heeft hierover concrete patronen gedocumenteerd in "Authorizing access to data with RAG implementations" — bruikbaar als referentie ongeacht of je AWS gebruikt.

Red-team agentische assistenten gericht op tool-misbruik: tools zoals Promptfoo bieden specifieke tests voor RBAC, BOLA (Broken Object Level Authorization), SSRF en tool-discovery. Geautomatiseerde tests in CI/CD vangen regressies op bij elke wijziging in tools of prompts.

Modelleer agent-to-agent-trust expliciet: in multi-agent-systemen kan een gecompromitteerde of misleide agent andere agents misleiden. De OWASP Agentic Top 10 (2026) en het Agentic Security Initiative behandelen dit; MITRE ATLAS biedt adversariële tactieken voor AI-agents inclusief prompt injection en memory manipulation.

Documenteer een rollback-plan per actie-type: voor elke actie die de assistent kan uitvoeren, bedenk vooraf hoe je hem terug kunt draaien. "We hebben net duizend e-mails verstuurd, hoe nu" is geen incidentprocedure — een rollback-plan wel.
