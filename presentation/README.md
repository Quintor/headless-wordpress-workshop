# StaQ Presentaties
In deze repository vind je een template voor je StaQ presentatie en/of hands-on sessie
gemaakt binnen reveal.js

## Quickstart
Voor de mensen die eerder met nodejs/npm en git gewerkt hebben, volg de volgende stappen
om met je presentatie aan de slag te gaan:

- Clone deze repository
- Zorg dat je in je eigen branch aan de slag gaat
- In je working copy voer je eenmalig `npm install` uit
- Voer `npm start` uit om je lokale webserver te starten
- Je presentatie kun je bewerken door presentatie.md aan te passen, of, als je wilt, de index.html zelf
- Commit en Push je presentatie in je eigen branch
- Na een push is je presentatie te vinden op {jouwbranch}.staq.info

Meer info over reveal.js vind je in REVEALJS.md
Op https://revealjs.com staan alle mogelijkheden van reveal

Zegt dit je niets volg dan de onderstaande stappen.

## Requirements
Zorg dat je de volgende programma's in ieder geval geinstalleerd hebt.
- NodeJS, de installatie voor Linux, Mac en/of Windows vind je [hier](https://nodejs.org/en/download/)
- Git, de installatie voor Linux, Mac en/of Windows vind je [hier](https://git-scm.com/) (Ook GUI clients zijn hier te vinden, SourceTree is een goed alternatief)

## Installatie
Nadat je bovenstaande programma's geinstalleerd hebt ga je deze repository clonen.

Op de command-line gaat dit als volgt:
```
git clone https://git.quintor.nl/staq/staq_presentatie.git
```

Mocht SSH je voorkeur hebben en je hebt een key toegevoeg in gitlab dan kun je dit commando gebruiken:
```
git clone quintorgit@git.quintor.nl:staq/staq_presentatie.git
```

De inhoud van de repository zal nu in een directory genaamd staq_presentatie staan.
Ga in deze directory staan en maak nu je eigen branch.
Op de command-line werkt dit als volgt:

```
git branch jouwbranchnaam
git checkout jouwbranchnaam
```

Uiteraard vervang je "jouwbranchnaam" door iets beters :)

Nu gaan we de benodigde dependencies voor reveal.js binnenhalen, dit doe je door middel van:
```
npm install
```

Dit commando zal het een en ander downloaden en installeren. Zodra dit klaar is kun je
`npm start` uitvoeren dit zal je presentatie openen in je browser.

Elke keer dat je met je presentatie aan de slag gaat hoef je alleen nog maar `npm start` uit te voeren.


## Presentatie bewerken
Je presentatie kun je bewerken door het aanpassen van het bestand "presentatie.md".
Hierin staan nu een aantal voorbeeld-sheets, sheets worden zoals je kunt zien gescheiden door
3 streepjes ("---") op een regel met zowel daarboven als daaronder een lege regel.
Zo kun je eenvouding meer sheets toevoegen.

De opmaak is in markdown formaat, wil je weten wat hier mee mogelijk is dan kun je
[deze](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) pagina als referentie gebruiken.

Als je je wijzigingen opgeslagen hebt wordt je presentatie automatisch herladen in de browser
en kun je je wijzigingen gelijk bekijken.

## Wijzigingen committen en pushen
Zodra je wijzigingen gemaakt hebt wil je deze uiteindelijk ook terug stoppen in git.
Dit doe je door middel van een commit en een push. Op de command-line werkt dit als volgt:

```
git commit -a -m "Jouw commit message"
git push
```

"Jouw commit message" kun je aanpassen door een zinvol bericht, bijv. "Titelpagina en introductie toegevoegd"
Hou het bericht in ieder geval beknopt.

## Verder werken
Een volgende keer kun je verder werken door weer diezelfde `npm start` uit te voeren en "presentatie.md" verder
bij te werken. Vergeet niet te committen en te pushen aan het eind :)

## Werken met meerdere personen
Uiteraard kun je ook met meerdere personen aan je presentatie werken. De stappen zoals hierboven genoemd gelden
voor elk persoon binnen je presentatie. Het is handig om, als je verder werkt aan je presentatie, vooraf een 
`git pull` uit te voeren. Hiermee haal je de laatste wijzigingen op uit de git-repository. Nadat je jouw wijzigingen
hebt gedaan kun je weer committen en pushen zoals hierboven beschreven.

Het kan voorkomen dat je tegelijkertijd aan het werk bent geweest, persoon a heeft zijn wijzigingen gecommit en gepushed
en persoon b wil hetzelfde doen. Bij de push van persoon b zul je de melding krijgen dat de repository voorloopt op jouw
lokale werkkopie. Je zult dan een `git pull` moeten uitvoeren. Git zal vervolgens proberen (indien van toepassing) de
verschillende wijzigingen zo goed mogelijk samen te voegen. Als dat lukt kun je alsnog je commit en push doen. 
Mocht het git niet lukken dan krijg een zogenaamd "merge conflict" je zult dan het bestand handmatig moeten bijwerken om
de wijzigingen samen te voegen. De verschillende varianten staan duidelijk gemarkeerd in het bestand. Aan jou de taak
om dit bestand bij te werken zodat het er uit komt te zien zoals het eruit zou moeten zien. Nadat je dit gedaan hebt kun
je alsnog committen en pushen.

## Tot slot
Hieronder nog een paar handige links als referentie:

- [Reveal.js](https://github.com/hakimel/reveal.js)
- [Markdown-Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

Vragen/Opmerkingen? Laat het weten!

