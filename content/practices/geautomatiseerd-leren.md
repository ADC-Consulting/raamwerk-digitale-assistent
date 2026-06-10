---
id: geautomatiseerd-leren
title: Geautomatiseerd leren – Continu verbeteren op basis van gebruik en feedback
summary: >
  Bij geautomatiseerd leren gebruikt de digitale assistent gegevens uit echte
  gesprekken om modellen en regels systematisch te verbeteren. Een vast
  verbeterproces met duidelijke signalen, human-in-the-loop voor gevoelige
  gevallen en centrale logging borgt kwaliteit en compliance.
domains: [antwoordkwaliteit, gebruikerservaring]
phases: [PoC, Pilot, Productie]
levels: [Developer/ Engineer]
sources:
  - ibm-rlhf
  - azure-application-insights
  - matomo
  - label-studio
---

Bij geautomatiseerd leren gebruikt de digitale assistent gegevens uit echte gesprekken om modellen en regels systematisch te verbeteren. De assistent verwerkt continu gebruiksdata en kwaliteitsmetingen in een vast verbeterproces. Daarin is duidelijk welke signalen meetellen en hoe ze doorwerken in modelupdates. Gevoelige of complexe onderwerpen krijgen daarbij extra aandacht via een human-in-the-loop-stap, zodat fouten in kritieke domeinen zoveel mogelijk worden voorkomen. Alle stappen in dit leerproces worden centraal vastgelegd, zodat verbeteringen herleidbaar zijn en voldoen aan de eisen rond governance, audits en AVG.

<!-- tips -->

Verzamel directe gebruikersfeedback: Vraag na elk antwoord om eenvoudige feedback (bijvoorbeeld een duimpje omhoog/omlaag) om gerichte stuurinformatie te verzamelen. Reinforcement Learning from Human Feedback (RLHF) kan dienen als kader om deze signalen systematisch te benutten voor modelverbetering.

Laat het feedbackmechanisme meegroeien met de volwassenheid van de assistent: start in de PoC en pilot fase met usertests en informele feedback van gebruikers, en bouw in productie een gestructureerde feedbackfunctie in het dashboard, zodat terugkoppeling onderdeel wordt van het dagelijkse proces.

Weeg expliciete feedback zwaarder: Geef expliciete feedback meer gewicht dan impliciete signalen (afgebroken chats, opnieuw gestelde vragen). Gebruik hiervoor bijvoorbeeld een analyticsplatform zoals Azure Monitor/Application Insights of het open source Matomo om expliciete en impliciete signalen te combineren.

Rol modelversies gefaseerd uit: Rol nieuwe modelversies eerst uit naar een klein deel van het verkeer (bijvoorbeeld 5%) en vergelijk de resultaten met de bestaande versie, voordat je de uitrol stapsgewijs vergroot en uiteindelijk volledig overschakelt.
