---
id: infrastructuur-data
nr: 4
title: Infrastructuur & Data
short: "De technische fundering: rekenkracht, opslag, en data-pipelines."
status: published
samenhang_blokken:
  - naam: Beveiliging
    omschrijving: "Elke infrastructuurkeuze heeft directe beveiligingsimplicaties. BIO2-compliance is verplicht. AI-specifieke risico's (prompt injection, data exfiltration) vereisen pentesting, SBOM's en zero-trust-architectuur. De Cyberbeveiligingswet (NIS2-implementatie) treedt in het voorjaar van 2026 in werking."
  - naam: Compliance
    omschrijving: "De EU AI Act (artikel 10) stelt eisen aan data governance. Vanaf augustus 2026 gelden de belangrijkste verplichtingen voor hoog-risico AI-systemen. De infrastructuur moet audit-logging, traceerbaarheid en menselijke interventie technisch ondersteunen."
  - naam: Digitale soevereiniteit
    omschrijving: "Direct verbonden met infrastructuurkeuzes. VLAM.AI, GPT-NL, NLAIF en Haven zijn de concrete instrumenten. De Visie Digitale Autonomie en Soevereiniteit (december 2025) is het beleidskader."
  - naam: Duurzaamheid
    omschrijving: "AI-rekeninfrastructuur is energie-intensief. Modelroutering, kwantisatie en efficiënt model-serving zijn zowel kosten- als duurzaamheidsmaatregelen. Kies het 'smallest sufficient model' per taak."
  - naam: Antwoordkwaliteit
    omschrijving: "De RAG-architectuur, chunking en hybride zoekfunctionaliteit bepalen rechtstreeks de antwoordkwaliteit. Slechte datastructurering leidt direct tot onbetrouwbare antwoorden, ongeacht hoe goed de prompts zijn."
  - naam: Technische prestaties
    omschrijving: "Latency, beschikbaarheid en doorvoer worden bepaald door inference-engine, caching en auto-scaling."
  - naam: Functionaliteit
    omschrijving: "RAG-pipeline, bronverwijzing en response streaming worden mogelijk gemaakt door de infrastructuur. Herbruikbare bouwblokken met MCP-aansluiting breiden de functionaliteit uit."
  - naam: Governance
    omschrijving: "Infrastructuurkeuzes moeten worden verankerd in governance: wie beslist over modelwissels, wie beheert de bronwitte-lijst, wie monitort kwaliteitsmetrieken. Het hernieuwde CIO-stelsel (per 1 januari 2026) voegt CTO-, CDO- en CPO-rollen toe."
  - naam: Kennis en capaciteit
    omschrijving: "Het inrichten van deze infrastructuur vereist gespecialiseerde kenniswerkers (data engineers, MLOps-specialisten, AI-architecten)."
  - naam: Cultuur & Adoptie
    omschrijving: "Infrastructuurkeuzes beïnvloeden de adoptie. VLAM.AI en GovChat-NL maken AI laagdrempelig beschikbaar voor ambtenaren, wat de adoptie bevordert. Adoptie vereist ook AI-geletterdheid, conform de AI-verordening verplicht vanaf februari 2025."
sources:
  - visie-digitale-autonomie
  - handreiking-generatieve-ai
  - bio2
  - algoritmekader
  - algoritmeregister
  - nora
  - gemma
  - common-ground
  - vlam-ai
  - gpt-nl
  - surf-snellius
  - govchat-nl
  - haven
  - standaard-platform
  - wetwijzer-bedrijven
  - nvidia-rag-blueprint
---

Infrastructuur & Data omvat alles wat onder de motorkap zit van een digitale AI-assistent: de rekenkracht waarop hij draait, de manier waarop hij informatie ophaalt, en de processen om hem stabiel en betrouwbaar te houden. Naast hardware en software gaat het om de manier waarop data wordt beheerd, verrijkt en beschikbaar gemaakt. Dit fundament vormt de technische bodem waar assistenten op draaien.

Het fundament beslaat zes samenhangende deelonderwerpen:

