---
id: menselijke-controle
title: Leg menselijke controlepunten expliciet vast
summary: >
  Een digitale assistent mag het werk ondersteunen maar mag beslissingen die
  burgers direct raken nooit volledig zelfstandig nemen. AVG art. 22 en de
  AI-verordening vragen om expliciet vastgelegde menselijke controle die in de
  praktijk ook standhoudt.
domains: [ethiek-mensenrechten, governance, compliance]
phases: [Pilot, Productie]
levels: [Tactisch, Bestuurlijk]
sources:
  - algoritmekader-menselijke-controle
  - algoritmekader-menselijke-tussenkomst
  - algoritmekader-rollen
  - ap-menselijke-tussenkomst
---

Bepaal per use case welk model van menselijke controle van toepassing is: kies bewust tussen human in the loop (mens beoordeelt elke output voordat een beslissing wordt genomen), human on the loop (mens houdt toezicht en kan ingrijpen), human above the loop (mens stuurt op strategisch en ethisch niveau) en human before the loop (mens bouwt ethische afwegingen vooraf in het systeem in). De keuze hangt af van type systeem, risico en levenscyclusfase.

Zorg dat de tussenkomst op het juiste moment plaatsvindt: controle achteraf, nadat het systeem feitelijk al heeft beslist, controleert niet meer. Bij hoge volumes verschuift de controle van het individuele besluit naar het besluitvormingssysteem als geheel — doelen, normen, data, uitzonderingen, foutpercentages, escalaties, audits en stopknoppen.

Pas op voor de valkuil van schijncontrole bij "human on the loop": de mens blijft formeel verantwoordelijk maar kijkt in de praktijk alleen naar dashboards, waarschuwingen of steekproeven. Zonder duidelijke normen en ingrijpmomenten wordt dat schijntoezicht. Stel concrete drempels vast waarop een mens moet ingrijpen.

Leg vast wat het systeem nooit zelfstandig mag beslissen en zorg dat die grens in de praktijk standhoudt: formuleer per use case welke beslissingen altijd door een mens worden genomen, ook als het systeem een advies geeft. Formele vastlegging is niet genoeg — als beoordelaars structureel de output overnemen zonder zelfstandig te oordelen, is er feitelijk geen menselijke tussenkomst meer. Monitor of beoordelaars daadwerkelijk afwijken; als dat zelden voorkomt, is dat een signaal om het proces te herzien.

Beschrijf verantwoordelijkheden expliciet en ga uit van meerdere betrokkenen: er is nooit één persoon verantwoordelijk voor de totale controle. Leg in een RACI- of VERI-matrix vast wie in welke fase verantwoordelijk is voor menselijke controle, wie eindverantwoordelijk is bij afwijkend systeemgedrag en wie het aanspreekpunt is voor signalen uit de uitvoering. De verantwoordelijkheid voor het proces mag niet op de individuele beoordelaar worden afgewenteld.

Zorg dat de persoon die controleert ook daadwerkelijk kan en durft in te grijpen: menselijke controle is alleen betekenisvol als de beoordelaar het systeem kan stilleggen, output naast zich neer kan leggen of een beslissing kan terugdraaien — zowel technisch als organisatorisch. Stel een escalatieprocedure in voor twijfelgevallen en zorg dat beoordelaars niet worden afgestraft als ze tegen het systeem ingaan.

Sluit aan op de AP-handvatten voor betekenisvolle menselijke tussenkomst: de Autoriteit Persoonsgegevens hanteert vier dimensies — mens, technologie en ontwerp, proces, en governance. Een controlepunt dat op één dimensie sterk is maar op een andere wegvalt, is geen betekenisvolle controle.
