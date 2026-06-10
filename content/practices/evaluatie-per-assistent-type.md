---
id: evaluatie-per-assistent-type
title: Kies evaluatiecriteria passend bij het type assistent
summary: >
  De definitie van een digitale assistent kent vier kenmerken-assen (initiatie, taakuitvoering, informatietoegang, executie-autonomie). Hoe meer naar rechts op deze assen (proactief, agentisch, dynamisch, autonoom), 
  hoe zwaarder de nadruk op compliance, consistentie, bias en technische robuustheid. Meer autonomie en complexiteit brengen meer risico en daarmee meer behoefte aan governance-gerichte indicatoren.
domains: [evaluatie-assistent]
phases: [PoC, Pilot, Productie]
levels: [Projectmanager, Bestuur/ beleidsmaker, Developer/ Engineer, Compliance officer]
image: docs_for_GP/evaluatiecriteria.png
image_top: true
sources:
  - langwatch
---

Belangrijke nuance bij agentische workflows: een enkelvoudige assistent (één vraag, één antwoord, waarbij de assistent elke vraag als nieuw behandelt) is fundamenteel anders te evalueren dan een agentische assistent (doorlopend gesprek waarbij de assistent de context onthoudt). Bij agentische assistenten moet je niet alleen de output evalueren, maar ook tussenstappen, tool-calls, geheugenstate en de coherentie over meerdere in-en output combinaties. 

<!-- tips -->

Map elke nieuwe assistent op de vier assen: voordat je metrics kiest, bepaal je waar je staat; een statische FAQ-bot vraagt om andere indicatoren dan een dynamische actie-uitvoerende agent. 

Voor agentische systemen evalueer per agent én end-to-end: gebruik simulaties (bv. LangWatch) om scenario's te testen vóór productie. 

Bij hogere autonomie voeg expliciete guardrail-metrics toe: meet hoe vaak guardrails triggeren en of de agent binnen zijn mandaat blijft. 

oorbeeld: evaluatieframework voor een consulenten-assistent: De assistent die gebruikt wordt in onderstaand voorbeeld verwerkt batches van gesprekstranscripten van consultenten met burgers. De teammanager van de consulent beoordeelt de prestaties van medewerkers op basis van een criterialijst.  

| | PoC | Pilot | Productie |
|---|---|---|---|
| **Managers** | Bruikbaarheidsfeedback; impact op teamproductiviteit | Reductie handmatige QA-backlog bij bètagebruikers; adoptiegraad teamleads | Prestatieverbetering servicemedewerkers; aantal teamleads dat de app heeft geadopteerd |
| **Domeinexperts** | Criteria-curatie; accuracy vs. menselijke evaluatie | Consistentiescore (% gelijke antwoorden bij vergelijkbare cases); continu finetunen van criteria | Score-drift; tevredenheid teamleads; continue evaluatie-dataset-curatie |
| **Engineers** | Latency; error rate; label accuracy | Batch-doorvoer; usability/UX-feedback; tokenverbruik | Beschikbaarheid (SLA); kosten per evaluatie; A/B-testen prompts en modellen |
