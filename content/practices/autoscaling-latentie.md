---
id: autoscaling-latentie
title: Autoscaling voor lage latentie bij piekbelasting
summary: >
  Met horizontale schaling en autoscaling verdeelt de digitale assistent de
  werkbelasting automatisch over meerdere instanties, zodat piekvolumes worden
  opgevangen zonder prestatieverlies en de assistent 24/7 aan SLA's voldoet.
domains: [technische-prestaties, infrastructuur-data]
good_practise: [schaalbaarheid-productie]
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

Met horizontale schaling verdeelt de digitale assistent de werkbelasting over meerdere servers of instanties, zodat het wisselende gebruikersvolumes verwerkt zonder merkbaar prestatieverlies. Autoscaling schaalt het aantal instanties automatisch op of af, op basis van metrieken zoals CPU- of GPU-gebruik, responstijden of wachtrijlengte. Dit borgt voldoende capaciteit tijdens piekperiodes en voorkomt onnodige kosten in rustigere perioden.

Zo blijft de assistent 24/7 beschikbaar, voldoet hij aan SLA's (bijvoorbeeld 99,9% uptime) en kan hij grootschalige AI-workloads dragen.

<!-- tips -->

Configureer autoscaling-triggers: Stel autoscaling in op responstijd (bijv. >200 ms) en wachtrijlengte, zodat je vroegtijdig opschaalt.

Pas predictive scaling toe: Gebruik predictive scaling om extra servers vóór bekende piekdrukte te starten en houd een kleine set voorverwarmde inference-instances aan.

Richt end-to-end monitoring in: Gebruik monitoringtools zoals Prometheus, Grafana of het dashboard van je cloudprovider om je systeem te volgen, inclusief latency en foutpercentages per pad.

Stel duidelijke latency SLO's per vraagtype vast: Bepaal voor elke categorie verzoeken een concrete prestatienorm, zoals: "95% van de eenvoudige vragen wordt binnen 0,5 s beantwoord" of "99% van de statusvragen binnen 1 s". Gebruik deze Service Level Objectives (SLO) vervolgens als uitgangspunt voor ontwerp en inrichting van autoscaling, capaciteit en monitoring. Sloth is bijvoorbeeld een open-source tool om SLO-configuraties te definiëren en te genereren.
