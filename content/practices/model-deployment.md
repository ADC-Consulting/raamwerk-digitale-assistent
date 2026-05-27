---
id: model-deployment
title: Model hosting en deployment - open, versioneerbaar en routeerbaar
summary: >
  Taalmodellen draaien in productie vergt concrete keuzes over inference-engines,
  modelversies en routering. Open standaarden en versionering zijn essentieel voor
  reproduceerbaarheid, auditeerbaarheid en exit-mogelijkheden.
domains: [infrastructuur-data, digitale-soevereiniteit]
phases: [Pilot, Productie]
levels: [Operationeel]
sources:
  - vllm
  - ollama
  - mlflow
  - litellm
  - artificial-analysis
  - gpt-nl
---

Implementeer modelroutering: stuur eenvoudige vragen naar een klein model en complexe analyses naar een groot model. Select-then-Route bereikt 40–70% kostenverlaging zonder noemenswaardig kwaliteitsverlies.

Implementeer modelversiebeheer voor reproduceerbaarheid en auditability: MLflow combineert experiment-tracking (hyperparameters, datasets en metrics per run) met een model-registry (versies, staging/production, rollback). Versiebeheer ondersteunt ook de auditeisen vanuit de EU AI Act.

Gebruik een LLM-gateway: tools als LiteLLM of Bifrost bieden een uniforme interface voor meerdere LLM-providers, load balancing en failover. Dit ondersteunt direct de exit-strategie uit de Visie Digitale Autonomie en Soevereiniteit.
