---
id: prompt-injection-hardening
title: Prompt-injection- en RAG-hardening (guardrails)
summary: >
  Prompt injection is volgens OWASP de belangrijkste risicocategorie voor
  LLM-applicaties. Mitigatie vereist een combinatie van technische laag
  (guardrails), architectuur (validatie van RAG-passages, beperkte autoriteit)
  en beleid (human-in-the-loop voor gevoelige acties).
domains: [beveiliging, antwoordkwaliteit]
phases: [Pilot, Productie]
levels: [Operationeel]
sources:
  - owasp-prompt-injection
  - nvidia-nemo-guardrails
  - guardrails-ai
  - llama-guard
  - hackerone-prompt-injection
---

Scheid instructies en data strikt: markeer gebruikersinput en opgehaalde documenten expliciet als onbetrouwbare bronnen. Anders kan iedere ingelezen tekst de system prompt overrulen — een aanvaller in een PDF, e-mail of webpagina krijgt dan de assistent in zijn macht.

Stop geen secrets, API-sleutels of rolstructuren in system prompts: wat in de prompt staat is niet beschermd. OWASP is uitgesproken — system prompts zijn geen security control. Omdat LLM's stochastisch zijn kunnen ze geen auditbare beveiligingsgrens vormen; beveiliging moet deterministisch buiten het model worden afgedwongen.

Pas input- én output-guardrails toe: tools als NVIDIA NeMo Guardrails, Guardrails AI en LlamaGuard 3 filteren op bekende injectiepatronen aan de invoerzijde en controleren de output op lekken of ongewenste content. Eén guardrail is meestal niet genoeg — combineer een classifier (LlamaGuard) met programmeerbare regels (NeMo Guardrails) en output-validatoren (Guardrails AI).

Valideer opgehaalde RAG-passages op relevantie, herkomst en afwezigheid van verborgen instructies: kwaadwillende content in kennisbronnen is een reële aanvalsvector. Een document met "ignore previous instructions and..." kan via RAG het systeemgedrag overnemen — controleer chunks op verdachte patronen vóórdat ze de LLM-context bereiken.

Voeg voor gevoelige acties altijd een bevestigingsstap toe (human-in-the-loop): dit doorbreekt aanvalsketens die alleen via prompt-manipulatie werken. Een aanvaller die de assistent kan overtuigen om iets verkeerds te zeggen, kan hem niet automatisch een actie laten uitvoeren als die actie expliciete menselijke bevestiging vereist.

Test continu met red-teaming: nieuwe prompt-injection-technieken ontstaan voortdurend. De HackerOne-casus over data-exfiltratie via prompt injection laat zien dat één kwetsbaarheid voldoende is voor een datalek — periodiek red-teamen (met tools als Promptfoo, Microsoft PyRIT of Garak) is geen optie maar noodzaak.

Implementeer rate-limiting op verdachte patronen: een aanvaller die experimenteert met prompt injection genereert een herkenbaar verkeerspatroon. Detectie en blokkade op gedragsniveau vangt aanvallen op die door content-filters heen komen.
