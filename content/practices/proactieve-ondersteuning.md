---
id: proactieve-ondersteuning
title: Proactieve ondersteuning — relevante vervolgstappen en suggesties
summary: >
  Een proactieve assistent reageert niet alleen op vragen maar neemt zelf het
  initiatief om de gebruiker verder te helpen op basis van context en historie.
  Hij signaleert ontbrekende gegevens, stelt logische vervolgstappen voor en
  biedt extra informatie aan voordat de gebruiker erom vraagt.
domains: [functionaliteit, gebruikerservaring]
phases: [Pilot, Productie]
levels: [Operationeel, Tactisch]
sources:
  - slack-proactive-ai
  - arxiv-proactive-agents
---

Ontwerp een denk- en beslislaag: bouw een redeneerlaag die de huidige situatie en het gedrag van de gebruiker in natuurlijke taal analyseert, daaruit waarschijnlijke intenties afleidt en aannames voortdurend bijwerkt op basis van nieuw waargenomen gedrag. Koppel die redeneerlaag aan een beslislaag die intenties omzet in concrete vervolgstappen.

Bepaal expliciet waar proactiviteit mag en waar niet: leg per proces in een use-case-overzicht of conversation-design-richtlijn vast wanneer de assistent zelf iets mag voorstellen (vervolgstap, statusupdate, FAQ-suggestie) en sluit gevoelige onderwerpen uit. Een proactieve assistent in een uitkeringsdossier vraagt om strakkere kaders dan in een evenementenkalender.

Definieer duidelijke triggers: formuleer concrete gebeurtenissen die een voorstel mogen starten — herhaalde vragen, foutmeldingen, halverwege gestopt invulgedrag, sessie-inactiviteit. Implementeer deze triggers in de beslislaag in plaats van proactiviteit "altijd aan" te zetten.

Ontwerp standaardvoorstellen per trigger: koppel aan elke trigger één of meer vaste suggesties ("Wilt u nu indienen?", "Zal ik veelgestelde vragen tonen?") en welke gegevens daarvoor nodig zijn. Dit sluit aan op het idee van next-best-action-voorstellen in proactieve agents.

Voorkom irritatie: te veel proactieve suggesties voelen als drammen. Stel per gebruiker en sessie limiet aan het aantal proactieve interventies, en bouw een opt-out in voor mensen die uitsluitend reactieve hulp willen. Proactiviteit is een gunst, niet een feature die je over de gebruiker uitstort.

Meet het effect van proactieve ondersteuning: leg vast hoeveel suggesties worden gevolgd, genegeerd of afgewezen, en stuur op die metriek bij. Een proactieve suggestie die structureel wordt genegeerd kost tokens zonder waarde — schrap of pas hem aan.

Stem proactiviteit af op kanaal en moment: een suggestie tijdens een complex invulproces stoort; dezelfde suggestie aan het eind ("klaar — wil je de bevestiging per e-mail?") helpt. Plaats én timing zijn ontwerpkeuzes, geen toeval.
