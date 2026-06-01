---
id: infrastructuur-keuze
title: Monitoring, evaluatie en LLMOps - meten is weten, ook voor AI
summary: >
  LLMOps werkt wezenlijk anders dan traditioneel applicatiebeheer. Naast latency
  en beschikbaarheid moeten ook antwoordkwaliteit, hallucinaties, tokengebruik en
  kosten worden bewaakt.
domains: [infrastructuur-data]
phases: [Productie]
levels: [Developer/ Engineer]
sources:
  - visie-digitale-autonomie
  - vlam-ai
  - haven
  - gpt-nl
  - standaard-platform
---

Kies open-source modellen conform 'Open, tenzij…' beleid: geef de voorkeur aan open-weight modellen waar dat kan. Meerdere Nederlandse bouwteams doen dit al: het overheid.nl-team werkt met Mistral en WetWijzer Bedrijven is volledig open-source gerealiseerd.

Borg digitale autonomie door technische keuzes én governance: denk na over classificaties (vertrouwelijk → soeverein/on-premise via VLAM.AI; gevoelig → Europese soevereine cloud; openbaar → publieke cloud met EU-databoundary).

Neem exit-strategieën op als eis bij iedere infrastructuurkeuze. Digitale soevereiniteit draait om meer dan waar data staat — het gaat om zeggenschap en reële exit-mogelijkheden. Dit geldt vooral bij niet open-source componenten.

Evalueer VLAM.AI: SSC-ICT biedt vlam-chat, vlam-search en API-toegang. De architectuur is zodanig ontworpen dat opschaling naar publieke cloud snel mogelijk is.

Overweeg Haven/Haven+ voor gemeenten: deze Kubernetes-standaard van VNG/Common Ground biedt observability, security en networking, is BIO- en NIS2-compliant, en maakt applicaties onafhankelijk van één IT-infrastructuur.

Hanteer een bewuste inkoopstrategie voor rekenkracht: sluit aan bij overheidsbrede inkoopkanalen zoals MaaS/1 STIP voor strategische inkoop van GPU-capaciteit.
