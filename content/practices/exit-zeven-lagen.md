---
id: exit-zeven-lagen
title: Ontwerp exit op zeven lagen
summary: >
  Vendor lock-in zit zelden bij het LLM zelf — dat is doorgaans het makkelijkst
  te vervangen. De zeven lagen hieronder geven een volledig beeld van waar
  lock-in en exit-beperkingen daadwerkelijk ontstaan, en sluiten aan op
  SWIPO, EU Data Act en EU Cloud Code of Conduct.
domains: [digitale-soevereiniteit, governance, compliance]
phases: [Pilot, Productie]
levels: [Tactisch, Bestuurlijk]
sources:
  - eu-data-act
  - swipo
  - eu-cloud-coc
  - qdrant
  - weaviate
  - langfuse
---

Laag 1 — Model: implementeer contract-tests per provider-adapter. Een test is pas geslaagd als de assistent op een willekeurige vrijdag kan overschakelen naar een alternatief model zonder regressie op de golden dataset. Zonder zo'n test is "exit-mogelijk" een hoop, geen capaciteit.

Laag 2 — Prompts: versie prompts in Git met bijbehorende eval-dataset. Prompts in een vendor-UI (Copilot Studio, Azure AI Studio) gaan verloren bij contractbeëindiging en zijn vaak het lastigste te reconstrueren omdat ze het ervaringsweten van het team bevatten.

Laag 3 — RAG-data en chunks: eigen chunking-pijplijn, brondocumenten in S3-compatible object storage die je overal kunt repliceren. Vendor-specifieke ingestion-tooling levert vaak fraaie demo's op maar creëert een afhankelijkheid die zich pas wreekt als je wil migreren.

Laag 4 — Vector store: kies Qdrant (Apache 2.0), Weaviate, PGVector, Milvus of een vergelijkbare open-source storage. Een proprietary vector-format is een onzichtbare lock-in die pas zichtbaar wordt als de re-embedding-rekening binnenkomt.

Laag 5 — Orkestratie: eigen Python- of TypeScript-code met één abstractielaag, géén Copilot Studio of Azure AI Studio-flows voor productiepaden. Flow-builders zijn handig voor prototypen, dodelijk voor exit.

Laag 6 — Fine-tune-artefacten: als je fine-tunet, sla de fine-tune-data en artefacten op los van het model en de provider. Een fine-tune die alleen in vendor-storage bestaat, kun je niet meeverhuizen.

Laag 7 — Observability en evals: stuur OpenTelemetry naar eigen Grafana, Loki of vergelijkbaar in plaats van een vendor-specifieke monitoring-stack. Self-hostable opties zoals Langfuse zijn beschikbaar; observability is anders de eerste laag die je verliest bij switching omdat historische metrieken vendor-eigendom worden.

Verbind de zeven lagen met inkoop en contract: leg per laag concreet vast welke exit-clausules gelden (SWIPO en de EU Cloud Code of Conduct geven referentieformuleringen) en oefen exit-procedures periodiek — een exit die alleen op papier staat, werkt in de praktijk nooit.

Test exit minstens jaarlijks als drill: simuleer overgang van provider A naar provider B op de zeven lagen tegelijk. De observaties uit zo'n drill — wat duurde te lang, waar liep welke laag vast — zijn de planning-input voor het volgende exit-jaar.
