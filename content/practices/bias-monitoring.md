---
id: bias-monitoring
title: Meet en monitor actief of de assistent handelt naar waarden en rechten
summary: >
  Een digitale assistent kan discriminerende effecten hebben of grondrechten
  schenden zonder dat dit zichtbaar is in dagelijks gebruik. Wie het niet
  actief meet — met een combinatie van gestructureerde tools en een ethische
  test-set — weet het niet.
domains: [ethiek-mensenrechten, antwoordkwaliteit, governance]
phases: [Pilot, Productie]
levels: [Operationeel, Tactisch]
sources:
  - algoritmekader-bias
  - algoritmekader-biastoets
  - algoritmekader-monitoring
  - bias-detection-tool
  - fairlearn
  - aequitas
  - ai-fairness-360
---

Stel bij de start vast op welke vormen van bias je test: directe bias (het systeem gebruikt een beschermde eigenschap als variabele) versus indirecte bias (het systeem behandelt groepen anders op basis van ogenschijnlijk neutrale kenmerken zoals taalgebruik of formulering). Niet elke vorm is relevant voor elke use case — maak de keuze expliciet en leg hem vast.

Gebruik gestructureerde tools om bias te detecteren in plaats van uitsluitend handmatige steekproeven: de Bias Detection Tool van Algorithm Audit identificeert op statistische basis groepen waarbij het systeem afwijkend presteert (werkt met gestructureerde tabeldata, niet met ongestructureerde tekstoutput). Tools zoals Fairlearn, Aequitas en AI Fairness 360 zijn complementair — ze meten hoe eerlijk het systeem presteert voor reeds gedefinieerde groepen en bieden deels mitigatie-technieken. Alle tools leveren een startpunt op voor menselijke beoordeling; zij kunnen zelf niet vaststellen of er sprake is van verboden discriminatie.

Bouw een test-set met ethische cases: een verzameling prompts waarmee je steeds opnieuw test of de assistent zich verantwoord gedraagt. Geef de assistent bijvoorbeeld twee bijna identieke vragen, waarbij alleen een gevoelig of sociaal kenmerk verandert (naam, wijk, leeftijd, taalniveau). Draai de test-set bij elke wijziging in model, prompt, databron, retrieval-instellingen, kanaal of doelgroep. Testcategorieën om te dekken: onjuiste aanname van de gebruiker, kwetsbare gebruiker, juridische nuance, privacy, discriminatie, bronkwaliteit, hallucinatie, escalatie, misbruik en rechtsbescherming.

Combineer automatische AI-evaluatie met menselijke beoordeling: automatische evaluatie pakt toxiciteit, verboden woorden en toon goed op; menselijke beoordeling is nodig bij antwoorden over rechten, plichten, aanvragen, boetes, toeslagen, vergunningen, bezwaar en persoonlijke situaties. De beoordelaar moet expertise hebben in zowel het juridische domein als de groep gebruikers die het raakt.

Herhaal de meting periodiek en na elke significante wijziging: biastoetsing is geen eenmalige activiteit. Bouw periodieke evaluatie in als vast onderdeel van het beheerproces en herhaal de meting altijd na een modelupdate, een wijziging in de gebruikerspopulatie of het toevoegen van een nieuwe use case. Stel bij elke meting ook de vraag of de gehanteerde indicatoren nog meten wat ze beogen te meten — de meetopzet zelf kan verouderd raken.

Leg de uitkomsten vast als onderbouwing: documenteer wat je hebt gemeten, wat je hebt gevonden, hoe geconstateerde bias is ontstaan en welke beslissing je op basis daarvan hebt genomen. Dit maakt het systeem intern toetsbaar en biedt een basis als de inzet later wordt beoordeeld of aangevochten — een meetresultaat zonder beslissing is een rapport, geen besturing.

Voer een rechtvaardigingstoets uit wanneer bias wordt geconstateerd: een statistisch significante afwijking is niet automatisch verboden discriminatie. Volg de drie-stappen-aanpak uit het Algoritmekader: analyseer of er sprake is van bias, voer een rechtvaardigingstoets uit en bepaal de ethische wenselijkheid. Het oordeel blijft bij een mens, niet bij de tool.
