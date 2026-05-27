---
id: kleinste-model-per-taak
title: Kies het kleinste model dat de taak aankan
summary: >
  Niet elke taak vereist een frontier-model. Het standaardgebruik van grote
  algemene modellen voor eenvoudige taken is ecologisch en financieel
  inefficiënt. Begin klein, meet, en schaal alleen op wanneer de kwaliteit
  aantoonbaar tekortschiet.
domains: [duurzaamheid, infrastructuur-data, technische-prestaties, antwoordkwaliteit]
phases: [PoC, Pilot, Productie]
levels: [Operationeel, Tactisch]
sources:
  - ai-energy-score
  - ml-energy-leaderboard
  - unesco-greener-ai
  - arxiv-green-llm-techniques
  - sustain-ai-check
  - algorithmwatch-sustain
---

Overweeg eerst óf AI nodig is: voor deterministische taken — een zoekvraag die naar één bron leidt, een lookup in een tabel, een vaste lijst antwoorden — is een klassieke database of zoekfunctie typisch ordes van grootte goedkoper én groener dan een LLM-aanroep. AI is geen default-keuze; AI is een keuze met kosten.

Start met het kleinste model op je golden dataset: meet kwaliteit én energie/tokens. Upgrade pas naar een grotere klasse als de kwaliteit aantoonbaar tekortschiet op jouw taak. UNESCO en meerdere studies wijzen op Small Language Models (SLM's) als structureel minder energie-intensief alternatief voor smalle, domeinspecifieke taken, mits ze afdoende zijn gefinetuned.

Vergelijk per taak, niet per leaderboard: een FAQ-assistent heeft andere eisen dan een agent die documenten doorzoekt. Tools zoals de AI Energy Score en de ML.Energy Leaderboard geven energie-efficiëntie per taaktype — gebruik die in plaats van algemene rankings die je use case niet kennen.

Gebruik een router (small/large model routing): stuur eenvoudige prompts naar een kleiner model en alleen complexe prompts naar een groter model. Dit is de techniek met het hoogste aangetoonde energie-rendement bij behoud van kwaliteit, met besparingen van 40–70% volgens empirische studies.

Audit jaarlijks of je modelkeuze nog optimaal is: nieuwe modellen, veranderende taken en groeiende gebruikspatronen verschuiven het optimum. Een keuze die in 2026 efficiënt was, kan in 2027 verouderd zijn.

Combineer modelkeuze met bredere assessment: gebruik bijvoorbeeld de AI Sustainability Check van AlgorithmWatch (SustAIn) om naast pure energie-efficiëntie ook sociale en economische duurzaamheidscriteria mee te wegen — modelkeuze is niet alleen een technische beslissing.
