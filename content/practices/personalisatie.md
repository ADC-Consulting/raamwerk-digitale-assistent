---
id: personalisatie
title: Personalisatie – antwoorden op rol, profiel en context
summary: >
  Personalisatie betekent antwoorden aanpassen op basis van rol, voorkeuren en
  gedrag, binnen duidelijke privacy-kaders. Werk met een centraal
  gebruikersprofiel, expliciete regels per personalisatie-element en een
  voorkeurenpagina waarop gebruikers controle houden.
domains: [functionaliteit, gebruikerservaring]
phases: [Pilot, Productie]
levels: [Developer/ Engineer, Projectmanager]
sources:
  - arxiv-profile-personalization
  - user-profile-conv-ai
  - librechat
  - open-webui
  - dpia-ap
---

Centraliseer het gebruikersprofiel in één service: houd het profiel (rol, afdeling, taalvoorkeur, veelgebruikte diensten) bij in een centrale service in plaats van losse profielen per kanaal, en laad het profiel aan het begin van elk gesprek in de context. Verspreide profielen lopen onvermijdelijk uit elkaar.

Implementeer een voorkeurenpagina: maak een eenvoudige pagina waar gebruikers hun instellingen kunnen inzien, aanpassen en resetten.

Voer standaard een DPIA of PIA uit bij nieuwe personalisatievormen: leg privacyrisico's en bijbehorende mitigerende maatregelen vast voordat een nieuwe personalisatie live gaat. De Autoriteit Persoonsgegevens biedt handvatten.

Zet een AI-interface op met gebruikersprofielen: tools zoals LibreChat (open-source AI-platform met gebruikersaccounts en gescheiden context) of Open WebUI (zelf-hostbaar, persistente chatgeschiedenis per gebruiker) bieden de infrastructuur voor profielgebonden personalisatie zonder dat je het zelf moet bouwen.

Bouw personalisatie configuratie-gedreven, niet model-gedreven: regels moeten expliciet, leesbaar en aanpasbaar zijn. Een collega moet over twee jaar nog kunnen uitleggen waarom de assistent rol X anders behandelt dan rol Y.

Geef per personalisatie-effect een opt-out: niet elke gebruiker wil dezelfde mate van personalisatie. Sommige burgers willen expliciet geen profielgebaseerde behandeling. Geef die optie en eerbiedig hem.

Test personalisatie op bias: persona-gebonden antwoorden mogen kwaliteit aanpassen aan rol of taalniveau, maar nooit groepen systematisch nadelig behandelen. Koppel personalisatie aan een bias-test.
