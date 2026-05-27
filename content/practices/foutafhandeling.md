---
id: foutafhandeling
title: Foutafhandeling — gecontroleerd omgaan met fouten en tijdige escalatie
summary: >
  Onduidelijke vragen, ontbrekende gegevens en technische fouten moeten
  voorspelbaar en gebruikersvriendelijk worden afgehandeld zonder dat
  gesprekken vastlopen. Standaardiseer reacties per fouttype, gebruik
  confidence-scores en bouw een betekenisvolle escalatie naar mensen.
domains: [functionaliteit, antwoordkwaliteit, gebruikerservaring, technische-prestaties]
phases: [Pilot, Productie]
levels: [Operationeel]
sources:
  - conversation-design-institute
  - microsoft-handle-errors
  - conversational-ai-design-patterns
  - stumble-tool
  - uu-chatbot-repair
---

Standaardiseer reacties per fouttype: definieer per type fout (begripsfouten, validatiefouten, systeemfouten) een vaste set reacties en vervolgopties. Gebruik daarbij gangbare conversational-AI-patronen voor error-handling en herstel — eigen patronen uitvinden levert geen voordeel op.

Gebruik vaagheidsdetectie en intent-recognition: werk met confidence-scores en drempelwaarden om te bepalen wanneer de assistent kan doorgaan, moet doorvragen, een alternatief voorstel doet of escaleert. Laat per bericht een confidence-score berekenen en definieer drie zones: boven de hoge drempel direct uitvoeren, daartussen verduidelijken, daaronder fallback of escalatie.

Stel gerichte verduidelijkingsvragen: formuleer bij onduidelijke input een concrete verduidelijkingsvraag met 2–4 keuzemogelijkheden in plaats van een generieke foutmelding. "Bedoelt u (a) huurtoeslag, (b) zorgtoeslag of (c) iets anders?" is bruikbaarder dan "Ik begreep dat niet, probeer opnieuw".

Weeg controle-agents af tegen guardrail-regels: bij twijfel of een extra controle-agent waarde toevoegt, vergelijk met een simpele guardrail-regel. Een controle-agent kost tokens en latency; bij laag risico volstaat een deterministische regel. Bij hoog risico (rechten, betalingen) is de extra controle terecht.

Bouw een betekenisvolle fallback naar menselijk contact: zorg voor een duidelijke overstap naar telefoon, live chat of terugbelverzoek na meerdere mislukte pogingen — niet pas wanneer de gebruiker zelf om hulp vraagt. Een fallback die de gebruiker eerst moet opeisen, faalt voor wie het meest hulp nodig heeft.

Monitor foutlogs structureel: analyseer foutlogs periodiek met een human-in-the-loop-aanpak of analytics-tools om foutpatronen en uitvalpunten te herkennen. Tooling zoals Stumble geeft inzicht in conversational-AI-prestaties — maar laat de analyse-conclusies door mensen trekken.

Test reparatiestrategieën expliciet: onderzoek over chatbot-interacties (Universiteit Utrecht) laat zien dat de juiste reparatiestrategie het verschil maakt tussen een teruggewonnen klant en een afhaakmoment. Test verschillende reparatiestrategieën op je golden dataset en kies degenen die in jouw context werken.

Vertaal foutafhandeling naar UX-keuzes: error-handling is geen back-end-feature maar zichtbaar in het scherm. Onderzoek Microsoft "Handle Errors Effectively" voor concrete patronen, en pas die toe op je eigen interface — niet alleen op de back-end.
