---
id: systeemintegraties
title: Integraties met bestaande systemen — koppelingen via API of integratielaag
summary: >
  De assistent opereert niet losstaand maar werkt samen met zaaksystemen,
  registraties en ondersteunende tools. Doe dat via gestandaardiseerde API's en
  een centrale integratielaag (iPaaS of ESB), met een groeipad van informatief
  naar read-only naar read/write.
domains: [functionaliteit, infrastructuur-data, technische-prestaties]
phases: [Pilot, Productie]
levels: [Operationeel, Tactisch]
sources:
  - azure-integration-services
  - mulesoft
  - boomi
  - wso2
  - apache-camel
  - mcp-protocol
  - mcp-gateway-docker
  - zapier-mcp
---

Werk via een centrale integratielaag in plaats van directe koppelingen vanuit de assistent: een iPaaS-oplossing (Microsoft Azure Integration Services, Boomi, MuleSoft) of open-source ESB-technologie (WSO2, Apache Camel) beheert calls centraal, logt ze en biedt versie-, retry- en monitoring-functionaliteit die je anders zelf zou moeten bouwen.

Laat de business-logica in het bronsysteem: de assistent roept generieke acties aan ("zaak aanmaken", "status opvragen"); het bronsysteem doet de inhoudelijke verwerking. Inhoudelijke logica in de assistent zelf maakt onderhoud onmogelijk en compliance moeilijker.

Voor organisaties met technisch verouderde systemen: combineer meerdere integratie-bouwstenen. Gebruik database-views of een datawarehouse voor read-only-toegang als bronsystemen geen goede API's hebben. Ondersteun bestandsuitwisseling (CSV/XML via SFTP) en message queues als tussenstap voor periodieke synchronisatie. Niet alles hoeft real-time API te zijn.

Zorg voor een groeipad: begin met een informatieve assistent (geen systeemkoppeling), breid uit naar read-only-koppeling (status en gegevens inzien), en pas in een later stadium naar volledige read/write-integratie (zaak aanmaken, muteren). Lock-step opschalen is veiliger dan met read/write beginnen.

Hanteer een MCP-achtige aanpak aan de AI-kant: definieer standaard "tools" (zoals `create_case`, `get_status`) die de assistent kan aanroepen, en koppel die onder water flexibel aan API, ESB of file. Hierdoor kun je later naar moderne koppelingen migreren zonder de assistent zelf steeds aan te passen.

Gebruik een MCP-gateway voor centrale governance over agents: tools zoals Docker MCP-gateway beheren welke agent bij welke systemen kan onder welke omstandigheden — en geven je een logpoint voor agent-acties. Zonder gateway is "wie heeft wat gedaan" niet te beantwoorden.

Documenteer elke integratie: per koppeling vastleggen wat de doel-API is, welke autorisatie-scope, welke retry-policy, en wie eigenaar is bij storingen. Een integratie zonder eigenaar wordt een blinde vlek bij incidenten.

Test integraties end-to-end, niet alleen unit: een API-call die in isolatie werkt kan in een keten (assistent → integratielaag → ESB → bronsysteem) op rare manieren falen. Bouw integratie-tests die de hele keten doorlopen, inclusief foutpaden.
