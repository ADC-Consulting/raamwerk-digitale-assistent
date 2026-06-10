---
id: bias-monitoring
title: Detecteer en voorkom onzichtbare schendingen van waarden en rechten door de assistent
summary: >
  Een digitale assistent kan discriminerende effecten hebben of grondrechten
  schenden zonder dat dit zichtbaar is in dagelijks gebruik. Wie het niet actief
  meet, met een combinatie van gestructureerde tools en een ethische test-set,
  weet het niet.
domains: [ethiek-mensenrechten]
phases: [Pilot, Productie]
levels: [Projectmanager]
sources:
  - algoritmekader-bias
  - algoritmekader-biastoets
  - algoritmekader-monitoring
  - bias-detection-tool
  - fairlearn
  - aequitas
  - ai-fairness-360
---

Stel bij de start van het het bouwen van een digitale assistent vast op welke vormen van bias je test: directe bias (het systeem gebruikt een beschermde eigenschap als variabele) versus indirecte bias (het systeem behandelt groepen anders op basis van ogenschijnlijk neutrale kenmerken zoals taalgebruik of formulering). Niet elke vorm is relevant voor elke use case. Maak de keuze expliciet en leg deze vast.

Gebruik gestructureerde tools om bias te detecteren in plaats van uitsluitend handmatige steekproeven: de Bias Detection Tool van Algorithm Audit identificeert op statistische basis groepen waarbij het systeem afwijkend presteert. Tools zoals Fairlearn, Aequitas en AI Fairness 360 zijn complementair: ze meten hoe eerlijk het systeem presteert voor gedefinieerde groepen en bieden deels mitigatie-technieken. Alle tools leveren een startpunt op voor menselijke beoordeling; zij kunnen zelf niet vaststellen of er sprake is van verboden discriminatie.

Bouw een test-set met ethische cases: een verzameling prompts waarmee je steeds opnieuw test of de assistent zich verantwoord gedraagt. Geef de assistent bijvoorbeeld twee bijna identieke vragen, waarbij alleen een gevoelig of sociaal kenmerk verandert (naam, wijk, leeftijd, taalniveau). Draai de test-set bij elke wijziging in model, prompt, databron, retrieval-instellingen, kanaal of doelgroep. Testcategorieën om te dekken: onjuiste aanname van de gebruiker, kwetsbare gebruiker, juridische nuance, privacy, discriminatie, bronkwaliteit, hallucinatie, escalatie, misbruik en rechtsbescherming.

Combineer automatische AI-evaluatie met menselijke beoordeling: automatische evaluatie pakt toxiciteit, verboden woorden en toon goed op; menselijke beoordeling is nodig bij antwoorden over rechten, plichten, aanvragen, boetes, toeslagen, vergunningen, bezwaar en persoonlijke situaties. De beoordelaar moet expertise hebben in zowel het juridische domein als de groep gebruikers die het raakt.

Leg de uitkomsten vast als onderbouwing: documenteer wat je hebt gemeten, wat je hebt gevonden, hoe geconstateerde bias is ontstaan en welke beslissing je op basis daarvan hebt genomen. Dit maakt het systeem intern toetsbaar en biedt een basis als de inzet later wordt beoordeeld of aangevochten. 

Voer een rechtvaardigingstoets uit wanneer bias wordt geconstateerd: Volg de drie-stappen-aanpak uit het Algoritmekader: analyseer of er sprake is van bias, voer een rechtvaardigingstoets uit en bepaal de ethische wenselijkheid. Het oordeel blijft bij een mens, niet bij de tool.
