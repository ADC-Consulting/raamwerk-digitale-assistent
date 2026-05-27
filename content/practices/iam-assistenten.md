---
id: iam-assistenten
title: Identity & Access Management voor assistenten
summary: >
  Assistenten opereren namens gebruikers en met back-end-systemen. Dat vereist
  fijnmazige IAM op twee niveaus: de eindgebruiker (wie mag wat vragen) en de
  assistent zelf (welke tools, data en systemen mag hij gebruiken). Least
  privilege en need-to-know zijn de kernprincipes.
domains: [beveiliging, compliance, governance]
phases: [Pilot, Productie]
levels: [Operationeel, Tactisch]
sources:
  - bio2
  - nis2-ncsc
  - owasp-sensitive-info
  - enisa-threat-landscape
  - ncsc-genai-medewerkers
---

Implementeer sterke, bij voorkeur phishing-bestendige authenticatie voor toegang tot gevoelige functionaliteit: AI-ondersteunde phishing wordt steeds geavanceerder (zie ENISA Threat Landscape 2025). Wachtwoorden alleen volstaan niet — gebruik MFA, hardware-tokens of FIDO2 voor alles wat verder gaat dan publieke informatie.

Scheid lees- en schrijfacties: laat de assistent standaard alleen lezen en verplicht voor mutaties (e-mails versturen, tickets aanmaken, data wijzigen) een aparte autorisatiestap. Een aanvaller die de lees-functie weet te misbruiken doet minder schade dan een aanvaller die ook kan schrijven.

Gebruik meerdere agents met eigen least-privilege-configuratie in plaats van één alwetende agent: één "god-mode"-assistent met toegang tot alles is een single point of failure. Splits naar use case — een FAQ-agent heeft andere rechten nodig dan een dossier-verwerker.

Documenteer welke attributen en rollen bepalen wat de assistent namens een gebruiker mag doen of zien, en dwing dit af via een gateway: een MCP-gateway of vergelijkbare laag bepaalt centraal welke agent bij welke systemen kan onder welke omstandigheden — niet de assistent zelf, want die kan worden gemanipuleerd.

Pas permission-aware retrieval toe in RAG: zoekresultaten moeten de autorisatiegrenzen van de bronsystemen volgen. Een gebruiker die geen toegang heeft tot een dossier mag dat dossier ook niet via een chunk in de assistent zien. Dat vraagt om autorisatie-informatie in de vector store of een filter-laag erboven.

Beperk tokens en sessies: bovenop authenticatie en autorisatie, tijdgebonden tokens met scope-restricties. Een gelekt token mag niet maandenlang ongebruikt toegang verlenen, en moet maar één ding kunnen — niet alles.

Borg dit alles met de BIO2-zorgplicht en de Cyberbeveiligingswet (NIS2): de zorgplicht is geen optionele richtlijn maar een verplicht kader voor de Nederlandse overheid. Toegangsbeheer en authenticatie zijn expliciet benoemde verantwoordelijkheden — vastleggen, toetsen, herzien.

Bouw policies voor intern AI-gebruik: NCSC signaleert aanzienlijk gebruik van generatieve AI onder medewerkers — vaak zonder duidelijke kaders. Heldere interne policies (wat mag wel/niet, welke gegevens horen niet in een prompt) zijn een IAM-naburig vraagstuk dat samenhangt met security awareness.
