---
id: drift-aanpasbaarheid
title: Aanpasbaarheid – adaptief leren bij dataverandering
summary: >
  Wanneer wetgeving of beleid wijzigt, moet de Digitale Assistent deze veranderingen snel en gecontroleerd kunnen verwerken. Dit door je om op een juiste manier je RAG te bouwen. 
domains: [antwoordkwaliteit, infrastructuur-data]
phases: [Productie]
levels: [Projectmanager, Developer/ Engineer]
sources:
  - evidently-ai
  - alibi-detect
  - prefect
  - apache-airflow
  - label-studio
---

Detecteer wijzigingen en inhouds‑drift automatisch: Drift‑detectie betekent dat je systematisch bijhoudt of het gedrag van de assistent merkbaar verandert of afwijkt van de verwachting, bijvoorbeeld doordat er ineens veel negatieve feedback, correcties door medewerkers, herhaalde vragen of “ik weet het niet”-antwoorden ontstaan rond een bepaald onderwerp. Implementeer drit-detectie (bijv. met Evidently AI of Alibi Detect) verouderde of onjuiste antwoorden vroegtijdig te herkennen, en gebruik periodieke jobs (bijv. met Prefect of Airflow) en bron‑API’s om nieuwe of aangepaste publicaties te signaleren.

Richt een RAG‑laag in: Sla wet- en beleidsdocumenten met versienummer op en bouw een RAG‑pipeline die nieuwe of gewijzigde documenten automatisch en tijdijg ophaalt, opsplitst in passages, embed en in een vector store plaatst met velden als bron, versie en geldigheidsperiode.
