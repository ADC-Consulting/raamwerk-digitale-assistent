---
id: beveiliging
nr: 9
title: Beveiliging
short: Klassieke informatiebeveiliging plus AI-specifieke risico's (prompt injection, model poisoning, excessive agency) in gelaagde defense-in-depth-aanpak.
status: published
samenhang_blokken:
  - naam: Compliance
    omschrijving: "Beveiliging levert de technische maatregelen en bewijsstukken; Compliance vertaalt die naar juridische verplichtingen en documentatie (algoritmeregister, DPIA, meldplicht onder NIS2 en BIO2)."
  - naam: Digitale Soevereiniteit
    omschrijving: "Locatiekeuze en regie over data, modellen en logs. Veel beveiligingskeuzes (jurisdictie van provider, contractueel handhaafbaar logging-beleid, exit-strategie) werken alleen als de soevereiniteitsvraag eerst is beantwoord."
  - naam: Infrastructuur & Data
    omschrijving: "Platformkeuzes (EU-cloud, private hosting, vectorstores, identity provider) bepalen welke beveiligingsmaatregelen haalbaar zijn. Encryptie, RBAC en netwerksegmentatie moeten in het gekozen platform uitvoerbaar zijn."
  - naam: Governance
    omschrijving: "Rol- en taakverdeling (RASCI) rond security, inclusief wie verantwoordelijk is voor risicoanalyse, model-updates, red-teaming en incidentrespons. Zonder heldere eigenaar vallen security-controls tussen wal en schip."
  - naam: Cultuur & Adoptie
    omschrijving: "Security awareness voor ontwikkelaars én eindgebruikers, inclusief herkennen van AI-gestuurde phishing. Beleid alleen werkt niet — gedrag en bewustwording zijn vereist."
  - naam: Functionaliteit
    omschrijving: "Elke extra functionaliteit (tool-toegang, escalatie, multimodaliteit) vergroot het aanvalsoppervlak. Beveiliging en functionaliteit moeten in balans worden uitgewerkt."
  - naam: Antwoordkwaliteit
    omschrijving: "Hallucinaties en bias zijn primair antwoordkwaliteits-vraagstukken, maar overlappen met beveiliging waar het gaat om data-integriteit (RAG-poisoning) en systematisch misleidende antwoorden door geïnjecteerde content."
  - naam: Ethiek & Mensenrechten
    omschrijving: "Security-incidenten bij assistenten in uitkerings-, handhavings- of vergunningprocessen raken direct mensenrechten. IAMA/FRAIA en beveiliging moeten in samenhang worden gedaan."
sources:
  - owasp-llm-top10
  - owasp-agentic-top10
  - mitre-atlas
  - bio2
  - nis2-ncsc
  - handreiking-generatieve-ai
  - overheidsbreed-standpunt-genai
  - ncsc-uk-secure-ai
  - ncsc-nl-building-trust
---

Beveiliging gaat over alle maatregelen om een digitale assistent en zijn omgeving te beschermen tegen aanvallen of fouten die leiden tot het lekken van gevoelige informatie, het manipuleren van antwoorden, het uitvoeren van ongewenste acties, of schade aan burgers en organisatie. Het kernprincipe is **defense-in-depth**: meerdere lagen van bescherming, zodat één falende maatregel niet meteen tot een doorbraak leidt.

In de praktijk bestaat dit uit twee delen die je in samenhang moet aanpakken: klassieke informatiebeveiliging (toegangsbeheer, logging, netwerk- en applicatiebeveiliging die je voor elke ICT-toepassing nodig hebt) én AI-specifieke risico's die uniek zijn voor digitale assistenten:

- **Prompt injection** — Een aanvaller smokkelt verborgen instructies binnen, direct in de gebruikersprompt of indirect via een document, e-mail of webpagina die de assistent inleest, waardoor de assistent afwijkt van wat hij hoort te doen.
- **Data- en model-poisoning** — Bronnen of trainingsdata worden zo aangepast dat de assistent systematisch verkeerde of voor de aanvaller voordelige antwoorden geeft, soms via een backdoor die pas bij een specifieke trigger activeert.
- **Lekken van gevoelige informatie** — Persoonsgegevens, system prompts, API-sleutels of vertrouwelijke overheidsinformatie komen via output, logs of foutieve integraties naar buiten.
- **Ongecontroleerde autonomie (excessive agency)** — Een agentische assistent voert zelf acties uit (e-mails versturen, dossiers wijzigen) buiten zijn bedoelde scope.

Het fundament beslaat zes deelonderwerpen:

- **LLM-specifieke dreigingsmodellering en security-design** — Vooraf in kaart brengen welke aanvallen mogelijk zijn en het ontwerp daarop afstemmen.
- **Prompt-injection- en RAG-hardening (guardrails)** — Voorkomen dat verborgen instructies in input of bronnen het gedrag van de assistent kunnen sturen.
- **Identity & Access Management** — Wie mag wat aan de assistent vragen, en wat mag de assistent zelf in andere systemen doen.
- **Tool- en integratie-beveiliging** — Grip houden op de acties die de assistent zelfstandig uitvoert via gekoppelde tools en API's.
- **Data-, log- en privacybescherming** — Voorkomen dat gevoelige gegevens via prompts, antwoorden of logbestanden naar buiten komen.
- **Monitoring, detectie en incidentrespons** — Zien wat er gebeurt in productie en snel reageren als er iets misgaat.

---

Het hoofddoel van dit domein is het beschermen van systemen, data en gebruikers tegen misbruik van de assistent door defense-in-depth: gelaagde maatregelen op UI-, model-, retrieval-, tool- en infrastructuurniveau, zodat één falende maatregel niet tot een catastrofale doorbraak leidt.

Zonder een serieuze beveiligingsaanpak ontstaan drie concrete risico's: datalekken (gevoelige gegevens via output, logs of foutieve integraties), verstoring van continuïteit (supply-chain-aanvallen die hele ketens raken), en misbruik van de assistent zelf (aanvallers laten hem verkeerde of schadelijke informatie aan burgers geven). De gevolgen stapelen: reputatieschade, verlies van vertrouwen, en hoge herstelkosten.

Een bewuste security-aanpak maakt schaalbare, aantoonbaar betrouwbare inzet mogelijk, verkleint juridische en reputationele risico's en is voorwaarde voor compliance met BIO2 en de Cyberbeveiligingswet (NIS2). Security-by-design — risico's vanaf de ideeënfase in kaart brengen, vroege maatregelen inbouwen, continu monitoren — vergroot bovendien de slagingskans van de assistent zelf: projecten stranden minder vaak op een laat ontdekt lek of een blokkerende compliance-bevinding.

Naarmate assistenten proactiever, agentischer, dynamischer en autonomer worden, stijgen de risico's en neemt de beveiligingsbehoefte exponentieel toe — een reden te meer om er vroeg mee te beginnen.

- **Belangrijk voor de burger:** Bescherming van persoonsgegevens, voorkomen dat publieke dienstverlening wordt gemanipuleerd, en vertrouwen dat antwoorden en acties van de assistent niet gestuurd zijn door aanvallers.
- **Belangrijk voor de organisatie:** Operationele weerbaarheid, voldoen aan BIO2 en de Cyberbeveiligingswet (meldplicht, zorgplicht), beperken van aansprakelijkheid en bescherming van interne systemen waarop de assistent is aangesloten.
- **Belangrijk voor de overheid als geheel:** Voorbeeldfunctie in veilige inzet van generatieve AI, bescherming van democratische processen en vitale infrastructuur, en borging van publieke waarden zoals rechtsstaat, non-discriminatie en transparantie.
