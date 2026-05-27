---
id: zuinige-inferentie
title: Maak inferentie zuinig per aanroep
summary: >
  Bij een volwassen assistent ligt 80–90% van de footprint in inferentie. Kleine
  ingrepen in promptontwerp, RAG-configuratie en caching leveren dan het
  grootste effect — mits gemeten tegen een kwaliteitsbenchmark, want
  overoptimalisatie kan nauwkeurigheid kosten.
domains: [duurzaamheid, technische-prestaties, infrastructuur-data, gebruikerservaring]
phases: [Pilot, Productie]
levels: [Operationeel]
sources:
  - arxiv-rag-energy
  - arxiv-babbling-suppression
  - green-software-patterns-ai
  - w3c-wsg
  - milvus
  - qdrant
---

Begrens outputlengte expliciet: stel `max_tokens` in en geef in de system-prompt instructies als "antwoord in maximaal drie zinnen, zonder inleiding". Onderzoek naar babbling suppression rapporteert 44–89% energiebesparing bij behoud van antwoordkwaliteit als alleen output-begrenzing wordt toegepast.

Stream responses naar de gebruiker: de gebruiker ziet het antwoord eerder én je kunt de generatie vroegtijdig afbreken als het antwoord compleet is. Dat is winst op latency én op energie.

Cache agressief: veelgestelde vragen ("waar vraag ik huurtoeslag aan?") horen niet elke keer het volledige RAG+LLM-pad te doorlopen. Vector-databases zoals Milvus, Qdrant en pgvector ondersteunen semantische caching, waarbij vergelijkbare queries op basis van embedding-similariteit hergebruikt worden.

Tune RAG-configuratie gericht op zowel kwaliteit als energie: chunking-grootte, retrieval-thresholds en het aantal opgehaalde passages hebben elk een effect op beide dimensies. SIG en VU Amsterdam vonden dat over-aggressieve chunking weliswaar energie spaart maar de antwoordkwaliteit substantieel verlaagt — meet beide voordat je optimaliseert.

Pas op voor over-agentificatie: elke extra agent-stap in een multi-agent-setup voegt tokens én latency toe. Ga per use-case na of een extra controle-agent echt waarde toevoegt, of dat een eenvoudige guardrail-regel volstaat. De afweging is risicogestuurd: hoge-impact-use-cases rechtvaardigen mogelijk een aparte controle-agent, bij laag risico volstaat een goedkope guardrail.

Gebruik concrete Green-Software-patronen voor implementatie: de Green Software Foundation onderhoudt een catalogus met ontwerppatronen voor energie-efficiënte AI-systemen, inclusief patronen voor caching, batching en prompt-optimalisatie. Begin daar in plaats van zelf op te bouwen.

Vergeet de front-end niet: de W3C Web Sustainability Guidelines geven praktische richtlijnen voor duurzaam front-end-ontwerp van de user-facing kant van de assistent — complementair aan WCAG 2.2 en vaak laaghangend fruit.
