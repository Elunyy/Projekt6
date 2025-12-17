## Projektöversikt
I detta projekt har vi utvecklat en smart brevlåda, *MailMinder*, utrustad med en magnetsensor som registrerar och kommunicerar när posten har kommit samt när brevlådan senast har öppnats. Genom att kombinera hårdvara och mjukvara har vi skapat ett system som samlar in data från en fysisk artefakt och visualiserar informationen på en webbplats, vilket möjliggör ökad insyn och förståelse för postleveransen.

### Syfte
Syftet med projektet är att skapa ökad förståelse, trygghet och kunskap hos användaren kring postleveransen. Genom att tillhandahålla information om när brevlådan öppnas eller när posten anländer kan användaren fatta informerade beslut, vilket i sin tur kan spara både tid och energi i vardagen.

### Kontext
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
Ett program där du skriver kod, oftast i en förenklad variant av C eller C++. Koden laddas in i kortet och talar om vad det ska göra. 
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









## Karina - Html + Markdown

## Afnan - Css

## Ikran - Javascript

## Canvas
En canvas kan man se som en tom rityta. Ritytan är skapad i html för att kunna visas på hemsidan, medan det är med hjälp av JavaScript saker kan ritas i ritytan.

## Steg för Steg
