---
id: provider-agnostische-orkestratie
title: Bouw een provider-agnostische orkestratielaag
summary: >
  Koppel de assistent los van één leverancier door een tussenlaag te bouwen die
  meerdere providers achter dezelfde standaard wegzet (de-facto OpenAI Chat
  Completions + MCP voor tools). Abstractielaag eerst, modelkeuze daarna.
domains: [digitale-soevereiniteit, infrastructuur-data]
phases: [PoC, Pilot, Productie]
levels: [Operationeel, Tactisch]
sources:
  - litellm
  - mcp-protocol
  - surf-ai-hub
  - govchat-nl
  - opengem-chatbot
  - open-webui
  - vlam-ai
---

Zet LiteLLM (of vergelijkbaar) als centrale proxy: providers wisselen dan via configuratie in plaats van via een code-release. Dat verandert "we switchen ooit van leverancier" van een project naar een operationele beslissing.

Abstraheer embeddings op dezelfde manier als LLM-calls: één `/embeddings`-interface voor BGE-M3, multilingual-e5 of Cohere EU. Een embedding-wissel vereist anders een volledige her-indexering — de duurste vorm van lock-in.

Beperk je tot de gemene deler van provider-features: géén proprietary prompt-caching-headers, géén Copilot Studio-flows voor kritieke paden, géén gesloten function-calling-dialecten. Elk specifiek feature wordt een haak waar je bij uittreden aan blijft hangen.

Gebruik MCP-servers voor tools in plaats van provider-specifieke function-calling: het Model Context Protocol (Anthropic, november 2024, sinds december 2025 bij de Linux Foundation, inmiddels ook ondersteund door OpenAI en Google) is de open standaard. Tooldefinities worden zo leverancier-onafhankelijk.

Koppel de orkestratielaag aan Nederlandse referentie-implementaties: SURF AI-hub, GovChat-NL, Gem en Vlam.ai zijn werkende voorbeelden die je kunt overnemen of aanvullen in plaats van vanaf nul te bouwen. Dat versnelt én borgt soevereiniteit, omdat de architectuur in die projecten al expliciet provider-agnostisch is opgezet.

Houd het front-end-laagje ook bewust open: Open WebUI is een veelgebruikte open chatinterface boven soevereine LLM-stacks. Een gesloten chat-UI is een verstopt lock-in-punt; gebruikers, branding en gebruiksstatistieken zitten dan onder vendor-controle.
