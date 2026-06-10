---
id: data-logbescherming
title: Data- en logbescherming (privacy-by-design)
summary: >
  LLM's kunnen gevoelige gegevens lekken via memorisatie, logs, telemetrie of
  foutieve integraties. Dataminimalisatie, PII-filtering, contractuele borging en
  gepseudonimiseerde logs zijn de kernmaatregelen.
domains: [beveiliging]
phases: [Pilot, Productie]
levels: [Developer/ Engineer]
sources:
  - owasp-sensitive-info
  - nist-ai-600-1
  - microsoft-presidio
  - cip-prisa
  - handreiking-generatieve-ai
---

Pas dataminimalisatie toe in prompts en context: stuur alleen de strikt noodzakelijke gegevens door naar het model. Wat niet verstuurd wordt, kan ook niet lekken. 

Filter of pseudonimiseer gebruikersinput voor verzending naar het model: niet alles wat een gebruiker typt hoeft naar de LLM. Detecteer en redigeer waar mogelijk PII, BSN's, wachtwoorden, telefoonnummers en andere gevoelige patronen voordat de prompt het systeem verlaat. Microsoft Presidio (open-source, self-hostable) detecteert en anonimiseert PII op basis van NER, regex en checksums.

Beperk de context die het systeem zelf toevoegt: bovenop de gebruikersprompt voegt een assistent vaak extra data toe (RAG-passages, sessie- en rolgegevens van de ingelogde gebruiker, dossierhistorie, organisatie-metadata). Stuur per call alleen de context mee die voor deze taak nodig is. Over-context is een bron van veel datalekken.

Stel duidelijke gebruiksregels op voor prompt-invoer en communiceer ook naar eindgebruikers welke gegevens niet in de assistent thuishoren (vertrouwelijke documenten, inloggegevens, gegevens van derden zonder grondslag). 

Borg contractueel en technisch dat prompts en outputs niet voor modeltraining worden hergebruikt bij externe LLM-providers: dit is een expliciete eis uit de Overheidsbrede handreiking generatieve AI. 

Pseudonimiseer of redacteer persoonsgegevens vóór logging en stel een retentiebeleid vast: logs bevatten vaak gevoelige prompts en antwoorden en zijn zelf een aanvalsdoelwit. Logs moeten minimaal dezelfde beveiligingsgraad hebben als de primaire systemen.

Encrypteer logs in transit en at rest en regel strikte Role-based access control op logtoegang: beperk wie logs mag inzien en log dat ook.

Test expliciet op privacy-lekken en memorisatie: NIST AI 600-1 adviseert systematische red-teaming met scenario's gericht op gegevensextractie. "Het model heeft niets geleerd van onze data" is geen waarneming maar een aanname. Toets deze aanname.

Gebruik een DPIA en de hulpmiddelen uit het Algoritmekader om AVG-risico's op te sporen voordat de assistent in productie gaat: CIP Privacy Self Assessment (PriSA) biedt een gestructureerde zelfevaluatie. De DPIA-uitkomst het startpunt van het privacy-ontwerp.
