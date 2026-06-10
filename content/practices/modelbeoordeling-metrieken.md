---
id: modelbeoordeling-metrieken
title: Metrieken voor modelbeoordeling
summary: >
  Het is essentieel om ook de modellen te beoordelen die jouw digitale assistent aansturen. De gekozen modellen hebben rechtstreeks invloed op responstijden, benodigde infrastructuur en de schaalbaarheid van de oplossing bij toenemend gebruik. Gebruik daarom meetbare indicatoren, zoals nauwkeurigheid, foutpercentage en responstijd, om te bepalen of een model technisch én functioneel voldoende geschikt is voor de beoogde toepassing. 
domains: [evaluatie-assistent, technische-prestaties]
good_practise: [golden-dataset, kleinste-model-per-taak]
phases: [Pilot, Productie]
levels: [Developer/ Engineer]
sources:
  - validatiekader-llm
  - deepeval
  - datadog-llm-evaluation
---

Begin bij de use case, niet bij de metric: Beschrijf per toepassing kort het doel van de digitale assistent (bijvoorbeeld “publieke informatie over regelingen”) en de belangrijkste risico’s (onjuiste informatie, onveilige output, misverstanden bij burgers). Kies vervolgens alleen metrieken die hier direct op aansluiten, zoals juistheid, veiligheid, begrijpelijkheid en gebruikerstevredenheid.

Combineer evaluatie met en zonder ground truth: Gebruik gelabelde cases (ground truth) voor scherp afgebakende taken zoals routing, classificatie, extractie en gestandaardiseerde Q&A. Vul dit aan met human evaluation, LLM‑as‑a‑judge en productie‑statistieken voor open‑ended antwoorden. Zo ontstaat een realistischer beeld van prestaties in de praktijk.

Zorg voor een representatieve en inclusieve testset ("golden set"): Neem in je testsets zowel veelvoorkomende als lastige, zeldzame en maatschappelijk gevoelige casussen op. Zorg dat taalniveau, vraagtypen en onderwerpen aansluiten bij de echte doelgroep en let er expliciet op dat kwetsbare groepen en edge‑cases voldoende zijn vertegenwoordigd.

Definieer drempelwaarden en ‘stop‑knoppen’ vooraf: Leg vooraf vast bij welke waarden van bijvoorbeeld hallucination rate, toxiciteit, foutpercentage of escalatieratio je ingrijpt. Beschrijf ook wie bevoegd is om het model (tijdelijk) terug te draaien, extra mitigaties te activeren of de dienst stil te leggen, en hoe deze beslissingen worden gedocumenteerd.

Voer gerichte menselijke reviews uit: Laat experts steekproefsgewijs antwoorden beoordelen op inhoud, toon en risico's. Gebruik hun feedback om tests aan te scherpen, drempelwaarden bij te stellen en waar nodig aanvullende guardrails in te richten.
