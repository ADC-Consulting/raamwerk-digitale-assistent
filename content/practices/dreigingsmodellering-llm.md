---
id: dreigingsmodellering-llm
title: Breng LLM-specifieke dreigingen in kaart
summary: >
  Traditionele webapplicatie-threat-modelling (STRIDE) dekt onvoldoende de
  nieuwe aanvalsvectoren van LLM-gebaseerde assistenten. Gebruik OWASP LLM Top
  10, OWASP Agentic Top 10 en MITRE ATLAS om scenario's systematisch te
  identificeren en het ontwerp daarop af te stemmen.
domains: [beveiliging, infrastructuur-data, governance]
phases: [PoC, Pilot, Productie]
levels: [Operationeel, Tactisch]
sources:
  - owasp-llm-top10
  - owasp-agentic-top10
  - mitre-atlas
---

Start in de PoC-fase met een licht dreigingsmodel en verdiep het per fase: een te zwaar model bij een experiment remt innovatie; te laat dreigingsmodelleren leidt tot costly rework in productie. Het dreigingsmodel groeit mee met het systeem.

Breng dataflows expliciet in kaart: welke bronnen worden geraadpleegd, welke data verlaat het systeem, welke gebruikers zien wat, welke tools voert de assistent aan. Onzichtbare dataflows zijn een blind spot voor risicoanalyse — als je het niet kunt tekenen, kun je het niet beveiligen.

Adresseer prompt injection als eerste prioriteit: een aanvaller stuurt via zorgvuldig opgestelde input (direct, of indirect via een document, e-mail of webpagina die de assistent inleest) instructies mee die het model laten afwijken van zijn systeemgedrag — bijvoorbeeld om gevoelige data te lekken of ongewenste acties uit te voeren. Volgens OWASP de belangrijkste risicocategorie voor LLM-applicaties.

Modelleer data- en model-poisoning als reële dreiging: de aanvaller vergiftigt trainings-, fine-tune- of RAG-data zodat het model systematisch verkeerde of voor de aanvaller voordelige output geeft — soms via een backdoor die pas bij een specifieke trigger activeert. Relevant voor eigen fine-tune-data én voor de kennisbronnen die een RAG-assistent gebruikt.

Adresseer onbedoeld delen via RAG: een RAG-assistent toont gebruikers feitelijk passages uit de gekoppelde kennisbron. Staat daar data in die niet iedere gebruiker mag zien (personeelsdossiers, interne memo's, klantgegevens uit andere afdelingen), dan kan de assistent die ongemerkt prijsgeven. Scan de RAG-corpus vooraf op gevoelige data en zorg dat autorisatiegrenzen van bronsystemen ook bij het ophalen worden gerespecteerd (permission-aware retrieval).

Gebruik de OWASP Top 10 for LLM Applications als checklist voor scenario's (prompt injection direct/indirect/multimodaal, data-exfiltratie, poisoning, excessive agency). Voor agentische assistenten: combineer met OWASP Top 10 for Agentic Applications voor risico's rond tool-chaining, memory manipulation en agent-to-agent-trust.

Gebruik MITRE ATLAS voor adversariële tactieken: de kennisbank van tactieken, technieken en case-studies specifiek voor AI-systemen geeft je een gestandaardiseerde taal voor red-teaming en samenwerking met andere overheden — geen losse interne taxonomie hoeven uitvinden.
