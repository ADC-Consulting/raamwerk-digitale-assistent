---
id: datakwaliteit-governance
title: Datakwaliteit en governance – de assistent is zo goed als zijn bronnen
summary: >
  RAG-systemen falen vaker door slechte data-engineering dan door slechte
  taalmodellen. Het structureel betrekken van domeinexperts is de grootste
  bottleneck en tegelijk de belangrijkste succesfactor.
domains: [functionaliteit]
phases: [Pilot, Productie, PoC]
levels: [Developer/ Engineer, Projectmanager]
sources:
  - handreiking-generatieve-ai
  - dcat-ap-nl
  - algoritmeregister
  - berthub-opentk
---

Stel een witte lijst samen van uitsluitend goedgekeurde, gezaghebbende bronnen: Het overheid.nl-team werkt bijvoorbeeld met drie pragmatische bronnen: Samenwerkende Catalogi (incl. UPL), Wegwijzer.overheid.nl en ca. 2.500 Q&A's van Rijksoverheid.nl.

Bouw een golden dataset op: een verzameling vragen met verwachte antwoorden als referentie voor evaluatie. Gebruik historische data als je een bestaande tool vervangt. Waar experts ontbreken, kan AI synthetische datasets genereren, mits experts deze reviewen.

Pas op met het gebruik van websites als bron voor RAG:  het structurele gebrek aan governance en slechte staat van contentbeheer maken de kwaliteit en betrouwbaarheid van sommige websites in de praktijk onvoldoende gewaarborgd.

Organiseer structurele domeinexpert-betrokkenheid: plan validatiesessies als vast onderdeel van het ontwikkelproces.

Bewaar dataherkomst (lineage): leg vast welke documenten bij elke prompt zijn opgehaald. Gebruik metadata-standaarden zoals DCAT-AP-NL 3.0.

Ontwerp een versie- en tijdsmodel: leg expliciet vast of de assistent altijd de actuele situatie weergeeft of ook historische vragen kan beantwoorden.
