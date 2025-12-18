## Projektöversikt
I detta projekt har vi utvecklat en smart brevlåda, *MailMinder*, utrustad med en magnetsensor som registrerar och kommunicerar när posten har kommit samt när brevlådan senast har öppnats. Genom att kombinera hårdvara och mjukvara har vi skapat ett system som samlar in data från en fysisk artefakt och visualiserar informationen på en webbplats, vilket möjliggör ökad insyn och förståelse för postleveransen.

### Syfte
Syftet med projektet är att skapa ökad förståelse, trygghet och kunskap hos användaren kring postleveransen. Genom att tillhandahålla information om när brevlådan öppnas eller när posten anländer kan användaren fatta informerade beslut, vilket i sin tur kan spara både tid och energi i vardagen.

### Målgrupp och kontext
Målgruppen består främst av personer vars brevlåda är placerad på ett längre avstånd från bostaden. Systemet är särskilt relevant för personer med rörelsesvårigheter, där det kan vara både fysiskt ansträngande och tidskrävande att ta sig till brevlådan i onödan.

Genom att först kunna kontrollera informationen via webbplatsen minskar behovet av onödiga förflyttningar, vilket sparar energi och ökar användarens självständighet. Även personer utan funktionsnedsättningar kan dra nytta av systemet, exempelvis vid väntan på viktig post eller för att undvika att gå ut i ogynnsamma väderförhållanden.

## Arduino + Portinitialisering
### Vad är Arduino?
Arduino är en öppen källkodsplattform för att bygga elektronikprojekt. Den består av två delar:

### Hårdvara

Ett litet mikrokort med en mikrokontroller (NodeMCU med mikrokontrollern ESP8266). Microcontroller (μC) är små datorer som består av:

• CPU - Central Processing Unit

• Minne

• Interface - Punkt där två system möts och interaktion uppstår.

• I/O - In- och ut från en Microcontroller

Den är designad för Embedded (inbyggda) systems. 
Den är som projektets hjärna och kan läsa av knappar, sensorer och signaler, och styra saker som lysdioder, motorer och displayer.

### Mjukvara (Arduino IDE)
Ett program där du skriver kod, i en förenklad variant C++. Koden laddas in i kortet och talar om vad det ska göra. 
Programmet har:

•	En kodeditor där programmet skrivs.

•	Bibliotek med färdiga funktioner för exempelvis sensorer, motorer och displayer.

•	Verktyg för att välja rätt kort och kommunikationsport.

### Portinitialisering
Inuti mikrokontrollern finns portar vilket är en grupp av pinnar som hör ihop. Portinitialisering betyder att du ställer in hur pinnarna ska bete sig innan du använder dem. Till exempel om pinnen ska vara ingång eller utgång.

När koden är färdig kompileras den. Kompilering innebär att den mänskligt läsbara koden (source code) översätts till maskinkod/binär kod (object code) som mikrokontrollern kan förstå. 

Efter uppladdningen körs programmet direkt på mikrokontrollern och styr hårdvaran enligt instruktionerna i koden. På så sätt kopplas mjukvara och hårdvara samman till ett fungerande inbyggt system.

#### Exempel på vad man kan göra med Arduino:

•	Få en LED att blinka

•	Mäta temperatur eller fuktighet

•	Få in data från en Magnetsensor

### Internet of things (IoT) och Embedded systems.

Med internet of things menas ett nätverk av sammankopplade fysiska enheter inbäddade med sensorer, programvara och annan teknik som gör det möjligt för dem att samla in och utbyta data via internet.

Embedded systems är ryggraden i IoT-enheter. De ska utföra uppgifter inom elektriska system och gör det möjligt för dem att interagera med sin omgivning genom sensorer som samlar in data från omgivningen (t.ex. temperatur eller rörelse). 

IoT-enheter använder protokoll som TCP/IP för att kommunicera med andra enheter eller molnservrar, vilket möjliggör datautbyte i realtid och fjärrstyrning.

En mikrokontroller hanterar sedan databehandling och kommunikationen mellan sensorer och andra komponenter. 

**Electrostatic Discharge (ESD) – positiva och negativa laddningar som söker utjämning och är farligt för elektronik.**



## HTML och Markdown

### Vad är HTML?

**HTML (HyperText Markup Language)** är språket som används för att **bygga strukturen på en webbsida**.

Det är alltså skelettet på en sida – texter, rubriker, bilder, länkar osv.

