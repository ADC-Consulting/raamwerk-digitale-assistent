---
id: buy-vs-build
title: Maak een bewuste buy-vs-build-afweging
summary: >
  De keuze om een digitale assistent zelf te bouwen, te kopen of te combineren
  is geen IT-keuze maar een strategische beslissing die compliance, kennis,
  soevereiniteit en kosten op de lange termijn bepaalt. Maak de afweging
  expliciet en op basis van capaciteiten, niet ad hoc per offerte.
domains: [compliance, kennis-capaciteit, digitale-soevereiniteit, governance]
phases: [PoC, Pilot, Productie]
levels: [Bestuurlijk, Tactisch]
sources:
  - algoritmekader
  - visie-digitale-autonomie
  - vng-ai-governance
---

Maak de afweging expliciet en op basis van strategische capaciteiten, niet op basis van losse offertes: bepaal welke onderdelen van de digitale assistent strategisch waardevol zijn (eigen merk en gebruikersrelatie, gevoelige data, domeinexpertise, controle over kwaliteit) en welke commodity zijn (rekeninfrastructuur, observability, basis-tooling). Strategisch = build of meebouwen in coalitie; commodity = buy, mits exit-baar.

Houd rekening met de drie smaken: buy (kant-en-klare dienst van een leverancier — snelste startpunt, hoogste lock-in-risico), build (eigen ontwikkeling — hoogste autonomie, vereist eigen capaciteit en doorlooptijd) en co-create (samenwerken met andere overheden of in open-source, zoals GovChat-NL, Gem of WetWijzer — middenweg met gedeelde kosten en gedeeld eigenaarschap). Maak per laag (model, RAG, UI, observability) een aparte keuze; één antwoord voor de hele stack is bijna altijd verkeerd.

Bouw de afweging op rond zeven vragen: welke data raakt het, welke jurisdictie geldt voor leverancier én sub-processors, welke compliance-eisen gelden (DPIA, IAMA, AVG, AI Act-classificatie), welke exit-mogelijkheden zijn er, welke kennis hebben we intern of moeten we opbouwen, wat is de Total Cost of Ownership over vijf jaar (inclusief migratiekosten en menselijk toezicht), en past de leverancier in een soevereiniteits-strategie?

Borg compliance vooraf in de buy-keuze: bij een buy-traject is de DPIA, IAMA en risicobeoordeling onderdeel van de aanbesteding — niet iets dat je achteraf op een gekozen product probeert te plakken. Vraag leveranciers vooraf om documentatie waarmee jij je IAMA- en DPIA-vragen kunt beantwoorden, anders koop je een black box met aansprakelijkheid.

Erken de capaciteitsconsequentie van build: zelf bouwen vraagt niet alleen ontwikkelaars maar doorlopend onderhoud, security-respons, model-evaluatie en governance. Een succesvolle PoC zonder een capaciteitsplan voor productie eindigt vaak in stilstand of in een geforceerde buy-keuze met haast — waarbij precies de soevereiniteits- en compliance-eisen onder druk komen die je oorspronkelijk wilde borgen.

Werk waar mogelijk in coalitie: co-create-trajecten (GovChat-NL voor gemeenten, Gem voor ICTU/VNG, GPT-NL voor de Rijksoverheid, het Innovatiebudget-2025-project Amsterdam/Heerlen) verlagen de bouwkosten per organisatie en bouwen tegelijk gezamenlijke capaciteit op. Het VNG AI-governancekader biedt rolverdeling en kenniskaarten die direct toepasbaar zijn.

Documenteer de afweging zodat hij toetsbaar is: leg vast welke onderdelen zijn ingekocht, welke zelf gebouwd, welke in coalitie, en op welke gronden. Zonder die documentatie is een latere heroverweging onmogelijk en verlies je het institutionele geheugen bij personele wissels.

Plan een heroverweging: een buy-vs-build-keuze is niet voor eens en altijd. Soevereiniteits-volwassenheid groeit (VLAM.AI, GPT-NL, GovChat-NL worden volwassener); een leverancier kan failliet gaan of van strategie wijzigen; nieuwe regelgeving kan de risico-kant van een buy-keuze verschuiven. Plan jaarlijks een korte heroverweging per laag — niet om altijd te wisselen, maar om bewust te blijven.
