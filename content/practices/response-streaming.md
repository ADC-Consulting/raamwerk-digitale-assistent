---
id: response-streaming
title: Response streaming – gefaseerde antwoorden voor vlotte UX
summary: >
  Streaming toont tussentijdse output terwijl het volledige antwoord nog wordt
  opgebouwd. Bij lange of informatieve antwoorden verkort dat de gevoelde
  wachttijd; bij kritieke of juridische tekst moet streaming juist worden uitgezet
  zodat het complete antwoord ineens beschikbaar is.
domains: [functionaliteit, gebruikerservaring]
good_practise: [zuinige-inferentie]
phases: [Pilot, Productie]
levels: [Developer/ Engineer]
sources:
  - tds-response-streaming
  - microsoft-semantic-kernel-streaming
---

Gebruik een real-time front-end-component: kies een front-end die inkomende tekst direct kan weergeven en duidelijk laat zien dat het antwoord nog wordt opgebouwd. Zonder visueel signaal dat het antwoord "nog niet af" is, denkt de gebruiker dat het zo blijft.

Schakel streaming selectief in: gebruik het voor langere, informatieve antwoorden waar de gebruiker baat heeft bij snelle eerste output. Laat het uitgeschakeld bij kritieke of juridisch gevoelige boodschappen. Een bezwaartermijn die halverwege verschijnt is verwarrend en gevaarlijk.

Meet de impact van streaming op de gebruikerservaring: volg laadtijd, afhaakmomenten en gebruikersfeedback om vast te stellen of streaming daadwerkelijk waarde toevoegt. Niet elke use case wordt sneller gevoeld door streaming. Soms maakt het juist nerveus.

Zorg dat de definitieve versie altijd leesbaar terug te vinden is: gebruikers moeten het volledige, definitieve antwoord eenvoudig kunnen terugzien (logpaneel, samenvattingsblok, kopieerbare tekst). Een streaming-flow zonder eindstand maakt het lastig om het antwoord te bewaren of te delen.

Stem streaming af op output-modaliteit: bij gestructureerde output (JSON, lijsten, tabellen) is streaming minder waardevol. Het toont halve datastructuren die de gebruiker niet kan gebruiken. Bij vrije tekst werkt streaming juist goed. Maak die afweging per output-type.

Combineer streaming met output-begrenzing: streaming bij ongelimiteerde output betekent eindeloos doorstromen en uitlopende kosten. Stel `max_tokens` en stopcondities ook in streaming-flows expliciet in.
