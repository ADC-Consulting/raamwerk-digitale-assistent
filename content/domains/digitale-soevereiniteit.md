---
id: digitale-soevereiniteit
nr: 6
title: Digitale Soevereiniteit
short: Het vermogen om zelf te blijven bepalen welke data, modellen en infrastructuur de assistent gebruikt — en op elk moment te kunnen wisselen.
status: published
practices:
  - provider-agnostische-orkestratie
  - exit-zeven-lagen
  - hosting-nl-eu
samenhang_blokken:
  - naam: Infrastructuur & Data
    omschrijving: "De hardste afhankelijkheid. De keuze van rekenomgeving — Vlam.AI, ODC's, GovChat-NL, GPT-NL, Haven of een commerciële cloud — bepaalt de soevereiniteitsruimte. Open standaarden (MCP, OpenAI Chat Completions) en open-source componenten zijn de bouwstenen."
  - naam: Compliance
    omschrijving: "Soevereiniteit is juridisch verankerd in AVG (art. 48), EU AI Act, CLOUD Act, Schrems II, EU Data Act, Wpg en VIR-BI. DPIA, FRAIA, TIA en het Algoritmeregister zijn de concrete instrumenten."
  - naam: Beveiliging
    omschrijving: "Soevereine cloud zonder beveiliging is schijn; beveiliging zonder soevereiniteit is juridisch kwetsbaar. Beide moeten samen worden opgebouwd."
  - naam: Governance
    omschrijving: "SLM Rijk, CIO-beraad, CISO-beraad, IBDS en VNG Samen Organiseren bekrachtigen of verwateren soevereiniteitskeuzes. Zonder bestuurlijk mandaat zijn ze niet afdwingbaar. De Kabinetsvisie Digitale Autonomie en Soevereiniteit (december 2025) is het beleidskader."
  - naam: Ethiek & Mensenrechten
    omschrijving: "Autonomie over algoritmes is voorwaarde voor democratische controle. FRAIA en IAMA zijn de koppelingsinstrumenten tussen soevereiniteit en mensenrechtenafwegingen."
  - naam: Antwoordkwaliteit
    omschrijving: "Open-gewichten modellen (Mistral, Llama) komen dichter bij gesloten frontier-modellen en leveren via RAG op overheidsdata vaak superieure domeinrelevantie. Voor brede generieke taken kan een commercieel model tijdelijk beter presteren — een reële afweging, geen excuus."
sources:
  - visie-digitale-autonomie
  - nds
  - algoritmekader
---

Digitale soevereiniteit van een digitale assistent is het vermogen van een overheidsorganisatie om zelf te blijven bepalen welke data, modellen en infrastructuur worden gebruikt, wie daar toegang toe heeft, onder welk rechtsstelsel dat gebeurt, en of op elk moment van leverancier of technologie kan worden gewisseld. De Kabinetsvisie Digitale Autonomie en Soevereiniteit (december 2025) omschrijft het als "juridische en bestuurlijke controle over digitale infrastructuren, data en systemen", waarbij Nederland expliciet streeft naar grip op de infrastructuur die het zelf gebruikt en waarbij de meest gevoelige data onder Nederlandse of Europese wetgeving vallen.

Digitale soevereiniteit is geen monolithisch concept; binnen een digitale assistent zijn vier nauw samenhangende lagen te onderscheiden:

- **Data-soevereiniteit** — Waar staat data fysiek en wie heeft er feitelijk controle over. Dit reikt verder dan data-residency: ook als data in Amsterdam staat, kan de leverancier onder een andere jurisdictie vallen.
- **Operationele soevereiniteit** — Wie beheert de dienst, welk personeel heeft toegang (support, maintenance), welke sub-processors zitten in de keten, en welke kill-switch-risico's bestaan.
- **Technische soevereiniteit** — Open standaarden, portabiliteit, reversibility (het vermogen om terug te draaien), exit-strategie, en algoritmische controle (open-weights versus gesloten black-box modellen).
- **Juridische soevereiniteit** — Welk rechtsstelsel is van toepassing, en welke extraterritoriale wetgeving werkt mogelijk door (CLOUD Act, Schrems II).

---

Regie houden over de digitale relatie tussen overheid en samenleving is essentieel. Een digitale assistent neemt steeds vaker een centrale rol in tussen overheid en burger; als de onderliggende modellen, datastromen en infrastructuur onder controle van een buitenlandse (commerciële) partij vallen, verliest de overheid die regie. De Nederlandse Digitaliseringsstrategie (NDS) maakt digitale weerbaarheid en autonomie expliciet tot prioriteit 5, met een overheidsbrede ambitie om minder afhankelijk te zijn van een beperkt aantal leveranciers.

Zonder regie over de digitale stack loopt een overheidsorganisatie vier samenhangende risico's: **juridische blootstelling** (buitenlandse wetgeving die botst met AVG-verplichtingen, ook als data fysiek in Europa staat), **geopolitieke kwetsbaarheid** (eenzijdige afsluiting op last van een buitenlandse overheid), **commerciële vendor lock-in** (proprietary prompt-flows, vector-formaten en fine-tune-artefacten die overstappen duur maken), en **operationele continuïteit** (geopolitieke breuk, exportverbod of prijsverhoging die kritieke burgerdienstverlening kan lamleggen).

Bij goede invulling staan daar substantiële voordelen tegenover: lagere strategische afhankelijkheid, een betere onderhandelingspositie, kostenreductie op middellange termijn dankzij de cloud-switching-rechten uit de EU Data Act, sterkere compliance met AVG, AI Act, BIO en NIS2/Cyberbeveiligingswet, én een impuls voor Nederlandse en Europese AI-ecosystemen.

- **Belangrijk voor de burger:** Soevereiniteit borgt dat kritieke dienstverlening beschikbaar blijft en niet eenzijdig kan worden afgesloten, en dat persoonsgegevens onder Nederlands en Europees recht beschermd blijven in plaats van onder een buitenlandse jurisdictie.
- **Belangrijk voor de organisatie:** Regie over de eigen stack voorkomt vendor lock-in, versterkt de onderhandelingspositie en houdt overstappen betaalbaar, waardoor de organisatie minder afhankelijk wordt van een beperkt aantal leveranciers.
- **Belangrijk voor de overheid als geheel:** Een overheidsbrede aanpak (NDS, prioriteit 5) verlaagt de strategische afhankelijkheid van enkele leveranciers en geeft een impuls aan Nederlandse en Europese AI-ecosystemen.
