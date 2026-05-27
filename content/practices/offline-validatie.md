---
id: offline-validatie
title: Leg de nadruk op offline validatie in de ontwikkelfase
summary: >
  Offline validatie betekent testen met een vaste set testvragen vóórdat echte
  gebruikers de assistent gebruiken. Het is de snelste manier om regressies te
  vangen en de basis voor latere online evaluatie in productie.
domains: [antwoordkwaliteit]
phases: [PoC, Pilot]
levels: [Operationeel]
sources: []
---

Onderscheid offline en online validatie helder: offline = testen met een vaste set vragen vóórdat de assistent in productie is. Online = meten terwijl echte gebruikers de assistent gebruiken. Beide horen erbij — maar in andere fasen en met andere doelen.

Start in PoC met een kleine offline evaluatieset: 20–50 representatieve vragen met "ideale antwoorden" zijn al voldoende om regressies te vangen. Wachten op een perfecte dataset is een excuus om niet te beginnen — een eenvoudige set is oneindig veel beter dan geen set.

Test nieuwe modelversies of prompts altijd eerst tegen de offline set voordat je naar productie gaat: dit is de minimale CI-pijplijn voor LLM-systemen. Een prompt-wijziging die in een demo werkt kan op tien andere vragen regressies veroorzaken — alleen een evaluatieset vangt dat op.

Bouw de offline set uit met edge cases en uitbreidingen: na elke gevonden bug of beleidsverandering een paar voorbeelden toevoegen. Een offline set die niet groeit, raakt achterhaald.

Schakel pas over op (aanvullende) online evaluatie als de oplossing robuust genoeg is: in PoC en pilot domineert offline; in productie blijft offline een gate en wordt online een doorlopend kompas. Beide tegelijk in PoC is overkill; alleen online in productie is onverantwoord.

Versioner de offline evaluatieset zelf: behandel de set als code — in een repository, met PR-review op nieuwe samples. Verschuiving in de evaluatieset zonder versiebeheer maakt elke historische vergelijking onmogelijk.

Houd de evaluatieset gescheiden van de trainingsset: als je modellen finetuned, mag de evaluatieset er niet in zitten. Anders test je het model op data die het al gezien heeft — een veelvoorkomende fout met gevaarlijke gevolgen.

Maak de offline-evaluatie geautomatiseerd: handmatig draaien betekent dat het overgeslagen wordt op drukke dagen. Een automatische run bij elke prompt- of model-wijziging is de enige manier om regressies betrouwbaar te vangen.
