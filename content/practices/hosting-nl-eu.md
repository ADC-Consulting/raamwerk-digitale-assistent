---
id: hosting-nl-eu
title: Host binnen Nederland (of Europa) wanneer de use case dat rechtvaardigt
summary: >
  Voor kritieke dienstverlening moet de overheid kunnen terugvallen op
  infrastructuur waar zij bestuurlijke en juridische grip op heeft. Documenteer
  jurisdictie van leverancier én sub-processors, niet alleen server-locatie, en
  borg operationele soevereiniteit contractueel.
domains: [digitale-soevereiniteit, infrastructuur-data, compliance, governance]
phases: [Pilot, Productie]
levels: [Bestuurlijk, Tactisch]
sources:
  - bbn2-gemeenten
  - surf-snellius
  - dutch-cloud-community
  - visie-digitale-autonomie
---

Selecteer bij commerciële hosting Nederlandse aanbieders onder Nederlands recht: partijen aangesloten bij de Dutch Cloud Community zijn een vindbare lijst om mee te beginnen. De rechtsvorm van de leverancier is belangrijker dan de fysieke serverlocatie.

Documenteer expliciet de vestigingsplaats van de leverancier en alle sub-processors, niet alleen de server-locatie: de jurisdictie die van toepassing is volgt niet de fysieke server maar de controlerende entiteit. Een server in Amsterdam beheerd door een Amerikaanse moederonderneming valt onder Amerikaans recht.

Maak hosting-locatie onderdeel van je inkoopvoorwaarden en aanbesteding, met concrete eisen over datacenter-locatie en sub-processor-transparantie. Achteraf is dit onderhandelen vanuit een veel zwakkere positie; vóóraf is het standaard.

Kies voor de Overheidsdatacenters (ODC's) bij BBN2+ en Wpg-data: ze vallen onder direct Rijksbeheer en staan fysiek in Nederland (ODC-Noord in Groningen, ODC Haaglanden, JenV Trusted Cloud). Dit is de hoogste soevereiniteits-klasse die operationeel beschikbaar is en sluit aan op de Maatregelenset BBN2 voor gemeenten.

Overweeg SURF Snellius voor het zelf hosten van open-weights modellen binnen Nederlandse infrastructuur: voor onderzoeks- en pilot-doeleinden levert SURF een soevereine GPU-omgeving die je niet zelf hoeft op te zetten.

Borg operationele soevereiniteit contractueel: leg in SLA en DPA vast welk personeel toegang heeft tot data en modellen, welke sub-processors in de keten zitten, en welke kill-switch- of opschortingsclausules de leverancier kan inroepen. Documenteer dit per dienst en herzie het jaarlijks — leveranciers herstructureren, sub-processors wisselen.

Stem hosting-keuzes af op dataclassificatie: synthetische demo-data op een commerciële API kan prima, BBN2+ of persoonsgegevens horen op soevereine infrastructuur. Een dataclassificatie-matrix die aan hosting-keuzes is gekoppeld voorkomt dat operationele beslissingen sluipenderwijs een soevereiniteits-erosie veroorzaken.