HTML skrivs med **taggar** som talar om vad något är.

Exempel:

``` html
<p>Hej världen</p>
```

- `<p>` = starttagg

- `</p>` = sluttagg

- Texten däremellan är innehållet

### Grundstruktur

``` html
<!DOCTYPE html>
<html>
  <head>
    <title>Min sida</title>
  </head>
  <body>
    <h1>Hej!</h1>
    <p>Detta är en text.</p>
  </body>
</html>
```

- `<!DOCTYPE html>` – säger att det är HTML5

- `<html>` – hela dokumentet

- `<head>` – information om sidan (titel, metadata)

- `<body>` – allt som syns på sidan

Head kan även innehålla:

- typsnitt
- anpassning för mobil
- ikoner
- länka CSS
- JS

### Vanliga taggar:

``` html
<h1>Rubrik</h1>      <!-- h1–h6 -->
<p>Text</p>
<a href="#">Länk</a>
<img src="bild.jpg">
<ul>
  <li>Lista</li>
</ul>
```

### Vad är Markdown?

Markdown är ett enkelt språk för text och dokumentation.
Det används ofta för:

- README-filer

- GitHub

- Anteckningar

### Grundläggande syntax och exempel

**Rubriker i Markdown**

``` md
# Stor rubrik
## Mellanrubrik
### Mindre rubrik
```
**Textstilar**

``` md
*kursiv*
**fet**
~~överstruken~~
```

**Listor**

``` md
- Punkt 1
- Punkt 2

1. Första
2. Andra
```

**Länkar & bilder**

``` md
[Länktext](https://exempel.se)

![Alt-text](bild.png)
```

**Kodblock**

``` md
```html
<p>Hej</p>
```

## CSS
Casacading Style Sheets är ett språk som används för att bestämma hur en webbsida ska se ut, dess färger, typsnitt, layout och storlek på text och ruta 


### Varför används CSS?
 CSS används för att bland annat göra webbplatsen strukturerad, snyggare och lätt att läsa.  

### sytnax

Css bestor av **selektorer** och **deklarationer**  

### Selector 
Talar om vilken HTML element som ska stylas det kan vara exempel rubriker, stycken.

### Deklarationer

* (property) egenskap -  vad som ska ändras 
* (value) Värde - hur det ska ändras 
```

background-color: green;

```

### Internal CSS
Internal CSS skrivs i HTML-filen inne i **<style>** i **<head>**. 


```c++

<style>
  body {
    background-color: brown;
  }
</style>

```
## External CSS
Eternal CSS skrivs i en separat fil, till exempel i **Style.Css** som sedan kopplas till HTML-filen 
```
<link rel="stylesheet" href="style.css">
```
### Inline CSS
Inline CSS skrivs direkt in i HTMl-element 

```c
<p style="color: green;">    </p>
```

## Javascript

JavaScript är ett programmeringsspråk som används för att göra webbsidor mer interaktiv och levande. 
Med hjälp av javaScript kan man till exempel få knappar att fungera, visa olika meddelande och ändra text eller innehåll på en webbsida.

#### Hur funkar JavaScript 
JavaScript fungerar genom att webbsidan läser koden rad för rad och gör det koden säger.
När något händer på websiddan, till exempel när man klickar på en knapp kan javaScript reagera direkt.
JavaScript används även tillsammas med  HTML och  Css

#### Variabler

Här skapas variabler med let variabler sparar data i minnet. Text sparas i variabeln namn och ett tal i ålder. Let används när värdet på variabeln kan ändras.

```c+
let namn = "exempel";
let ålder = 0;



```
### If-sats 

En if-sats används för att proggrammet ska kunna bestämma vilken kod som ska köras. Den  kontrollerar värdet i ålder och kör olika kod beroende på om villkoret är sant eller falskt. På så sätt kan proggrammet göra olika saker i olika situationer.

```c++
if (villkor) {
  // kod som körs om sant
} else {
  // kod som körs om falskt
}



```
#### Funktioner 

En funktion är en del av koden som gör en viss uppgift. Funktionen kan ta emot ett värde, som kallas parameter för att den kan användas olika sätt. 



```c++
function (namn) {
console.log(" " + namn);
```
## Canvas
En canvas kan man se som en tom rityta. Ritytan är skapad i html för att kunna visas på hemsidan, medan det är med hjälp av JavaScript saker kan ritas i ritytan.

Vi gör en kort demo!
