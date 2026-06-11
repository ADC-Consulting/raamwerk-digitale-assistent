---
id: infrastructuur-keuze
title: Bewuste infrastructuur- en hostingkeuze – soeverein waar het moet, flexibel waar het kan
summary: >
  De keuze voor AI-infrastructuur en hosting raakt aan digitale soevereiniteit,
  compliance en continuïteit. Classificeer werklasten op
  gevoeligheid en kies per segment de passende infrastructuur. Documenteer daarbij
  de jurisdictie van leverancier en sub-processors (niet alleen de server-locatie)
  en borg operationele soevereiniteit contractueel.
domains: [infrastructuur-data, digitale-soevereiniteit]
good_practise: [digitale-autonomie-routekaart, exit-zeven-lagen]
phases: [Pilot, Productie]
levels: [Bestuur/ beleidsmaker]
sources:
  - visie-digitale-autonomie
  - vlam-ai
  - haven
  - gpt-nl
  - standaard-platform
  - bbn2-gemeenten
  - surf-snellius
  - dutch-cloud-community
  - greenpt
---


Kies open-source modellen conform 'Open, tenzij…'-beleid: geef de voorkeur aan open-weight modellen waar dat kan. Meerdere Nederlandse bouwteams doen dit al. Het overheid.nl-team werkt met Mistral, en WetWijzer Bedrijven is volledig open-source gerealiseerd.

Classificeer werklasten en data op gevoeligheid en kies per segment de passende infrastructuur: vertrouwelijke werklasten horen soeverein of on-premise (bijvoorbeeld via VLAM.AI), gevoelige data in een Europese soevereine cloud of bij een EU-gehoste modelaanbieder (zoals GreenPT) en openbare informatie kan op publieke cloud met EU-databoundary. Synthetische demo-data op een commerciële API kan prima, maar BBN2+-werklasten en persoonsgegevens horen op soevereine infrastructuur. Een classificatie-matrix die aan infrastructuur- en hosting-keuzes is gekoppeld, voorkomt sluipende soevereiniteits-erosie.

Documenteer de vestigingsplaats van de leverancier en alle sub-processors, niet alleen de server-locatie, en vermijd extraterritoriale wetgeving waar het risicovol is: de toepasselijke jurisdictie volgt niet de fysieke server, maar de controlerende entiteit.

Maak hosting-locatie onderdeel van je inkoopvoorwaarden en aanbesteding: stel concrete eisen over datacenter-locatie en sub-processor-transparantie. Achteraf onderhandel je vanuit een veel zwakkere positie; vooraf is het standaard.

Evalueer VLAM.AI voor een kant-en-klare soevereine stack: SSC-ICT biedt vlam-chat, vlam-search en API-toegang, met een architectuur die snelle opschaling naar publieke cloud toelaat.
Overweeg Haven/Haven+ voor gemeenten: deze Kubernetes-standaard van VNG/Common Ground biedt observability, security en networking, is BIO- en NIS2-compliant en maakt applicaties onafhankelijk van één IT-infrastructuur.
