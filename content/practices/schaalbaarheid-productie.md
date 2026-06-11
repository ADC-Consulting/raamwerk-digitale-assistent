---
id: schaalbaarheid-productie
title: Schaalbaarheid – van pilot naar productie
summary: >
  De stap van pilot naar productie lukt alleen met een doordachte aanpak voor
  schaalbaarheid. Auto-scaling, caching en burst-capaciteit bepalen of de dienst
  kan meegroeien met het gebruik.
domains: [technische-prestaties, infrastructuur-data]
phases: [Productie, Pilot]
levels: [Developer/ Engineer]
sources:
  - innovatiebudget-2025
  - haven
  - mcp-protocol
  - a2a-protocol
  - keda
  - kserve
  - litellm
---

Gebruik AI-gateways voor rate limiting: tools als LiteLLM of Bifrost bieden multi-provider rate limiting en failover, en sluiten direct aan op de exit-strategie uit de Visie Digitale Autonomie en Soevereiniteit.

Gebruik een LLM-gateway: Dezelfde tools als LiteLLM of Bifrost bieden een uniforme interface voor meerdere LLM-providers, load balancing en failover. Dit ondersteunt direct de exit-strategie uit de Visie Digitale Autonomie en Soevereiniteit.

Streef naar herbruikbare bouwblokken: het overheid.nl-team beoogt een herbruikbaar bouwblok (open-source API + widget) voor andere overheden, met aansluiting op MCP en een marktplaats-concept. Borg deze keuzes binnen NORA, GEMMA en Common Ground zodat ze breder herbruikbaar zijn.

Automatiseer data-ingestie: de handmatige curatie van brondocumenten is voor productie niet houdbaar. Vervang dit door geautomatiseerde, asynchrone data-ingestie pipelines (bijv. continue API-koppeling met EUR-Lex of relevante databases).

Adopteer open standaarden voor agent-communicatie: baseer de architectuur op protocollen zoals Agent 2 Agent Protocol (A2A) en Model Context Protocol (MCP), zodat assistenten toekomstbestendig zijn en als geïntegreerd ecosysteem kunnen communiceren.
