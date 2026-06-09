---
id: provider-agnostische-orkestratie
title: Voorkom vendor lock-in - Bouw een provider-agnostische orkestratielaag
summary: >
  Koppel de assistent los van één leverancier door een tussenlaag te bouwen die
  meerdere providers achter dezelfde standaard wegzet (de-facto OpenAI Chat
  Completions + MCP voor tools). Abstractielaag eerst, modelkeuze daarna.
domains: [infrastructuur-data]
phases: [Pilot, Productie]
levels: [Projectmanager]
sources:
  - algoritmekader-bias
  - algoritmekader-biastoets
  - algoritmekader-monitoring
  - bias-detection-tool
  - fairlearn
  - aequitas
  - ai-fairness-360
---

Zet LiteLLM (of vergelijkbaar) als centrale proxy: providers wisselen dan via configuratie in plaats van via een code-release. Dat verandert "we switchen ooit van leverancier" van een project naar een operationele beslissing.

Abstraheer embeddings op dezelfde manier als LLM-calls: één `/embeddings`-interface voor BGE-M3, multilingual-e5 of Cohere EU. Een embedding-wissel vereist anders een volledige her-indexering: de duurste vorm van lock-in.

Beperk je tot de gemene deler van provider-features: geen proprietary prompt-caching-headers, geen Copilot Studio-flows voor kritieke paden, geen gesloten function-calling-dialecten. Elk specifiek feature wordt een haak waar je bij uittreden aan blijft hangen.

Gebruik MCP-servers voor tools in plaats van provider-specifieke function-calling: het Model Context Protocol (Anthropic, november 2024, sinds december 2025 bij de Linux Foundation, inmiddels ook ondersteund door OpenAI en Google) is de open standaard. Tooldefinities worden zo leverancier-onafhankelijk.

Koppel de orkestratielaag aan Nederlandse referentie-implementaties: SURF AI-hub, GovChat-NL, Gem en Vlam.ai zijn werkende voorbeelden die je kunt overnemen of aanvullen in plaats van vanaf nul te bouwen. Dat versnelt en borgt soevereiniteit, omdat de architectuur in die projecten al expliciet provider-agnostisch is opgezet.

Houd het front-end-laagje ook bewust open: Open WebUI is een veelgebruikte open chatinterface boven soevereine LLM-stacks. Een gesloten chat-UI is een verstopt lock-in-punt; gebruikers, branding en gebruiksstatistieken zitten dan onder vendor-controle.
