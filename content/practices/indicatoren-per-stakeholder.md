---
id: indicatoren-per-stakeholder
title: Gebruik een mix van indicatoren voor diverse stakeholders
summary: >
  Engineers, domeinexperts en managers kijken naar verschillende signalen.
  Het grootste verschil tussen klassieke ML en GenAI zit in de soft metrics
  die outputkwaliteit meten — die zijn voor GenAI veel belangrijker dan voor
  klassieke modellen. Maak per laag eigenaarschap expliciet.
domains: [antwoordkwaliteit, governance, technische-prestaties]
phases: [Pilot, Productie]
levels: [Tactisch]
sources: []
---

Managers werken met business-metrics: NPS, conversies, voorkomen escalaties, bespaarde uren, gereduceerde kosten, ROI, adoptie, bounce rate. Dit zijn de signalen waarop bestuurlijke besluiten over uitbreiding of opschaling rusten — abstractieniveau hoog, kwantitatief.

Domeinexperts werken met soft LLM-metrics: hallucinatie (% responses zonder bronondersteuning), bias (toxicity rate, stereotype, policy violation), refusal-rate (over/under-refusal), brongetrouwheid, relevantie, volledigheid, zekerheid, consistentie, toon, beleidsconformiteit, Goal Completion Rate, Fallback Rate, Escalation Rate. Dit is het zwaartepunt voor GenAI — anders dan bij klassieke ML.

Engineers werken met technical metrics: latency (time-to-first-token in ms), speed (tok/sec), error rates (% responses), infra metrics (GPU-gebruik, kosten per request, queue length), uptime. Dit zijn de operationele signalen die je dagelijks moet kunnen lezen om regressies vroeg te zien.

Definieer per metric een operationele meetwijze: "hallucinatie = % antwoorden waarvoor de LLM-judge geen ondersteuning vindt in de bron" is meetbaar; "hallucinatie als probleem" is niet meetbaar. Vage metrics zijn onbruikbaar — wees expliciet over wat geteld wordt.

Zorg dat elke laag eigenaar is van eigen metrics: managers hoeven niet elke technical metric te kennen maar moeten wel hun eigen business-metrics kunnen interpreteren en sturen. Hetzelfde voor domeinexperts en engineers — eigenaarschap zonder begrip leidt tot afgekleurde rapportages.

Bouw dashboards per stakeholder, niet één voor iedereen: een dashboard dat alle metrics laat zien spreekt niemand aan. Drie eenvoudige dashboards (één per laag) zijn beter dan één compleet dashboard.

Sluit business-metrics, soft metrics en technical metrics expliciet op elkaar aan: als de latency stijgt (engineer-signaal), wat doet dat met de drop-off (manager-signaal)? Maak die koppeling expliciet via gedeelde indicatoren — zo zien stakeholders elkaars realiteit.

Documenteer welke metric stuurbaar is en welke alleen observeerbaar: bij sommige metrics weet je dat je kunt ingrijpen (prompt aanpassen, model wisselen); bij andere kun je alleen registreren. Onderscheid die helder zodat je geen tijd verspilt aan onveranderlijke nummers.
