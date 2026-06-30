---
id: gebruikerservaring
nr: 3
title: Mens-assistent interactie
short: "Hoe mens en digitale assistent samenwerken om overzicht, richting en voortgang te creëren — bewust ontworpen rond onzekerheid, regie en herstel."
status: published
samenhang_blokken:
  - naam: Functionaliteit
    omschrijving: "Hoe functionaliteit wordt aangeboden (streaming, foutafhandeling, proactieve ondersteuning, personalisatie) bepaalt de ervaren gebruiksvriendelijkheid en het vertrouwen. Mens-assistent interactie is de laag waarin functionele capaciteiten begrijpelijk en bestuurbaar worden voor de gebruiker."
  - naam: Antwoordkwaliteit / Kwaliteit van de output
    omschrijving: "Confidence-indicatoren, disclaimers, brongebruik en de mogelijkheid om naar een mens over te schakelen bepalen hoe de assistent ervaren wordt — kwaliteit is alleen merkbaar als de interactie hem zichtbaar maakt. Omgekeerd is gebruikersfeedback uit de interactie een directe bron voor kwaliteitsmeting."
  - naam: Ethiek & Mensenrechten
    omschrijving: "Kwetsbare gebruikersgroepen die tegen toegankelijkheidsdrempels aanlopen, zijn vaak ook de groepen die door de assistent benadeeld worden. Inclusief en toegankelijk interactie-ontwerp is daarmee een grondrechtelijke voorwaarde, niet alleen een gebruiksvriendelijkheidskwestie."
  - naam: Technische Prestaties
    omschrijving: "Ervaren kwaliteit (snelheid, response streaming, beschikbaarheid) wordt rechtstreeks bepaald door technische prestaties; een trage of instabiele assistent voelt slecht, ongeacht de inhoud. De interactie maakt zichtbaar of wachttijd en latency acceptabel blijven."
  - naam: Compliance
    omschrijving: "Toestemming, transparantie over geautomatiseerde verwerking en de mogelijkheid van menselijke tussenkomst zijn juridische eisen (AVG, AI-verordening) die in de interactie vorm krijgen. Wat de wet voorschrijft, moet de gebruiker in het gesprek terugzien."
  - naam: Governance
    omschrijving: "Mandaat, eigenaarschap en verantwoordelijkheid bepalen wat de assistent in de interactie wel en niet mag voorbereiden of uitvoeren, en wanneer overdracht naar een mens verplicht is. Governance levert de regels, de interactie maakt ze voelbaar en toetsbaar."
sources:
  - microsoft-hax-toolkit
  - nng-designing-ai
  - govuk-service-manual-design
  - service-design-tools-ai
  - ai-transparency-ux
  - conversation-design-institute
---

Mens-assistent interactie gaat over de manier waarop mensen en een digitale assistent samenwerken om overzicht, richting of voortgang te creëren. Die samenwerking bestaat uit meer dan een gesprek. De assistent interpreteert de vraag van de gebruiker, brengt relevante context in kaart, stelt vervolgstappen voor, gebruikt mogelijk externe bronnen of systemen, en kan, afhankelijk van zijn mandaat, ook acties voorbereiden of uitvoeren.

Bij traditionele interfaces ligt de interactie grotendeels vast: de gebruiker navigeert door vooraf ontworpen schermen, formulieren en menu's. Bij digitale assistenten is de interactie dynamischer: de assistent vormt een handelende laag tussen gebruiker en dienstverlening — hij helpt informatie te vinden, intentie te verduidelijken, keuzes te structureren en soms taken uit te voeren.

Daarmee ontstaan nieuwe ontwerpvragen. Een digitale assistent werkt op basis van interpretatie, waarschijnlijkheid en context. Dat vraagt om bewust ontwerp rond onzekerheid, autonomie, toestemming, herstel, toezicht, geheugen, brongebruik en verantwoordelijkheid. De gebruiker moet begrijpen wat de assistent doet, waarop antwoorden zijn gebaseerd, wanneer controle nodig is en hoe fouten kunnen worden hersteld.

