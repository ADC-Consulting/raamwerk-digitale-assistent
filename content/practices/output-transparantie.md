---
id: output-transparantie
title: Maak de kwaliteit van de output transparant voor gebruiker en beheer
summary: >
  Transparantie heeft twee kanten: richting de gebruiker (zodat die de antwoorden kan beoordelen en weet wanneer hij moet doorklikken naar bronnen of een mens) en richting de admin (zodat het beheer-team kwaliteitsdrift, incidenten en patronen ziet en kan ingrijpen).  
domains: [evaluatie-assistent, antwoordkwaliteit, gebruikerservaring]
good_practise: [transparantie-uitlegbaarheid]
phases: [Pilot, Productie]
levels: [Projectmanager, Developer/ Engineer]
sources:
  - mlflow
  - langsmith
  - langfuse
  - gov-uk-chat
---
Toon bronvermeldingen bij elk feitelijk antwoord: koppel de tekstpassages aan de oorspronkelijke bron, zodat verificatie mogelijk is. 

Communiceer onzekerheid expliciet: een confidence-indicator of formulering als "ik weet het niet zeker, controleer dit bij…" voorkomt vals vertrouwen. 

Bied een handover naar mens aan: bij complexe of onzekere vragen moet de gebruiker laagdrempelig naar een ambtenaar kunnen schakelen. 

<img src="content/docs/transparantie_vb_gebruikers.png" alt="Voorbeeld transparantie voor gebruikers" style="width: 100%; margin: 1.5rem 0; border-radius: 8px;">

Log iedere interactie traceerbaar: vraag, opgehaalde bronnen, prompt, antwoord, judge-scores, gebruikersfeedback. Tools zoals MLflow, LangSmith of Langfuse zijn hiervoor geschikt. 

Periodieke ethische en kwaliteitsaudits: agendeer review-momenten waarin domeinexperts steekproefsgewijs antwoorden bekijken. 

<img src="content/docs/transparantie_vb_admin.png" alt="Voorbeeld transparantie voor admins" style="width: 100%; margin: 1.5rem 0; border-radius: 8px;">