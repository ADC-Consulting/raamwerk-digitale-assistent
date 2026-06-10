---
id: golden-dataset
title: Bouw een golden dataset voor output, judges en RAG
summary: >
  Een golden dataset is het fundament van elke evaluatiestrategie. Het is een gecureerde verzameling vragen met "ideale antwoorden" (en bij RAG: relevante bronnen per vraag) waartegen je elke wijziging in prompts, modellen of pijplijn kunt testen. Een goede golden dataset zet je één keer goed op en profiteer je het hele proces van. Tegelijk is het opbouwen ervan vaak de grootste bottleneck voor gedegen evaluatie: wie is verantwoordelijk, hoeveel samples heb je nodig en hoe maak je ze? 
domains: [antwoordkwaliteit]
good_practise: [modelbeoordeling-metrieken]
phases: [Pilot, Productie]
levels: [Projectmanager, Developer/ Engineer]
sources: []
---
Het kernprincipe: golden datasets zijn levende documenten. Voer edge cases uit de praktijk en fouten terug aan domeinexperts voor validatie en voeg ze vervolgens weer toe aan de golden dataset. Een golden dataset die niet groeit met de werkelijkheid, raakt achterhaald. 

<!-- tips -->
Gebruik historische data als de assistent een klassieke tool vervangt: bestaande Q&A-paren, gecureerde casussen of e-mailbeantwoording zijn een goede bron om mee te starten.  

Laat experts voordehand-liggende én edge cases maken: zonder edge cases meet je alleen het makkelijke deel.  

Gebruik AI om de dataset uit te breiden, met expert-review: een LLM kan varianten genereren, maar elke sample wordt door een mens gevalideerd. 

Voor RAG: Maak een golden dataset voor welke bronnen gevonden moeten worden bij een bepaalde input: Breng in kaart welke artikelen of chunks moeten worden opgehaald bij een bepaalde input. Dit stelt je in staat om te evalueren of je RAG-oplossing de juiste bronnen weet te identificeren.  

Kalibreer LLM-judges tegen menselijke scores: laat een QA-analist en de LLM-judge dezelfde taak scoren en vergelijk; pas de judge-prompt aan totdat de scores convergeren. 

Bouw een golden dataset op in samenwerking met diverse stakeholders: Een complete evaluatie vereist engineers, managers, domeinexperts en gebruikers die samenwerken. Engineers kunnen het niet alleen — domeinexperts en productmanagers moeten vroeg betrokken worden voor label-curatie en ground truth. 

| Activiteit | Responsible/ accountable (doet het werk) | Consulted (geeft input) | Informed (op de hoogte gehouden) |
|---|---|---|---|
| Definiëren wat "goed" betekent | Domeinexpert + Manager | Engineer + Gebruiker | Team digitale assistent |
| Evaluatie-dataset opzetten (seed samples) | Domeinexpert | Engineer + Manager | Team digitale assistent |
| Evaluatie-dataset cureren (sampling + labelen) | Engineer + Domeinexpert | Domeinexpert | Manager |
| Evaluaties draaien & monitoren | Engineer | Domeinexpert | Manager |

Template: RACI-tabel evaluatie-eigenaarschap