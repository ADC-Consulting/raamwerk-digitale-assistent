---
id: kies-rol-assistent
title: Kies bewust de rol van de assistent – rol en autonomie passend bij de taak
summary: >
  Een digitale assistent kan informeren, begeleiden, voorbereiden, adviseren of zelfstandig
  handelen. Bepaal per toepassing bewust welke rol de assistent heeft, want die rol bepaalt
  hoeveel vrijheid hij krijgt, hoeveel controle de gebruiker nodig heeft en welk toezicht
  passend is. Stem de mate van autonomie af op de gevolgen van de taak en maak de gekozen rol
  herkenbaar, zonder dat de interface meer suggereert dan het systeem kan waarmaken.
domains: [gebruikerservaring]
good_practise: [menselijke-controle, taakuitvoering]
phases: [PoC, Pilot, Productie]
levels: [Bestuur/ beleidsmaker, Projectmanager, Developer/ Engineer]
sources:
  - algoritmekader-rollen
  - microsoft-hax-systeem-mogelijkheden
  - nng-ai-rollen-ux
  - owasp-excessive-agency
  - algoritmekader-menselijke-controle
  - ai-transparency-ux
---

Een digitale assistent kan heel verschillende rollen vervullen. Soms is hij vooral een hulpmiddel voor één afgebakende taak, soms helpt hij de gebruiker om informatie te begrijpen, soms ondersteunt hij op de achtergrond en in sommige gevallen voert hij ook zelf handelingen uit. Die rol is geen detail: hij bepaalt hoeveel vrijheid de assistent krijgt, hoeveel controle de gebruiker nodig heeft en welk toezicht passend is. Een assistent die alleen uitlegt hoe huurtoeslag werkt, vraagt om een andere inrichting dan een assistent die zelfstandig een aanvraag indient of een afspraak vastlegt.

Kies daarom per toepassing bewust welke rol de assistent speelt en leg die keuze expliciet vast, voordat je nadenkt over de vorm of het kanaal. Onderscheid daarbij rollen als:

- **Informeren:** de assistent geeft uitleg of beantwoordt vragen, zonder gevolgen voor een dossier.
- **Begeleiden:** de assistent helpt de gebruiker stap voor stap door een proces, maar de gebruiker handelt zelf.
- **Voorbereiden:** de assistent verzamelt gegevens of stelt een concept op dat een mens daarna controleert.
- **Adviseren:** de assistent doet een onderbouwde suggestie waarover een mens beslist.
- **Handelen:** de assistent voert binnen vastgestelde grenzen daadwerkelijk een actie uit in een achterliggend systeem.

<!-- tips -->

Bepaal eerst de rol, daarna pas de vorm: kies niet automatisch voor een chatvenster omdat dat het herkenbare beeld van "AI" is. Stel eerst vast of de assistent moet informeren, begeleiden, voorbereiden, adviseren of handelen, en laat die rol bepalen welke interactievorm past. Voor een eenvoudige opzoektaak kan een gericht zoekveld of een beslisboom effectiever en transparanter zijn dan een open gesprek; pas wanneer de taak open en meerstaps is, voegt een conversationele vorm echte waarde toe.

Stem de mate van autonomie af op de taak en de gevolgen: hoe ingrijpender de gevolgen van een handeling voor de burger, hoe meer controle, uitleg en menselijke beoordeling nodig zijn. Werk met een bewust gekozen autonomieniveau per taak, van louter informatie tonen tot een actie voorstellen die een mens bevestigt, tot zelfstandig uitvoeren binnen strikte grenzen. Beperk de bevoegdheden van de assistent tot wat de taak vereist en bouw een expliciet bevestigings- of beoordelingsmoment in zodra een handeling een dossier wijzigt, geld of rechten raakt of moeilijk terug te draaien is.

Maak de rol herkenbaar voor de gebruiker: de gebruiker moet op elk moment begrijpen of de assistent alleen informatie geeft, een suggestie doet, iets voorbereidt of daadwerkelijk een actie uitvoert. Maak in taal en interface zichtbaar wat er gebeurt, bijvoorbeeld door een advies expliciet als "suggestie" te benoemen, door een conceptbrief duidelijk als concept te tonen en door vóór een onomkeerbare actie te bevestigen wat er precies wordt vastgelegd en met welk gevolg. Zo bouwt de gebruiker een correct mentaal beeld op van wat de assistent wel en niet voor hem doet.

Voorkom dat de interface meer belooft dan het systeem kan waarmaken: vorm, taal en interactie mogen geen verkeerde indruk wekken van de deskundigheid, de bevoegdheid of de zelfstandigheid van de assistent. Een vlotte, menselijke toon of een stellige formulering kan suggereren dat de assistent een definitief besluit neemt of namens de organisatie spreekt, terwijl hij in werkelijkheid alleen voorbereidt of adviseert. Wees expliciet over de grenzen van wat de assistent kan en mag, en kies bewoordingen die de werkelijke rol weerspiegelen, zodat verwachtingen kloppen en het vertrouwen in de publieke dienstverlening niet wordt geschaad.