- **Waar draait het op? (AI-rekeninfrastructuur)** — De fysieke rekenkracht waarop AI-modellen draaien. Kies je voor een eigen overheidsdatacentrum, een Europese soevereine cloud, of een commerciële publieke cloud? En hoe koop je die rekenkracht in (bijv. via MaaS/1 STIP)?
- **Hoe zet je het model live? (Model hosting en deployment)** — De manier waarop een taalmodel daadwerkelijk in productie draait: welke software serveert het model (vLLM, Ollama), hoe verpak je het in containers (Kubernetes), hoe houd je versies bij, en hoe stuur je vragen naar het juiste model.
- **Hoe komt de assistent aan zijn kennis? (Datapijplijnen voor RAG)** — Het proces om overheidsbronnen op te halen, in stukjes te knippen (chunking), doorzoekbaar te maken (embeddings, vectordatabases) en de juiste passages te vinden bij een vraag.
- **Welke bronnen vertrouw je? (Datakwaliteit en governance)** — Welke bronnen mag de assistent gebruiken, wie bewaakt de kwaliteit, en hoe houd je ze actueel als wet- en regelgeving verandert?
- **Werkt het zoals het moet? (Monitoring en observability)** — Doorlopend zicht op wat de assistent doet, of antwoorden kloppen, hoeveel het kost, en waar het misgaat. Met tooling als Langfuse, MLflow en evaluatieframeworks zoals RAGAS.
- **Blijft het werken bij druk? (Schaalbaarheid en beschikbaarheid)** — Denk aan automatisch op- en afschalen, slim hergebruik van eerdere antwoorden (caching), en het onderscheid tussen real-time vragen en zwaar nachtwerk.

---

Infrastructuurkeuzes bepalen wat een digitale assistent veilig, betrouwbaar en soeverein kan leveren. Een assistent die draait op een publieke cloud-API van een Amerikaans techbedrijf heeft wezenlijk andere eigenschappen qua privacy, beschikbaarheid en kosten dan een assistent op het VLAM.AI-platform in een Overheidsdatacentrum. Infrastructuur is geen technisch detail maar een beleidsmatige keuze met directe impact op burgers en de controleerbaarheid van overheidsdienstverlening.

Het doel van goede infrastructuur is een stabiel, veilig en schaalbaar technisch fundament waarop digitale assistenten betrouwbaar kunnen draaien, met behoud van digitale soevereiniteit en controle over data.

Zonder goede infrastructuur loopt ieder chatbot-project uiteindelijk vast. Denk aan vendor lock-in op één commerciële LLM-provider, oncontroleerbare kosten, onduidelijkheid over waar data en logs staan, en performance-problemen zodra het gebruik groeit. Met goede infrastructuur bouw je aan lagere kosten, meer wendbaarheid en de mogelijkheid om als overheid regie te houden over je eigen technologie. Dat betekent niet dat je alle oplossingen zelf hoeft te hosten, maar wel dat je je bewust moet zijn van de beslissingen die je maakt.

- **Belangrijk voor de burger:** Goede data en infrastructuur zorgt ervoor dat antwoorden betrouwbaar, snel en privacybewust tot stand komen. Als een RAG-pijplijn alleen officiële wetgeving als bron gebruikt, krijgt de burger een verifieerbaar antwoord met bronverwijzing. Verouderde bronnen leiden tot verkeerde informatie over rechten en plichten. En mensen beoordelen fouten van AI strenger dan menselijke fouten; een solide data-infrastructuur is daarom nodig om vertrouwen te behouden.
- **Belangrijk voor de organisatie:** De infrastructuurkeuze bepaalt kosten, schaalbaarheid en wendbaarheid.
- **Belangrijk voor de overheid als geheel:** Het principe 'centraal afspreken, federatief inrichten' stuurt aan op gedeelde voorzieningen. Herbruikbare bouwblokken (open-source API's, widgets) voorkomen dat iedere organisatie het wiel opnieuw uitvindt. De Visie Digitale Autonomie en Soevereiniteit (december 2025) vat het samen: 'open waar kan, beschermen waar moet'.
