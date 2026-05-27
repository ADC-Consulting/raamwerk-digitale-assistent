---
id: output-transparantie
title: Bied transparantie aan gebruiker én admin over de kwaliteit van de output
summary: >
  Transparantie heeft twee kanten: richting de gebruiker (zodat die antwoorden
  kan beoordelen en weet wanneer doorklikken of escaleren) en richting de
  admin (zodat het beheer-team drift, incidenten en patronen ziet). Disclaimers
  alleen zijn zwakke risicobeheersing — combineer ze met andere maatregelen.
domains: [antwoordkwaliteit, gebruikerservaring, governance]
phases: [Pilot, Productie]
levels: [Operationeel, Tactisch]
sources:
  - mlflow
  - langsmith
  - langfuse
  - gov-uk-chat
---

Toon bronvermeldingen bij elk feitelijk antwoord: koppel passages in het antwoord aan de oorspronkelijke bron, zodat verificatie mogelijk is. Bronvermelding zonder klikbare links voegt weinig waarde toe — maak het verifiëren laagdrempelig.

Communiceer onzekerheid expliciet: een confidence-indicator of formulering als "ik weet het niet zeker, controleer dit bij…" voorkomt vals vertrouwen. Een assistent die altijd zeker klinkt, wordt overschat — wat verkeerde beslissingen door gebruikers veroorzaakt.

Bied een handover naar mens aan: bij complexe of onzekere vragen moet de gebruiker laagdrempelig naar een ambtenaar kunnen schakelen. Een handover die diep in een menu verstopt zit, faalt voor wie het meest hulp nodig heeft.

Herken het risico van schijntransparantie: bronverwijzingen verschuiven verantwoordelijkheid naar de burger. Als een burger het antwoord overneemt zonder de bron aan te klikken (zoals bij Google-snippets), is transparantie alleen op papier verleend. Disclaimers zijn zwakke risicomaatregelen — combineer altijd met technische maatregelen (lage confidence → escalatie, hallucinatiedetectie → blokkade).

Bouw een admin-dashboard met drempelwaarden per kwaliteitscriterium: stel alarmen in die afgaan bij overschrijding van kritieke drempels (hallucination-rate, refusal-rate, escalation-rate). Een dashboard zonder drempels is een nieuwsfeed, geen besturing.

Log iedere interactie traceerbaar: vraag, opgehaalde bronnen, prompt, antwoord, judge-scores, gebruikersfeedback. Tools zoals MLflow, LangSmith en Langfuse zijn hiervoor geschikt. Zonder traceerbare logs kun je een incident niet reconstrueren — en zonder reconstructie geen verbetering.

Plan periodieke ethische en kwaliteitsaudits: agendeer review-momenten waarin domeinexperts steekproefsgewijs antwoorden bekijken. Automatische metingen vangen veel maar niet alles; menselijke ogen vangen patronen die metrics niet kunnen meten.

Leer van overheidsvoorbeelden zoals GOV.UK Chat: combinatie van automated evaluation (factual precision, recall, relevancy, groundedness), handmatige evaluaties (accuracy, completeness, interaction quality) en red-teaming. Werkt met golden datasets met "ideal answers"; bereikte ~90% accuracy met expliciete disclaimers ("GOV.UK Chat can make mistakes") plus bronlinks om eenvoudig na te checken.

Maak het admin-dashboard begrijpelijk voor niet-engineers: drempelwaarden in business-termen ("hoeveel burgers werden geëscaleerd naar een mens?") zijn nuttiger dan in technische metrics. Anders blijft het dashboard een engineer-tool zonder bestuurlijk gebruik.
