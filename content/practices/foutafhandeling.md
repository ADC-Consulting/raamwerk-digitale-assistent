---
id: foutafhandeling
title: Foutafhandeling – gecontroleerd omgaan met fouten en tijdige escalatie
summary: >
  Onduidelijke vragen, ontbrekende gegevens en technische fouten moeten
  voorspelbaar en gebruikersvriendelijk worden afgehandeld zonder dat gesprekken
  vastlopen.
domains: [gebruikerservaring]
phases: [Pilot, Productie]
levels: [Developer/ Engineer]
sources:
  - conversation-design-institute
  - microsoft-handle-errors
  - conversational-ai-design-patterns
  - uu-chatbot-repair
---

Bij foutafhandeling gaat het er om dat onduidelijke vragen, ontbrekende gegevens en technische fouten voorspelbaar en gebruikersvriendelijk worden afgehandeld, zonder dat gesprekken vastlopen. Dit vraagt om een consistente aanpak, waarbij per type fout standaardreacties en beslislogica worden ingericht, bijvoorbeeld in een centrale error-handlingmodule of via herbruikbare patronen in de conversatieflows. 

Voorbeeld typen fouten zijn: 
- **Begripsfouten:** de assistent begrijpt de vraag of intentie van de gebruiker niet goed.
- **Validatiefouten:** ingevoerde gegevens kloppen niet of zijn onvolledig (bijvoorbeeld een ongeldig nummer of een verplicht veld dat leeg is).
- **Systeemfouten:**  technische problemen, zoals een niet-beschikbare achterliggende dienst of een time‑out. 

<!-- tips -->


Standaardiseer reacties per fouttype: definieer per type fout (begripsfouten, validatiefouten, systeemfouten) een vaste set reacties en vervolgopties. Gebruik daarbij gangbare conversational-AI-patronen voor error-handling en herstel.

Gebruik vaagheidsdetectie en intent-recognition: werk met confidence-scores en drempelwaarden om te bepalen wanneer de assistent kan doorgaan, moet doorvragen, een alternatief voorstel doet of escaleert. Laat per bericht een confidence-score berekenen en definieer drie zones: boven de hoge drempel direct uitvoeren, daartussen verduidelijken, daaronder fallback of escalatie.

Stel gerichte verduidelijkingsvragen: formuleer bij onduidelijke input een concrete verduidelijkingsvraag met 2–4 keuzemogelijkheden in plaats van een generieke foutmelding. "Bedoelt u (a) huurtoeslag, (b) zorgtoeslag of (c) iets anders?" is bruikbaarder dan "Ik begreep dat niet, probeer opnieuw".

Bouw een betekenisvolle fallback naar menselijk contact: zorg voor een duidelijke overstap naar telefoon, live chat of terugbelverzoek na meerdere mislukte pogingen, niet pas wanneer de gebruiker zelf om hulp vraagt.

Monitor foutlogs structureel: analyseer foutlogs periodiek met een human-in-the-loop-aanpak of analytics-tools om foutpatronen en uitvalpunten te herkennen. 

Vertaal foutafhandeling naar UX-keuzes: error-handling is geen back-end-feature maar zichtbaar in het scherm.
