---
id: select-then-route
title: Select-Then-Route (StR) – slimme routering naar de snelste passende antwoordstrategie
summary: >
  Select-Then-Route verhoogt de efficiëntie door vragen via het snelste passende
  verwerkingspad af te handelen. Eenvoudige vragen gaan naar lichte routes,
  complexe vragen naar zwaardere LLM-inference, waardoor infrastructuurkosten
  beheersbaar blijven.
domains: [technische-prestaties]
phases: [Pilot, Productie]
levels: [Developer/ Engineer, Projectmanager]
sources:
  - model-routing-brenndoerfer
  - aws-multi-llm-routing
  - merge-llm-routing
  - langchain
  - semantic-kernel
  - google-sre-slo
  - prometheus
  - grafana
  - sloth-slo
---

Select-Then-Route is een AI-raamwerk dat de efficiëntie verhoogt door vragen via het snelste passende verwerkingspad af te handelen. De digitale assistent classificeert binnenkomende vragen en stuurt eenvoudige, veelvoorkomende of laag-risicovragen naar lichte, snelle routes, terwijl complexe of minder eenduidige vragen worden doorgestuurd naar zwaardere LLM-inference. Dit sluit goed aan bij overheidsdiensten, waar een groot deel van de interacties vaste patronen volgt: routinevragen worden razendsnel beantwoord, terwijl de infrastructuurkosten onder controle blijven.

<!-- tips -->

Bepaal je routes en criteria: Definieer welke paden je wilt (bijv. FAQ/search, klein model, groot LLM, mens) en op basis van welke kenmerken je routeert (vraagtype, risico, latency-eis, kosten).

Bouw een centrale router service: Maak een kleine service (bijv. in Python/TypeScript) die alle verzoeken ontvangt, de vraag classificeert (d.m.v. regels of lichte LLM-call) en vervolgens de juiste route kiest. Gebruik hiervoor bij voorkeur een orkestratie-framework zoals LangChain of Semantic Kernel om de verschillende routes, prompts en tools gestructureerd te beheren.

Configureer model- en service-endpoints: Leg per route in configuratie (YAML/JSON/env vars) vast welk endpoint, model, time-out, tokenlimiet en beleid worden gebruikt, zodat je later makkelijk kunt wisselen of uitbreiden.

Koppel logging, metrics en SLO's: Stuur vanuit de router alle logs en metrics (route, model, latency, fouten) naar je observability-platform, bijvoorbeeld Prometheus als metrics-bron met Grafana voor dashboards en alerting. Leg je SLO's declaratief vast met een tool als Sloth, zodat je routingstrategie meetbaar en bijstuurbaar is.
