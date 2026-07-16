---
id: iam-assistenten
title: Identity & Access Management voor assistenten
summary: >
  Assistenten opereren namens gebruikers, met back-end-systemen en (zodra ze tools
  of API's aanroepen) met de bevoegdheid om acties uit te voeren. Dat vereist
  fijnmazige IAM op twee niveaus: de eindgebruiker (wie mag wat vragen) en de
  assistent zelf (welke tools, data, systemen en acties hij mag gebruiken). Least
  privilege en need-to-know zijn de kernprincipes; sandboxing, fail-closed
  allowlists, een policy-afdwingende gateway en menselijke tussenkomst houden
  excessive agency in toom.
domains: [beveiliging]
good_practise: [dreigingsmodellering-llm]
phases: [Pilot, Productie]
levels: [Projectmanager]
sources:
  - bio2
  - nis2-ncsc
  - owasp-sensitive-info
  - owasp-agentic-top10
  - owasp-excessive-agency
  - owasp-agentic-initiative
  - mitre-atlas
  - aws-rag-permissions
  - promptfoo
  - enisa-threat-landscape
  - ncsc-genai-medewerkers
  - ncsc-webapps
---

Implementeer sterke, bij voorkeur phishing-bestendige authenticatie voor de eindgebruiker bij toegang tot gevoelige functionaliteit: AI-ondersteunde phishing wordt steeds geavanceerder (zie ENISA Threat Landscape 2025). Wachtwoorden alleen volstaan niet. Gebruik MFA, hardware-tokens of FIDO2 voor alles wat verder gaat dan publieke informatie.

Pas least privilege toe op de assistent: laat hem standaard alleen lezen, vereis voor mutaties (e-mails versturen, tickets aanmaken, data wijzigen) een aparte autorisatiestap en geef toegang tot specifieke endpoints in plaats van hele API's. Brede read-write-scopes maken excessive agency vele malen schadelijker. 

Beperk tokens en sessies: gebruik tijdgebonden tokens met scope-restricties. Een gelekt token mag niet maandenlang ongebruikt toegang verlenen en moet maar één ding kunnen.

Gebruik meerdere agents met een eigen least-privilege-configuratie in plaats van één alwetende agent: een "god-mode"-assistent met toegang tot alles is een single point of failure. Splits naar use case. Een FAQ-agent heeft andere rechten nodig dan een dossier-verwerker.

Dwing toegang centraal af via een gateway met fail-closed allowlist: een MCP-gateway of vergelijkbare laag bepaalt (buiten het manipuleerbare model om) welke agent onder welke voorwaarden bij welke systemen en endpoints kan. Die laag routeert ook alle outbound API-calls. Werk daarbij met allowlists in plaats van blocklists: een blocklist vergeet altijd iets, terwijl een endpoint die niet expliciet op de allowlist staat buiten bereik blijft.

Sandbox tool-executie in geïsoleerde omgevingen: isoleer uitvoering van code, externe calls of bestandstoegang zodat mislukte of aangevallen tools de rest van het systeem niet raken. Containers met minimale privileges, time-outs en resource-limits zijn de basis.

Pas permission-aware retrieval toe bij RAG: zoekresultaten moeten de autorisatiegrenzen van de bronsystemen volgen. Een gebruiker zonder toegang tot een dossier mag dat dossier ook niet via een chunk in de assistent zien. Dat vraagt om autorisatie-informatie in de vector store of een filter-laag erboven.

Vereis expliciete menselijke bevestiging voor onomkeerbare acties: betalingen, mutaties in registraties, outbound communicatie namens een organisatie. 

Borg dit alles met de BIO2-zorgplicht en de Cyberbeveiligingswet (NIS2): de zorgplicht is geen optionele richtlijn maar een verplicht kader voor de Nederlandse overheid. Toegangsbeheer en authenticatie zijn expliciet benoemde verantwoordelijkheden: vastleggen, toetsen, herzien.

Bouw policies voor intern AI-gebruik: NCSC signaleert aanzienlijk gebruik van generatieve AI onder medewerkers, vaak zonder duidelijke kaders. Heldere interne policies (wat mag wel/niet, welke gegevens horen niet in een prompt) zijn een IAM-naburig vraagstuk dat samenhangt met security awareness.