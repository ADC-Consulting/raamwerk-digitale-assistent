---
id: caching-strategieen
title: Caching voor een snellere en goedkopere digitale assistent
summary: >
  Caching zorgt ervoor dat de digitale assistent eerdere resultaten en gedeelde
  antwoorden slim hergebruikt in plaats van bij elke vraag alles opnieuw door het
  LLM te laten uitrekenen. Het juist combineren van cachingstrategieën kan kosten verlagen en de responstijd flink verbeteren.
domains: [technische-prestaties]
phases: [Pilot, Productie]
levels: [Developer/ Engineer]
sources:
  - ibm-prompt-caching
  - aws-llm-caching
  - databricks-semantic-caching
  - redis-distributed-caching
---

Er bestaan verschillende cachingtechnieken:

- **Prompt caching:** In plaats van dezelfde invoertokens steeds opnieuw te verwerken, bewaart de service een tijdelijke cache van verwerkte berekeningen om de algehele prestaties te verbeteren.
- **Request-response caching (exacte match):** Slaat verzoeken en hun resultaten op, zodat wanneer hetzelfde verzoek opnieuw wordt gedaan, het opgeslagen antwoord snel kan worden geleverd zonder het verzoek opnieuw te hoeven verwerken.
- **Semantische caching (betekenismatch):** Het systeem interpreteert en slaat de semantische betekenis van gebruikersvragen op, waardoor informatie kan worden opgehaald op basis van intentie, niet alleen op basis van letterlijke overeenkomsten.
- **In-memory caching:** Bewaart context tijdelijk in het geheugen binnen één sessie of voor korte duur, zodat vervolgvragen sneller kunnen worden afgehandeld. Het gebruik van in-memory caching kan de kosten met tientallen procenten verlagen en de responstijd flink verbeteren, vooral bij veel herhaalde of vergelijkbare vragen in productieomgevingen.

<!-- tips -->

Caching kan de kosten met tientallen procenten verlagen en de responstijd flink verbeteren, vooral bij veel herhaalde of vergelijkbare vragen in productieomgevingen.

Bepaal doel en scope: Leg vast waarom je wilt cachen (kosten, latency, piekbelasting) en welke onderdelen je gaat cachen (LLM-antwoorden, RAG-resultaten, API-calls, sessiecontext).

Kies cachingstrategieën: Beslis per use case of je prompt caching, request-response caching, semantische caching en/of een andere cachingstrategie inzet.

Kies de juiste techniek: Koppel elke gekozen strategie aan passende opslagtechnologie. Voor prompt- en request-response caching volstaan vaak een in-memory store of een gedistribueerde cache (zoals Redis) voor snelle key-value lookups. Voor semantische caching heb je daarnaast een vector database of vector-index nodig om embeddings op te slaan en gelijkaardige vragen terug te vinden.

Ontwerp sleutels en TTL's (Time To Live (vervaltijden)): Definieer duidelijke cache-sleutels en stel per datatype passende TTL's in: korte TTL voor snel wijzigende data of sessiecontext, langere TTL voor relatief stabiele informatie zoals FAQ's of policies.

Monitor hit ratio en kwaliteit: Houd de cache hit ratio bij en controleer regelmatig of gecachte antwoorden nog juist en actueel zijn.
