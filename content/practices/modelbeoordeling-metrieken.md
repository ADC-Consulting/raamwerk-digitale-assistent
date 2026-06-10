---
id: modelbeoordeling-metrieken
title: Metrieken voor modelbeoordeling - kies het kleinste model dat de taak aan kan
summary: >
  Het is essentieel om ook de modellen te beoordelen die jouw digitale assistent aansturen. De gekozen modellen hebben rechtstreeks invloed op responstijden, benodigde infrastructuur en de schaalbaarheid van de oplossing bij toenemend gebruik. Gebruik daarom meetbare indicatoren, zoals nauwkeurigheid, foutpercentage en responstijd, om te bepalen of een model technisch én functioneel voldoende geschikt is voor de beoogde toepassing. 
domains: [technische-prestaties]
phases: [Pilot, Productie]
levels: [Developer/ Engineer]
sources:
  - deepeval
  - datadog-llm-evaluation
---

<!-- tips -->

Bepaal doel en risico's per toepassing: Inventariseer eerst waarvoor het model wordt ingezet (bijv. klantvragen, interne kennisbank, besluitondersteuning) en welke fouten onacceptabel zijn. Leg vast welke kwaliteitsaspecten zwaarder wegen: juistheid, volledigheid, toon, veiligheid, snelheid, etc.

Definieer concrete kwaliteitscriteria en drempelwaarden: Vertaal de gekozen aspecten naar meetbare indicatoren, zoals nauwkeurigheid op een testsuite, foutpercentage, responstijd, dekking van relevante informatie en naleving van policies. Stel per indicator duidelijke drempels vast (bijv. minimaal 90% taaksucces, maximaal 2% kritieke fouten).

Ontwikkel een representatieve testset ("golden set"): Stel een set samen met realistische voorbeelden uit jullie praktijk: veelvoorkomende vragen, randgevallen en risicoscenario's. Voor elk voorbeeld leg je het gewenste antwoord of de gewenste beoordeling expliciet vast.

Automatiseer model-evaluaties: Richt een geautomatiseerde evaluatiepipeline in die bij elke wijziging (nieuw model, nieuwe prompt, nieuwe brondata) de golden set door het model haalt en de indicatoren berekent. Hiervoor kun je bijvoorbeeld gebruikmaken van DeepEval van Confident AI, waarmee je verschillende metriek en evaluatiescripts kunt definiëren en herhalen.

Voer gerichte menselijke reviews uit: Laat experts steekproefsgewijs antwoorden beoordelen op inhoud, toon en risico's. Gebruik hun feedback om tests aan te scherpen, drempelwaarden bij te stellen en waar nodig aanvullende guardrails in te richten.
