---
id: drift-aanpasbaarheid
title: Aanpasbaarheid — adaptief leren bij dataverandering
summary: >
  Wetgeving en beleid wijzigen continu. De assistent moet die wijzigingen snel
  en gecontroleerd kunnen verwerken via versie-gestuurde RAG, geautomatiseerde
  drift-detectie en een menselijke review-workflow voor veranderingen voordat
  ze live gaan.
domains: [antwoordkwaliteit, infrastructuur-data, compliance]
phases: [Productie]
levels: [Operationeel, Tactisch]
sources:
  - evidently-ai
  - alibi-detect
  - prefect
  - apache-airflow
  - label-studio
---

Richt een versie-gestuurde RAG-laag in: sla wet- en beleidsdocumenten op met versienummer en bouw een pipeline die nieuwe of gewijzigde documenten automatisch ophaalt, opsplitst in passages, embeds en in een vector store plaatst met velden als bron, versie en geldigheidsperiode. Zonder versie-info kun je niet uitleggen waarom de assistent vandaag iets anders antwoordt dan gisteren.

Detecteer inhoudsdrift automatisch: drift-detectie betekent systematisch bijhouden of het gedrag van de assistent merkbaar verandert of afwijkt — veel negatieve feedback, herhaalde correcties door medewerkers, herhaalde "ik weet het niet"-antwoorden rond een onderwerp. Tools zoals Evidently AI en Alibi Detect signaleren dat soort patronen.

Gebruik periodieke jobs om bron-veranderingen te signaleren: workflow-tooling (Prefect, Apache Airflow) kan met vaste regelmaat bron-API's pollen op nieuwe of aangepaste publicaties. Zonder geautomatiseerde signalering ontdek je beleidswijzigingen pas via een klacht — wat te laat is.

Stuur wijzigingen naar een human-in-the-loop-workflow: laat wijzigings- en drift-signalen automatisch change-items aanmaken in een review-queue (een eigen review-dashboard of Label Studio), waar juridisch- of beleidsmedewerkers per case de nieuwe interpretatie beoordelen, aanscherpen en goedkeuren voordat deze in productie wordt geactiveerd.

Rol wijzigingen gecontroleerd uit met versiebeheer en audit-trail: beheer content, prompts en RAG-instellingen als configuratie met versienummers; rol wijzigingen stap voor stap uit via een vast releaseproces; leg in één centraal overzicht vast welke wijziging is gedaan, wie heeft goedgekeurd, en vanaf wanneer ze actief is.

Markeer geldigheidsperiodes expliciet in de bron-metadata: een wet die per 1 januari is gewijzigd mag niet vanaf 31 december door de assistent worden geciteerd als geldend, en oude versies moeten opvraagbaar zijn voor casussen die in het verleden zijn ontstaan. Geldigheids-velden in metadata maken dit afdwingbaar.

Combineer drift-detectie met de evaluatie-set: een drift-signaal moet niet alleen alarmeren maar ook gekoppeld worden aan een evaluatie-run op de golden dataset. Zo zie je niet alleen "iets verandert" maar ook "in welke mate de antwoordkwaliteit verschuift".

Borg dit alles in compliance-rapportage: AVG en de aankomende AI-verordening vragen om aantoonbare beheersing van wijzigingen. Een audit-trail van drift-detectie tot menselijke goedkeuring is precies wat een toezichthouder nodig heeft — bouw de logging daarop in plaats van post hoc te reconstrueren.
