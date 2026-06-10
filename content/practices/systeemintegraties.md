---
id: systeemintegraties
title: Integraties met bestaande systemen (via MCP) – naadloze koppeling met kernapplicaties voor actuele data en transacties
summary: >
  Bij integraties gaat het erom dat de digitale assistent niet als losstaande applicatie
  opereert, maar op een veilige en beheersbare manier samenwerkt met bestaande
  zaaksystemen, registraties en ondersteunende tools. 
domains: [functionaliteit]
phases: [Pilot, Productie, PoC]
levels: [Developer/ Engineer, Projectmanager]
sources:
  - azure-integration-services
  - mulesoft
  - boomi
  - wso2
  - apache-camel
  - zapier-mcp
  - mcp-gateway-docker
  - datacamp-mcp-servers
---
Idealiter verbind je de verschillende systemen via gestandaardiseerde API's en een centrale integratielaag (bijv. een iPaaS‑oplossing zoals
  Microsoft Azure Integration Services, Boomi of MuleSoft, of open‑source
  ESB‑technologie zoals WSO2 of Apache Camel), waar alle calls worden beheerd en
  gelogd. De assistent roept dan generieke acties aan, zoals "zaak aanmaken" of "status
  opvragen", terwijl de businesslogica in het bronsysteem blijft.

  <!-- tips -->

- **Voor organisaties met technisch verouderde systemen, combineer meerdere integratie‑bouwstenen:**
  - **Gebruik database‑views of een datawarehouse voor alleen lezen:** haal gegevens bij voorkeur uit read‑only views of een datawarehouse als bronsystemen geen goede API's hebben.
  - **Ondersteun bestandsuitwisseling en message queues als tussenstap:** gebruik waar nodig CSV/XML‑bestanden (bijv. via SFTP- SSH File transfer Protocol) en bestaande message queues om gegevens periodiek te verversen of uit te wisselen.
  - **Zorg voor een groeipad:** begin met een informatieve assistent (geen systeemkoppeling), breid daarna uit naar een read‑only koppeling (status en gegevens inzien) en ga pas in een later stadium naar volledige read/write integratie (zaak aanmaken, muteren).
- **Hanteer een Model Context Protocol (MCP)‑achtige aanpak aan de AI‑kant:** definieer standaard "tools" (zoals create_case, get_status) die de assistent kan aanroepen, en koppel deze onder water flexibel aan API, ESB of een file. Hierdoor kun je later makkelijker naar moderne koppelingen migreren zonder de assistent zelf steeds aan te passen.
