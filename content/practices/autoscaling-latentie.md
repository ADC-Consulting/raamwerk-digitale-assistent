---
id: autoscaling-latentie
title: Autoscaling voor lage latentie bij piekbelasting
summary: >
  Met horizontale schaling en autoscaling verdeelt de digitale assistent de
  werkbelasting automatisch over meerdere instanties, zodat piekvolumes worden
  opgevangen zonder prestatieverlies en de assistent 24/7 aan SLA's voldoet.
domains: [technische-prestaties, infrastructuur-data]
phases: [Pilot, Productie]
levels: [Developer/ Engineer]
sources:
  - keda
  - azure-vm-scale-sets
  - prometheus
  - grafana
  - google-sre-slo
  - sloth-slo
---

Met horizontale schaling kan de werkbelasting van de digitale assistent worden verdeeld over meerdere servers of instanties, zodat wisselende gebruikersvolumes kunnen worden verwerkt zonder merkbaar prestatieverlies. Autoscaling zorgt ervoor dat het aantal instanties automatisch wordt op- of afgeschaald op basis van metrieken zoals CPU-gebruik, responstijden of de lengte van wachtrijen. Dit borgt voldoende capaciteit tijdens piekperiodes en voorkomt onnodige kosten in rustigere perioden.

Via deze manier kan de assistent 24/7 beschikbaar blijven, voldoet hij aan SLA's (bijvoorbeeld 99,9% uptime) en kan hij grootschalige conversational AI-workloads dragen.

<!-- tips -->

Configureer meervoudige autoscaling-triggers: Stel autoscaling in op responstijd (bijv. >200 ms) én wachtrijlengte, zodat je vroegtijdig opschaalt.

Pas predictive scaling toe: Gebruik predictive scaling om extra servers vóór bekende piekdrukte te starten en houd een kleine set voorverwarmde inference-instances aan.

Richt end-to-end monitoring in: Gebruik monitoringtools zoals Prometheus, Grafana of het dashboard van je cloudprovider om je systeem te volgen, inclusief latency en foutpercentages per pad.

Gebruik autoscaling tools: Handige tools om automatisch te schalen zijn bijvoorbeeld KEDA of Azure Autoscale.

Stel duidelijke latency SLO's per vraagtype vast: Bepaal voor elke categorie verzoeken een concrete prestatienorm, zoals: "95% van de eenvoudige vragen wordt binnen 0,5 s beantwoord" of "99% van de statusvragen binnen 1 s". Gebruik deze Service Level Objectives (SLO) vervolgens als uitgangspunt voor ontwerp en inrichting van autoscaling, capaciteit en monitoring. Een voorbeeld open-source tool voor het definiëren en genereren van SLO-configuraties is Sloth.
