---
id: evaluatieraamwerk-3-niveaus
title: Richt een evaluatieraamwerk in langs drie dimensies
summary: >
  Een goede evaluatiestrategie houdt rekening met drie dimensies tegelijk —
  organisatie (welke rol heeft welk signaal nodig), projectfase (PoC, pilot,
  productie) en AI-use-case (elke assistent heeft eigen succescriteria). Maak
  alle drie expliciet voordat je metrics kiest.
domains: [antwoordkwaliteit, governance]
phases: [PoC, Pilot, Productie]
levels: [Tactisch, Bestuurlijk]
sources:
  - tno-ai-evaluatie
---

Maak de drie dimensies expliciet voor je je evaluatie inricht: organisatie (engineers, domeinexperts, managers), projectfase (PoC → pilot → productie) en use-case (statische FAQ versus dynamische agentische assistent). Zonder die expliciete keuze meet je ofwel te weinig (en schaal je blind op) ofwel te veel (en verzand je in dashboards die niemand gebruikt).

Plan evaluatie in als doorlopend werk, niet als eenmalige actie: naarmate de assistent groeit van PoC naar productie wordt evalueren meer werk. Veel teams onderschatten dit, plannen er geen tijd of geld voor, en raken hun grip kwijt. Reserveer uren in sprints, reserveer budget voor evaluatie-tooling, en wijs eigenaren aan voor de uitvoering.

Maak één herbruikbare evaluatie-backbone: bouw één gedeelde set evaluatie-bouwstenen (datasets, judges, dashboards, monitoring) die je hergebruikt voor meerdere AI-use-cases. Per assistent vanaf nul beginnen verspilt tijd en levert onvergelijkbare metingen op.

Stem evaluatie-zwaarte af op de fase: in PoC volstaat een kleine offline set; in productie verschuift het zwaartepunt naar online metingen en automatische monitoring. Dezelfde evaluatie in elke fase is óf te zwaar voor PoC óf te licht voor productie.

Documenteer per cel in de drie-dimensionale matrix welk signaal welke rol nodig heeft, in welke fase, voor welk type assistent. Dat document is je richtsnoer voor "is deze evaluatie compleet?" — en de basis voor latere uitbreiding.

Sluit aan bij TNO's vijf eigenschappen van een robuuste evaluatiekit: TNO publiceerde een overzicht van obstakels bij het evalueren van Gen-AI en welke vijf eigenschappen een evaluatiekit moet dekken. Begin daar, niet bij een willekeurig vendor-dashboard.

Maak governance van het raamwerk expliciet: wie eindigt welke evaluatie, wie keurt drempelwaarden goed, hoe wordt het raamwerk zelf onderhouden? Een evaluatieraamwerk zonder eigenaar verandert binnen een jaar in een verzameling oude dashboards.
