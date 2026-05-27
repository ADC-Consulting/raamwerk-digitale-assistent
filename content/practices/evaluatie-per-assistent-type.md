---
id: evaluatie-per-assistent-type
title: Kies evaluatiecriteria passend bij het type assistent
summary: >
  De definitie van een assistent kent vier assen — initiatie (reactief →
  proactief), taakuitvoering (enkelvoudig → agentisch), informatie-toegang
  (statisch → dynamisch), executie-autonomie (mens-gestuurd → autonoom). Hoe
  meer naar rechts, hoe zwaarder de nadruk op compliance, consistentie, bias
  en technische robuustheid.
domains: [antwoordkwaliteit, functionaliteit, ethiek-mensenrechten, governance]
phases: [PoC, Pilot, Productie]
levels: [Tactisch, Bestuurlijk]
sources:
  - langwatch
---

Map elke nieuwe assistent op de vier kenmerkenassen voordat je metrics kiest: een statische FAQ-bot vraagt om andere indicatoren dan een dynamische actie-uitvoerende agent. Zonder die mapping kies je generieke metrics die niet sturend zijn.

Onderscheid enkelvoudige van agentische assistenten: een enkelvoudige assistent (één vraag, één antwoord, elke vraag als nieuw) is fundamenteel anders te evalueren dan een agentische assistent (doorlopend gesprek met geheugen). Bij agentisch evalueer je niet alleen output maar ook tussenstappen, tool-calls, geheugenstate en coherentie over meerdere beurten.

Voor agentische systemen: evalueer per agent én end-to-end. Gebruik simulaties (bijvoorbeeld via LangWatch) om scenario's te testen vóór productie. End-to-end alleen verbergt fouten in individuele agents; per agent alleen mist de samenwerkingsdynamiek.

Bij hogere autonomie: voeg expliciete guardrail-metrics toe. Meet hoe vaak guardrails triggeren, hoe vaak ze terecht of onterecht triggeren, en of de agent binnen zijn mandaat blijft. Een autonome agent zonder guardrail-metrics is een autonome agent die je niet kunt sturen.

Combineer kwaliteits-metrics met use-case-specifieke business-metrics: een FAQ-bot moet hoge accuracy halen op een gesloten set; een beslisondersteunend systeem moet bijdragen aan goede beslissingen door medewerkers. Dezelfde abstracte "accuracy" zegt verschillende dingen — wees specifiek.

Pas evaluatie aan op gebruikersgroep: een assistent voor ambtenaren met domeinexpertise mag andere fouten maken dan een assistent voor burgers. Test daarom expliciet met representatieve gebruikersgroepen, niet alleen met je projectteam.

Verschuif evaluatie-zwaartepunten over de levenscyclus: in vroege fasen werkt de assistent in een beperkte scope met enkelvoudige interacties — eenvoudige evaluatie. Bij opschaling neemt complexiteit toe (multi-turn, agentisch, dynamische bronnen) en moeten evaluatie-criteria mee groeien. Een evaluatiestrategie die niet evolueert, verandert in achterstand.

Documenteer de assistent-typering in het algoritmeregister: de mapping op de vier assen is óók verantwoordingsinformatie. Een dynamische, agentische, autonome assistent moet daar als zodanig vermeld staan — niet als generieke "chatbot".
