---
id: indicatoren-per-stakeholder
title: Gebruik een mix van indicatoren voor diverse stakeholders
summary: >
  Engineers, domeinexperts en managers kijken naar verschillende signalen in het beoordelen van de kwaliteit van een assistent. Het grootste verschil tussen klassieke Machine Learning (ML) en 
  GenAI zit in de soft metrics die outputkwaliteit meten. Deze soft metrics zijn voor GenAI  belangrijker dan voor klassieke AI modellen. 
domains: [evaluatie-assistent]
good_practise: [evaluatie-per-assistent-type]
phases: [Pilot, Productie, PoC]
levels: [Bestuur/ beleidsmaker, Projectmanager, Developer/ Engineer, Compliance officer]
sources: []
---

Definieer per metric een operationele meetwijze: bv. "hallucinatie = % antwoorden waarvoor de LLM-judge geen ondersteuning vindt in de bron"

Zorg dat elke laag eigenaar is van eigen metrics: managers hoeven niet elke technische metric te kennen, maar wel hun eigen business-metrics te kunnen interpreteren. 

| Laag | Type indicator | Voorbeelden (concreet meetbaar) |
|---|---|---|
| Managers | Business metrics | NPS, conversies, voorkomen escalaties, bespaarde uren, gereduceerde kosten, ROI, adoptie, Bounce Rate |
| Domeinexperts | Soft LLM metrics | Hallucinatie (% responses of factuality score), bias (toxicity rate, stereotype, policy violation), refusal-rate (over/under-refusal), brongetrouwheid, relevantie, volledigheid, zekerheid, consistentie, toon, beleidsconformiteit, Goal Completion Rate, Fallback Rate, Escalation Rate |
| Engineers | Technical metrics | Latency (time-to-first-token, ms), speed (tok/sec), error rates (% responses), infra metrics (GPU, cost/request, queue length), uptime |
