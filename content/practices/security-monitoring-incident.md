---
id: security-monitoring-incident
title: Monitoring, detectie en incidentrespons (security)
summary: >
  AI-risico's zijn dynamisch — nieuwe aanvalstechnieken ontstaan doorlopend.
  Continu loggen, AI-specifieke detectieregels in een SIEM, en incident-
  playbooks afgestemd op de Cyberbeveiligingswet zijn essentieel om in
  productie grip te houden.
domains: [beveiliging, compliance, governance]
phases: [Pilot, Productie]
levels: [Operationeel, Tactisch]
sources:
  - nist-ai-600-1
  - nis2-ncsc
  - ncsc-wet-regelgeving
  - enisa-threat-landscape
  - microsoft-pyrit
  - nvidia-garak
  - deepteam
---

Log prompts, tool-calls en belangrijke tussenstappen gestructureerd, met metadata over gebruiker, model-versie en context: zonder die context kun je incidenten niet reconstrueren. "We weten dat er iets fout ging maar niet wat" is geen incidentrespons — het is een rapportage achteraf.

Definieer AI-specifieke detectieregels in je SIEM: afwijkend tokenverbruik, verdachte toolcombinaties, injectie-patronen in input, herhalende vraagvariaties die op data-extractie wijzen. Reguliere security-rules dekken deze patronen niet automatisch.

Integreer met SOAR voor automatische respons: een Security Orchestration, Automation and Response-systeem kan op basis van log-signalen automatisch beheersmaatregelen treffen — een tool-call blokkeren, een sessie afsluiten, een agent on hold zetten. Tijd tussen detectie en mitigatie kort houden is bij agentic systems geen luxe.

Borg meldplicht-workflows in lijn met de Cyberbeveiligingswet (NIS2-implementatie): meldplicht na incident bij significant effect, geïntegreerd met bestaande CSIRT-processen. Wie meldt, binnen hoeveel tijd, aan welk CSIRT — vooraf vastleggen, niet tijdens het incident bedenken.

Red-team continu in plaats van eenmalig: nieuwe prompt-injection-technieken, nieuwe jailbreaks, nieuwe poisoning-patronen verschijnen continu. Tools zoals Microsoft PyRIT (multi-turn-aanvallen zoals Crescendo, TAP, Skeleton Key), NVIDIA Garak (LLM-vulnerability-scanner met 100+ aanvalmodules) en DeepTeam (gemapt op OWASP LLM Top 10 en MITRE ATLAS) horen in CI/CD.

Volg externe threat intel: ENISA Threat Landscape (jaarlijks dreigingsoverzicht inclusief AI-specifieke patronen) en NCSC-publicaties signaleren wat aanvallers in het echt doen. Maandelijks een kort intel-review houdt detectieregels actueel.

Bewaak supply-chain: ML-modellen, weights, fine-tuning libraries en LLM-providers zijn allemaal supply-chain-componenten. Volg patch-status, security-advisories en eventuele compromittering van leveranciers — een supply-chain-incident op een model raakt alle assistenten die het gebruiken.

Plan rond model-updates: wat doe je als een leverancier een nieuwe versie uitrolt? Nieuwe modelversies gedragen zich subtiel anders — een eerder opgeloste kwetsbaarheid kan terugkeren, een nieuwe ontstaan. Test elke nieuwe modelversie in een staging-omgeving met je eigen red-team-suite voordat je hem in productie laat.
