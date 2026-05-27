---
id: contextueel-conversatievermogen
title: Contextueel conversatievermogen — Dialogue State Tracking
summary: >
  Een goede assistent bewaart de samenhang in een gesprek door de dialoogstatus
  actief bij te houden over meerdere beurten heen. Onderwerp, identifiers,
  rol en historie worden in een gespreksgeheugen vastgelegd zodat verwijzingen
  als "die aanvraag van net" correct worden geïnterpreteerd.
domains: [functionaliteit, gebruikerservaring, antwoordkwaliteit, technische-prestaties]
phases: [Pilot, Productie]
levels: [Operationeel, Tactisch]
sources:
  - dst-multidomain
  - decagon-dst
  - stanford-dst
  - multiwoz
  - schema-guided-dialogue
---

Beheer de gesprekscontext actief: zorg dat per gesprek gegevens als onderwerp, zaak- of aanvraagnummer en rol van de gebruiker worden vastgelegd en bijgewerkt. Bij assistenten zonder login gaat het om context op sessieniveau, alleen tijdens het lopende gesprek beschikbaar.

Beperk de context die richting het model gaat: sla alle berichten technisch op, maar stuur naar het LLM alleen de laatste paar berichten plus een compacte samenvatting van het gespreksgeheugen. Over-context verhoogt latency en kosten zonder dat het de antwoordkwaliteit verbetert.

Definieer resetregels voor het geheugen: bepaal in je AVG- en bewaartermijnenbeleid hoe lang het gespreksgeheugen maximaal nodig is voor het doel van de dienstverlening, en zorg dat het daarna automatisch wordt verwijderd of geanonimiseerd. Bijvoorbeeld na afronding van een taak of na X minuten inactiviteit.

Bevestig kritieke stappen: laat de assistent bij onomkeerbare acties eerst expliciet samenvatten wat er gaat gebeuren ("Ik ga zaak 1234 sluiten, klopt dat?"). De kosten van een verkeerde aanname op een kritieke actie zijn altijd hoger dan de kosten van één bevestigingsstap.

Onderscheid contextgeheugen mét login (zaakgericht portaal, gekoppeld aan accountID) van contextgeheugen zónder login (anonieme sessie via sessieID of cookie). De technische implementatie verschilt; de UX-verwachting ("je herkent me toch nog?") moet bij beide passen.

Gebruik standaarddatasets voor ontwerp en evaluatie: referentiedatasets zoals MultiWOZ en Schema-Guided Dialogue zijn ontwikkeld om dialoogsystemen te trainen en evalueren op het bijhouden van dialoogstatus over meerdere domeinen. Ontwerp je eigen DST-evaluatie naar deze benchmarks.

Test contextverwijzingen expliciet: een test-set voor conversatievermogen hoort scenario's met verwijzingen ("die aanvraag", "de eerste optie", "dezelfde als gisteren") expliciet te dekken. Zonder dat soort tests vind je problemen pas in productie.
