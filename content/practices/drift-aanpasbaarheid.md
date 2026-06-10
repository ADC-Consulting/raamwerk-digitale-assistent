---
id: drift-aanpasbaarheid
title: Aanpasbaarheid – adaptief leren bij dataverandering
summary: >
  Wanneer wetgeving of beleid wijzigt, moet de Digitale Assistent deze veranderingen snel en gecontroleerd kunnen verwerken. Door systematisch te signaleren wanneer antwoorden verouderen en aanpassingen aantoonbaar en herleidbaar door te voeren, wordt voldaan aan de eisen rond AVG-compliance en de aankomende AI-verordening.  
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

Richt een RAG‑laag in: Sla wet- en beleidsdocumenten met versienummer op en bouw een RAG‑pipeline die nieuwe of gewijzigde documenten automatisch ophaalt, opsplitst in passages, embed en in een vector store plaatst met velden als bron, versie en geldigheidsperiode. [verwijs naar GP RAG] 

Detecteer wijzigingen en inhouds‑drift automatisch: Drift‑detectie betekent dat je systematisch bijhoudt of het gedrag van de assistent merkbaar verandert of afwijkt van de verwachting, bijvoorbeeld doordat er ineens veel negatieve feedback, correcties door medewerkers, herhaalde vragen of “ik weet het niet”-antwoorden ontstaan rond een bepaald onderwerp. Implementeer drit-detectie (bijv. met Evidently AI of Alibi Detect) verouderde of onjuiste antwoorden vroegtijdig te herkennen, en gebruik periodieke jobs (bijv. met Prefect of Airflow) en bron‑API’s om nieuwe of aangepaste publicaties te signaleren  

Stuur wijzigingen naar een human‑in‑the‑loop workflow: Laat wijzigings‑ en drift‑signalen automatisch change‑items aanmaken in een review‑queue (bijv. een eigen review‑dashboard of Label Studio), waar juridisch/beleidsmedewerkers per case de nieuwe interpretatie beoordelen, aanscherpen en goedkeuren voordat deze in de Digitale Assistent wordt geactiveerd. 

Rol wijzigingen gecontroleerd uit met versiebeheer en audittrail: Beheer content, prompts en RAG‑instellingen als eenvoudige configuratie met versienummers, rol wijzigingen stap voor stap uit via een vast releaseproces, en leg in één centraal overzicht vast welke wijziging is gedaan, wie deze heeft goedgekeurd en vanaf wanneer deze actief is. 
