---
id: rag-pijplijn
title: RAG-pijplijnarchitectuur – betrouwbaar ophalen en dan verifieerbaar antwoorden
summary: >
  Retrieval-Augmented Generation (RAG) is de meest gebruikte architectuur voor
  digitale assistenten die antwoorden moeten baseren op actuele, betrouwbare
  bronnen. De kwaliteit hangt niet af van het taalmodel alleen, maar vooral van
  hoe goed de retrieval werkt.
domains: [infrastructuur-data, functionaliteit]
phases: [PoC, Pilot, Productie]
levels: [Developer/ Engineer]
sources:
  - wetwijzer-bedrijven
  - dense-sparse-retrieval
  - nvidia-chunking-strategy
  - e5-nl-embeddings
  - qdrant
  - milvus
  - weaviate
---

Implementeer hybride zoeken als standaard: combineer lexicaal zoeken (BM25) met semantisch zoeken (vector similarity).

Kies structuurbewuste chunking: NVIDIA's benchmark (2025) vond page-level chunking de meest consistente prestaties opleveren bij gemengde datasets, al blijft de optimale strategie corpusafhankelijk.

Gebruik een Nederlands embeddingmodel: de E5-NL-modellen zijn open source beschikbaar op Hugging Face en zijn op dit moment de beste beschikbare embeddings voor het Nederlands.

Kies bewust je vectordatabase: voor de meeste overheidstoepassingen voldoen open-source self-hostable opties zoals Qdrant, Milvus of Weaviate, of Elasticsearch als je organisatie die al draait. Voorkom lock-in op een proprietaire cloud-vectordatabase.

Voeg altijd bronvermelding toe: elk antwoord moet herleidbaar zijn naar de onderliggende bron. Dit is ook een transparantieverplichting vanuit de AI-verordening.

Overweeg gelaagde RAG: begin met zoeken in een beperkte laag (bijv. FAQ's); als daar geen antwoord is, zoek in een bredere laag (wetgeving). WetWijzer experimenteerde hiermee met positieve resultaten.
