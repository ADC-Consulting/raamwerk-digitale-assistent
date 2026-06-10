---
id: infrastructuur-keuze
title: Bewuste infrastructuur- en hostingkeuze – soeverein waar het moet, flexibel waar het kan
summary: >
  De keuze voor AI-infrastructuur en hosting raakt aan digitale soevereiniteit,
  compliance en continuïteit. Het principe 'open waar kan, beschermen waar moet'
  vertaalt zich naar een risico-gesegmenteerde aanpak: classificeer werklasten op
  gevoeligheid en kies per segment de passende infrastructuur. Documenteer daarbij
  de jurisdictie van leverancier en sub-processors (niet alleen de server-locatie)
  en borg operationele soevereiniteit contractueel.
domains: [infrastructuur-data, digitale-soevereiniteit]
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

Documenteer de vestigingsplaats van de leverancier en alle sub-processors, niet alleen de server-locatie, en vermijd extraterritoriale wetgeving waar het risicovol is: de toepasselijke jurisdictie volgt niet de fysieke server, maar de controlerende entiteit. Een server in Amsterdam beheerd door een Amerikaanse moederonderneming valt onder Amerikaans recht. Voor risicovolle werklasten (BBN2+ en persoonsgegevens) betekent dit: vermijd platforms die onder de CLOUD Act vallen, inclusief grote hyperscalers zoals Azure, ook wanneer zij een EU-databoundary aanbieden, omdat die de extraterritoriale toegang niet wegneemt. Geef de voorkeur aan EU-gehoste, soevereine modellen en aan Nederlandse aanbieders onder Nederlands recht (de Dutch Cloud Community is een vindbare lijst om mee te beginnen). Houd ook de frontend lokaal of open (zie de praktijk over provider-agnostische orkestratie); een gesloten chat-UI is een verstopt lock-in- en afhankelijkheidspunt.

Neem exit-strategieën op als harde eis bij iedere infrastructuurkeuze: digitale soevereiniteit draait om meer dan waar data staat. Het gaat om zeggenschap en reële exit-mogelijkheden, en dat geldt vooral bij niet-open-source componenten.

Borg operationele soevereiniteit contractueel: leg in SLA en DPA vast welk personeel toegang heeft tot data en modellen, welke sub-processors in de keten zitten en welke kill-switch- of opschortingsclausules de leverancier kan inroepen. Documenteer dit per dienst en herzie het jaarlijks. Leveranciers herstructureren en sub-processors wisselen.

Maak hosting-locatie onderdeel van je inkoopvoorwaarden en aanbesteding: stel concrete eisen over datacenter-locatie en sub-processor-transparantie. Achteraf onderhandel je vanuit een veel zwakkere positie; vooraf is het standaard.

Hanteer een bewuste inkoopstrategie voor rekenkracht: sluit aan bij overheidsbrede inkoopkanalen zoals MaaS/1 STIP voor strategische inkoop van GPU-capaciteit.

Kies voor de Overheidsdatacenters (ODC's) bij BBN2+ en Wpg-data: ze vallen onder direct Rijksbeheer en staan fysiek in Nederland (ODC-Noord in Groningen, ODC Haaglanden, JenV Trusted Cloud). Dit is de hoogste operationeel beschikbare soevereiniteits-klasse en sluit aan op de Maatregelenset BBN2 voor gemeenten.

Evalueer VLAM.AI voor een kant-en-klare soevereine stack: SSC-ICT biedt vlam-chat, vlam-search en API-toegang, met een architectuur die snelle opschaling naar publieke cloud toelaat.

Overweeg Haven/Haven+ voor gemeenten: deze Kubernetes-standaard van VNG/Common Ground biedt observability, security en networking, is BIO- en NIS2-compliant en maakt applicaties onafhankelijk van één IT-infrastructuur.

Overweeg SURF Snellius voor het zelf hosten van open-weight modellen binnen Nederlandse infrastructuur: voor onderzoeks- en pilot-doeleinden levert SURF een soevereine GPU-omgeving die je niet zelf hoeft op te zetten.

Beveilig de verbinding zodra je zelf of bij een EU-partij host: door modellen en data zelf (of bij een EU-aanbieder) te hosten voorkom je dat gegevens weglekken naar partijen als OpenAI of Microsoft. Het resterende datalekrisico verschuift dan van het modelplatform naar de verbinding, het netwerk- en transportpad naar het model-endpoint. Dwing daarom versleuteld transport af op elke app-naar-model-call (mTLS of TLS), segmenteer en monitor die verbinding en sta geen onversleuteld (plaintext) verkeer toe. De outbound-gateway uit de praktijk over Identity & Access Management voor assistenten is hiervoor het natuurlijke handhavingspunt; sluit aan op de log-encryptie uit de data- en logbescherming.