---
id: dreigingsmodellering-llm
title: Breng LLM-specifieke dreigingen in kaart
summary: >
  Traditionele webapplicatie-threat-modelling (STRIDE) dekt de aanvalsvectoren van
  LLM-assistenten onvoldoende. Breng dreigingen systematisch in kaart met OWASP LLM
  Top 10, OWASP Agentic Top 10 en MITRE ATLAS, en stem het ontwerp daarop af. Prompt
  injection is volgens OWASP de belangrijkste risicocategorie; mitigatie vereist een
  combinatie van techniek (guardrails, strikte scheiding van instructies en data),
  architectuur (validatie van RAG-passages, beperkte autoriteit) en beleid
  (human-in-the-loop voor gevoelige acties).
domains: [beveiliging]
good_practise: [data-logbescherming, iam-assistenten, security-monitoring-incident]
phases: [Pilot, Productie, PoC]
levels: [Projectmanager, Developer/ Engineer]
sources:
  - owasp-llm-top10
  - owasp-agentic-top10
  - owasp-prompt-injection
  - mitre-atlas
  - nvidia-nemo-guardrails
  - guardrails-ai
  - llama-guard
  - hackerone-prompt-injection
  - aivd-ai-secure
  - aivd-rdi-genai
  - ncsc-uk-secure-ai
  - nist-sp-800-218a
  - nsa-securing-ai
---

Gebruik de OWASP-checklists om scenario's systematisch af te lopen: de OWASP Top 10 for LLM Applications dekt prompt injection (direct, indirect en multimodaal), data-exfiltratie, poisoning en excessive agency. Voor agentische assistenten combineer je die met de OWASP Top 10 for Agentic Applications, voor risico's rond tool-chaining, memory manipulation en agent-to-agent-trust.

Breng dataflows expliciet in kaart: welke bronnen worden geraadpleegd, welke data verlaat het systeem, welke gebruikers zien wat en welke tools roept de assistent aan. Onzichtbare dataflows zijn een blind spot voor risicoanalys.

Gebruik MITRE ATLAS voor adversariële tactieken: deze kennisbank van tactieken, technieken en case-studies specifiek voor AI-systemen geeft je een gestandaardiseerde taal voor red-teaming en samenwerking met andere overheden. 

Modelleer data- en model-poisoning als reële dreiging: een aanvaller vergiftigt trainings-, fine-tune- of RAG-data zodat het model systematisch verkeerde of voor de aanvaller voordelige output geeft. Soms gebeurt dat via een backdoor die pas bij een specifieke trigger activeert. Dit is relevant voor eigen fine-tune-data en voor de kennisbronnen die een RAG-assistent gebruikt.

Adresseer onbedoeld delen via RAG: een RAG-assistent toont gebruikers feitelijk passages uit de gekoppelde kennisbron, dus data die niet iedereen mag zien (personeelsdossiers, interne memo's, klantgegevens) kan ongemerkt worden prijsgegeven. Scan de RAG-corpus vooraf op gevoelige data en respecteer de autorisatiegrenzen van bronsystemen bij het ophalen (permission-aware retrieval; zie de praktijk over IAM en tool-beveiliging voor assistenten).

Valideer opgehaalde RAG-passages op relevantie, herkomst en afwezigheid van verborgen instructies: kwaadwillende content in kennisbronnen is een reële aanvalsvector. Een document met "ignore previous instructions and…" kan via RAG het systeemgedrag overnemen. Controleer chunks op verdachte patronen voordat ze de LLM-context bereiken.


Behandel prompt injection als topprioriteit en scheid instructies en data strikt: markeer gebruikersinput en opgehaalde documenten expliciet als onbetrouwbare bronnen, want volgens OWASP is dit de belangrijkste risicocategorie voor LLM-applicaties. 

Stop geen secrets, API-sleutels of rolstructuren in system prompts: wat in de prompt staat, is niet beschermd. 

Pas input- en output-guardrails toe: tools als NVIDIA NeMo Guardrails, Guardrails AI en LlamaGuard 3 filteren bekende injectiepatronen aan de invoerzijde en controleren de output op lekken of ongewenste content. Een guardrail is meestal niet genoeg. Combineer een classifier (LlamaGuard) met programmeerbare regels (NeMo Guardrails) en output-validatoren (Guardrails AI).

Vereis menselijke bevestiging voor gevoelige acties: dit doorbreekt aanvalsketens die alleen via prompt-manipulatie werken. Een aanvaller die de assistent iets verkeerds laat zeggen, kan hem niet automatisch een actie laten uitvoeren als die expliciete bevestiging vereist. 

Implementeer rate-limiting op verdachte patronen: een aanvaller die experimenteert met prompt injection genereert een herkenbaar patroon.
