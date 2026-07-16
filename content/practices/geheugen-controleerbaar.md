---
id: geheugen-controleerbaar
title: Maak geheugen expliciet en controleerbaar – wat de assistent onthoudt, waarom en hoe lang
summary: >
  Een assistent die context onthoudt kan relevanter en persoonlijker reageren, maar geheugen
  raakt direct aan privacy, vertrouwen en controle. Maak daarom expliciet wat de assistent
  onthoudt, hoe lang en waarom, laat zien waarop een antwoord is gebaseerd, en geef gebruikers
  de mogelijkheid om opgeslagen informatie in te zien, aan te passen en te verwijderen. Sla
  alleen op wat aantoonbaar waarde toevoegt en proportioneel is.
domains: [gebruikerservaring]
good_practise: [contextueel-conversatievermogen, personalisatie]
phases: [Pilot, Productie]
levels: [Developer/ Engineer, Compliance officer]
sources:
  - dpia-ap
  - ap-bewaartermijnen
  - openai-memory-controls
  - user-profile-conv-ai
  - nng-designing-ai
  - dpia-copilot-memo
---

Een assistent wordt vaak relevanter wanneer hij context onthoudt: een eerder genoemd zaaknummer, een taalvoorkeur of de stap waar een aanvrager in een procedure is blijven steken. Maar geheugen is geen neutrale technische functie. Het raakt direct aan privacy, vertrouwen en de mate van controle die een burger of medewerker over zijn eigen gegevens houdt. Gebruikers moeten daarom kunnen weten wat de assistent onthoudt, hoe lang, waarom dat gebeurt en hoe zij dit kunnen inzien, aanpassen of laten verwijderen.

Voor een overheidsassistent is dit niet vrijblijvend. De AVG-beginselen van dataminimalisatie en opslagbeperking schrijven voor dat je niet meer persoonsgegevens bewaart dan noodzakelijk is voor het doel, en niet langer dan nodig. Behandel geheugen daarom als een bewuste ontwerpkeuze met een onderbouwing en een bewaartermijn, niet als een functie die je standaard aanzet omdat het technisch kan.

<!-- tips -->

Maak onderscheid tussen tijdelijk en blijvend geheugen: leg in de interface helder uit welke informatie alleen binnen het huidige gesprek wordt gebruikt en daarna verdwijnt, en welke informatie wordt opgeslagen en in een later gesprek opnieuw beschikbaar is. Een burger die eenmalig een vraag stelt verwacht doorgaans geen blijvend profiel; bied bijvoorbeeld een tijdelijke of incognito-modus aan voor gesprekken die niets onthouden, en markeer zichtbaar wanneer de assistent iets aan het langetermijngeheugen toevoegt.

Toon welke informatie wordt gebruikt: maak per antwoord duidelijk waarop het is gebaseerd, of dat nu het lopende gesprek is, een geüpload document, profielinformatie, eerdere interacties of een externe bron. Wanneer een gebruiker ziet dat de assistent zich iets "herinnert" uit een eerder contact, moet hij kunnen herleiden waar die kennis vandaan komt; dat voorkomt het gevoel dat er ongemerkt een dossier wordt opgebouwd en maakt onjuiste aannames corrigeerbaar.

Geef gebruikers controle over opgeslagen informatie: zorg dat opgeslagen gegevens, voorkeuren en context op één plek te bekijken, aan te passen en te verwijderen zijn, bij voorkeur via een voorkeuren- of geheugenpagina en niet alleen via een gesprek met de assistent. Dit sluit aan op de AVG-rechten op inzage, correctie en verwijdering: een verwijderverzoek moet daadwerkelijk leiden tot het wissen van de betreffende herinnering, niet alleen tot het verbergen ervan in de interface.

Gebruik geheugen alleen als het nodig is: sla informatie niet op omdat het technisch kan, maar alleen wanneer het aantoonbaar waarde toevoegt voor de gebruiker en proportioneel is ten opzichte van het doel. Leg per soort opgeslagen gegeven vast waarom het wordt onthouden en hoe lang, hanteer een onderbouwde bewaartermijn die zo kort mogelijk is, en toets nieuwe vormen van geheugen vooraf in een DPIA. Wat je niet bewaart, kan ook niet uitlekken of verkeerd worden gebruikt.