Het domein beslaat negen samenhangende deelthema's:

- **Rolkeuze** — Welke rol vervult de assistent (informeren, begeleiden, voorbereiden, uitvoeren) en hoe maakt hij die rol kenbaar aan de gebruiker.
- **Verwachtingen en grenzen** — Hoe de assistent duidelijk maakt wat hij wel en niet kan, zodat de gebruiker zijn vertrouwen passend kan ijken.
- **Menselijke regie en overdracht** — Hoe de gebruiker bij kan sturen en hoe de assistent tijdig en soepel overdraagt aan een mens wanneer dat nodig is.
- **Toetsbaarheid** — Hoe de gebruiker kan nagaan waarop een antwoord is gebaseerd, hoe zeker de assistent is en welke bronnen of stappen zijn gebruikt.
- **Begeleiding en herstel** — Hoe de assistent omgaat met onduidelijkheid, fouten en vastlopers, en de gebruiker helpt het gesprek weer op de rails te krijgen.
- **Toon en persoonlijkheid** — Hoe de assistent communiceert, passend bij de publieke context, de taak en de doelgroep.
- **Inclusie en toegankelijkheid** — Hoe de interactie werkt voor mensen met uiteenlopende vaardigheden, talen, hulpmiddelen en omstandigheden.
- **Geheugen** — Wat de assistent onthoudt binnen en tussen gesprekken, en hoe dat transparant en bestuurbaar blijft voor de gebruiker.
- **Feedback** — Hoe de gebruiker terugkoppeling kan geven en hoe die terugkoppeling de assistent en de dienstverlening verbetert.

Samen bepalen deze thema's of de samenwerking tussen mens en assistent begrijpelijk, bestuurbaar en betrouwbaar verloopt.

---

Het hoofddoel van dit domein is zorgen dat een digitale assistent gebruikers op een passende manier ondersteunt. De assistent is niet alleen een extra kanaal naast balie, telefoon en website, maar kan werken als orchestratielaag tussen gebruiker, informatie, processen en systemen. Dat maakt publieke dienstverlening meer in samenhang mogelijk, zonder dat bestaande kanalen, bronnen of verantwoordelijkheden verdwijnen.

Dat vraagt om bewuste ontwerpkeuzes op twee niveaus. Op interactieniveau: begrijpt de gebruiker wat de assistent kan, waarop antwoorden zijn gebaseerd, welke onzekerheden er zijn en hoe hij kan bijsturen? En op dienstverleningsniveau: hoe verbindt de assistent informatie, stappen, overdracht en feedback over organisaties of systemen heen, terwijl eigenaarschap, mandaat en verantwoordelijkheid helder blijven?

Feedback verdient daarbij bijzondere aandacht. Terugkoppeling uit de interactie is niet alleen input om het model te verbeteren, maar ook een signaal voor de inhoud, de processen, het beleid en de dienstverlening eromheen. Een assistent die structureel vastloopt op dezelfde vraag legt vaak een dieperliggend probleem bloot dat verder reikt dan het gesprek zelf.

- **Belangrijk voor de burger:** Burgers, ondernemers en professionals krijgen meer houvast doordat de assistent (publieke) informatie, stappen en verantwoordelijkheden in samenhang kan uitleggen; ze hoeven minder zelf te zoeken tussen losse kanalen en bronnen.
- **Belangrijk voor de organisatie:** Kan de assistent gebruiken als beheersbare orchestratielaag voor uitleg, brongebruik, overdracht en feedback — meer consistentie en hergebruik, zonder eigenaarschap over eigen bronnen, processen en besluiten te verliezen.
- **Belangrijk voor de overheid als geheel:** Kan publieke dienstverlening over organisatiegrenzen heen begrijpelijker en toegankelijker maken, zonder alles centraal te organiseren; voorwaarde is dat brongebruik, mandaat, toezicht, overdracht en menselijke verantwoordelijkheid expliciet zijn ingericht.
