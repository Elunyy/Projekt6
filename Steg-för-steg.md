# *MailMinder*

## Projektöversikt
I detta projekt har vi utvecklat en smart brevlåda, *MailMinder*, utrustad med en magnetsensor som registrerar och kommunicerar när posten har kommit samt när brevlådan senast har öppnats. Genom att kombinera hårdvara och mjukvara har vi skapat ett system som samlar in data från en fysisk artefakt och visualiserar informationen på en webbplats, vilket möjliggör ökad insyn och förståelse för postleveransen.

### Syfte
Syftet med projektet är att skapa ökad förståelse, trygghet och kunskap hos användaren kring postleveransen. Genom att tillhandahålla information om när brevlådan öppnas eller när posten anländer kan användaren fatta informerade beslut, vilket i sin tur kan spara både tid och energi i vardagen.

### Kontext 
Projektet är utformat för att underlätta posthämtning och bidra till en mer tillgänglig och behaglig användarupplevelse. Målgruppen består främst av personer vars brevlåda är placerad på ett längre avstånd från bostaden. Systemet är särskilt relevant för personer med rörelsesvårigheter, där det kan vara både fysiskt ansträngande och tidskrävande att ta sig till brevlådan i onödan.

Genom att först kunna kontrollera informationen via webbplatsen minskar behovet av onödiga förflyttningar, vilket sparar energi och ökar användarens självständighet. Även personer utan funktionsnedsättningar kan dra nytta av systemet, exempelvis vid väntan på viktig post eller för att undvika att gå ut i ogynnsamma väderförhållanden.


## Brevlådan steg för steg

### 1. Bill of Materials (BOM)
För att genomföra projektet användes följade matrial 

- Brevlåda (valfri modell)

- Dator

- Programmeringsprogrammet Arduino IDE

- Magnetsensor (NO – Normally Open)

- Mikrokontroller NodeMCU (med ESP8266 processor)

- Plusivo-kit (kablar, motstånd, breadboard)

- USB-kabel

- Självhäftande kardborreband

- Plastbehållare

### 2. Installera Arduino IDE
- Sök på "https://www.arduino.cc/"
- Välj *Products* -> *Arduino IDE* -> *DOWNLOAD*
- Installera programmet

### 3. Koppla magnetsensorn till mikrokontrollen 
(Bild på boarden, digital/vanlig)
(visa hur kopplingen ser ut)



### 4. Arduino kod (FYLLA PÅ MED KOD)
Koden registrerar förändring i sensorns tillstånd och skriver ut om brevlådan öppnas eller stängs. 
```c++ 
const int Sensor = 13;

bool sensorValue;

bool prevsensorValue;

 

void setup() {

 

  pinMode(Sensor, INPUT);

  Serial.begin(115200);

  // int prevsensorValue

}

 

void loop() {

 

    prevsensorValue = sensorValue;

    sensorValue = digitalRead(Sensor);  

 

  if (prevsensorValue == 0 && sensorValue == 1) {

    Serial.println("Open");

    delay(2000);

  }

 

  if (prevsensorValue == 1 && sensorValue == 0) {

    Serial.println("Closed");

    delay(2000);

  }

}
```

### 5. WiFi koppling?
### 6. Visualisering på webbsidan
(kod och bilder från hur webbsidan ser ut)

Den insamlade datan visuliserars på webbplats där användaren kan se
 * När brevlådan senast öppnads
 * Förväntad tider för postlevrans
 * En logg över tidigare händelse 
 
 
 
### 7. Montering
(bilder och förklaringar)

