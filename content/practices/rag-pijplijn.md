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
  - anaconda-rag
  - LangChain-rag
---

Implementeer hybride zoeken als standaard: combineer lexicaal zoeken (BM25) met semantisch zoeken (vector similarity).

Kies structuurbewuste chunking: NVIDIA's benchmark (2025) vond page-level chunking de meest consistente prestaties opleveren bij gemengde datasets, al blijft de optimale strategie corpusafhankelijk.

Gebruik een Nederlands embeddingmodel: de E5-NL-modellen zijn open source beschikbaar op Hugging Face en zijn op dit moment de beste beschikbare embeddings voor het Nederlands.

Diversifieer en valideer bronnen in RAG: voorkom dat een onbetrouwbare bron de output domineert.

Verbeter de kwaliteit van de opgehaalde data via chunking-strategie en relevantiecheck: de keuze hoe te chunken (per pagina, per paragraaf, per semantisch blok) bepaalt of de juiste passages worden opgehaald. Combineer dat met een relevantiecheck op opgehaalde chunks. Niet alles wat lijkt te matchen is daadwerkelijk relevant.

Kies bewust je vectordatabase: voor de meeste overheidstoepassingen voldoen open-source self-hostable opties zoals Qdrant, ClickHouse, Milvus of Weaviate, of Elasticsearch als je organisatie die al draait. Voorkom lock-in op een proprietaire cloud-vectordatabase.

Voeg altijd bronvermelding toe: elk antwoord moet herleidbaar zijn naar de onderliggende bron. 

Overweeg gelaagde RAG: begin met zoeken in een beperkte laag (bijv. FAQ's); als daar geen antwoord is, zoek in een bredere laag (wetgeving). WetWijzer experimenteerde hiermee met positieve resultaten.

Test RAG-componenten afzonderlijk, niet alleen de eind-output: evalueer bij een RAG-assistent de retrieval (worden de juiste bronnen en chunks opgehaald?) en de generatie (klopt het antwoord op basis van de opgehaalde bronnen?) als losse stappen. Dat geeft veel betere diagnostische informatie dan alleen kijken naar de uiteindelijke chatbot-output: je ziet of een fout in het ophalen zit of in het formuleren, en weet zo waar je moet bijsturen. Gebruik hiervoor de golden dataset met de juiste bronnen per vraag (zie de praktijk over de golden dataset) en metrieken die de stappen scheiden, zoals context precision en context recall voor retrieval en faithfulness en answer relevancy voor generatie (zie RAGAS in de praktijk over monitoring en LLMOps). 