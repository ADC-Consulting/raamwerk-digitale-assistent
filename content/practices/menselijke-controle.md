---
id: menselijke-controle
title: Leg menselijke controlepunten expliciet vast
summary: >
  Een digitale assistent mag het werk ondersteunen, maar mag beslissingen die burgers direct raken nooit volledig zelfstandig nemen. De AVG verbiedt in artikel 22 volledig geautomatiseerde besluitvorming die rechtsgevolgen heeft of mensen in aanmerkelijke mate treft. Bij hoog-risico AI-systemen in de zin van de AI-verordening gelden bovendien aanvullende verplichtingen rond menselijk toezicht. Maar ook buiten die formele categorieën geldt: zodra een digitale assistent een rol speelt in beslissingen die burgers raken, moet expliciet worden vastgelegd waar een mens in de keten zit, welke rol die mens heeft en wat het systeem nooit zelfstandig mag beslissen. 
domains: [evaluatie-assistent, gebruikerservaring]
phases: [Pilot, Productie]
levels: [Projectmanager, Developer/ Engineer]
sources:
  - algoritmekader-menselijke-controle
  - algoritmekader-menselijke-tussenkomst
  - algoritmekader-rollen
  - ap-menselijke-tussenkomst
---

Bepaal per use case welk model van menselijke controle van toepassing is: kies bewust tussen human in the loop (mens beoordeelt elke output voordat een beslissing wordt genomen), human on the loop (mens houdt toezicht en kan ingrijpen), human above the loop (mens stuurt op strategisch en ethisch niveau) en human before the loop (mens bouwt ethische afwegingen vooraf in het systeem in). De keuze hangt af van het type systeem, het risico en de fase van de levenscyclus. Zorg ook dat de tussenkomst op het juiste moment plaatsvindt: controle achteraf, nadat het systeem feitelijk al heeft beslist, controleert niet meer. 

Leg vast wat het systeem nooit zelfstandig mag beslissen, en zorg dat die grens in de praktijk standhoudt: formuleer per use case welke beslissingen altijd door een mens worden genomen, ook als het systeem een advies geeft. 

Beschrijf de verantwoordelijkheden expliciet en ga uit van meerdere betrokkenen: er is nooit één persoon verantwoordelijk voor de totale controle. Leg zo vroeg mogelijk vast wie in welke fase verantwoordelijk is voor menselijke controle, bij voorkeur in een RACI- of VERI-matrix. Leg ook vast wie eindverantwoordelijk is bij afwijkend systeemgedrag en wie het aanspreekpunt is voor signalen uit de uitvoering. De verantwoordelijkheid voor het proces mag niet op de individuele beoordelaar worden afgewenteld. 

Zorg dat de persoon die controleert ook daadwerkelijk kan en durft in te grijpen: menselijke controle is alleen betekenisvol als de beoordelaar het systeem kan stilleggen, de output naast zich neer kan leggen of een beslissing kan terugdraaien, zowel technisch als organisatorisch. Stel een escalatieprocedure in voor twijfelgevallen. Zorg ook dat beoordelaars niet worden afgestraft als ze tegen het systeem ingaan. 
