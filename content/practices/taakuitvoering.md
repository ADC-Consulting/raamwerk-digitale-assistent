---
id: taakuitvoering
title: Automatiseer en borg betrouwbare taakuitvoering in systemen
summary: >
  Een assistent met echte waarde gaat verder dan antwoorden: hij voert taken uit
  in onderliggende systemen via gestructureerde flows, BPMN-procesmodellen en
  orchestratie-tooling. Workflow-helderheid is de voorwaarde voor controleerbare,
  traceerbare taakuitvoering.
domains: [functionaliteit]
phases: [Pilot, Productie, PoC]
levels: [Developer/ Engineer, Projectmanager]
sources:
  - bpmn-org
  - camunda
  - prefect
  - apache-airflow
  - azure-logic-apps
  - uipath
---
Bij taakuitvoering is het van belang dat de assistent niet beperkt blijft tot het genereren van antwoorden, maar tevens concrete acties initieert en afrondt via de onderliggende systemen. Technisch betekent dit dat per taak een helder proces wordt gemodelleerd (bijvoorbeeld “afspraak maken” of “melding registreren”), met duidelijke stappen, benodigde gegevens en systeemkoppelingen.  

In de software wordt voor elke taak een gestructureerde flow of orkestratie ingericht die bepaalt welke gegevens uit het gesprek worden opgehaald, welke API‑calls worden uitgevoerd en wanneer een taak als “afgerond” wordt gemarkeerd. Daarvoor is een goede en betrouwbare integratie tussen de systemen essentieel. (zie good practise integratie in bestaande systemen) 

<!-- tips -->

Modelleer een vaste flow per top-taak: breng per top-taak een heldere workflow in kaart en leg deze expliciet vast in configuratie of code. Ad-hoc taakuitvoering zonder gemodelleerde flow leidt tot onreproduceerbare uitkomsten en is niet auditeerbaar.

Werk taken uit in BPMN of vergelijkbare procesmodellen: Business Process Model and Notation maakt stappen, benodigde gegevens en beslismomenten zichtbaar voor zowel ontwikkelaars als business-analisten. Camunda Modeler is een gangbare keuze; visuele modellen verlagen de drempel voor stakeholders om mee te lezen.

Richt per taak een workflow/orkestratie in: een workflow bepaalt welke gegevens uit het gesprek worden opgehaald, welke API-calls worden gedaan en wanneer de taak "afgerond" is. Camunda, Prefect, Apache Airflow of Azure Logic Apps zijn beproefde orchestratie-platforms. Kies er één en standaardiseer.

Bouw op een stabiele integratielaag: een iPaaS of ESB (zie de praktijk *Integraties met bestaande systemen*) levert de bouwstenen voor betrouwbare taakuitvoering. Workflow-tooling roept de integratielaag aan; de assistent roept de workflow aan. Drie lagen, elk met een eigen verantwoordelijkheid.

Gebruik RPA als vangnet voor legacy-systemen: als er geen API's beschikbaar zijn, kunnen Robotic Process Automation-tools (zoals UiPath) handelingen in technisch verouderde platformen uitvoeren. Behandel RPA als tijdelijke brugtechnologie, niet als langetermijnstrategie. RPA is kwetsbaar voor UI-wijzigingen en levert geen schone audit-trail.

Markeer onomkeerbare acties expliciet: betalingen, mutaties in registraties, verzending van besluiten. Vereis altijd een aparte bevestigingsstap (human-in-the-loop) en log de bevestiging als onderdeel van de audit-trail. "Per ongeluk uitgevoerd" mag geen mogelijke uitkomst zijn.

Definieer afrondingscriteria per taak: wanneer is de taak echt klaar? Bij een aanvraag: ontvangstbevestiging, opname in zaaksysteem, e-mail naar burger, status bijgewerkt. Een halfaffe taak die door de assistent als "klaar" wordt gemeld, is een datakwaliteits- en een vertrouwensincident.

Test taakuitvoering met realistische scenario's: niet alleen happy path, maar ook onderbrekingen, time-outs, ongeldige input en gedeeltelijke uitval van bronsystemen. Een workflow die bij een time-out een halve actie achterlaat, beschadigt vertrouwen sneller dan een goed afgehandeld foutpad.
