# Slutredovinsning

## Projektöversikt

- kontexten ("En beskrivning och analys av användare och kontex")


I detta projket har vi utvecklat en smart brevlåda med magnetsensor som registrerar och komunicerar när posten har kommit eller när brevlådan senast öppnats. Genom att kombinera hårdvara och mjukvara har vi skapat ett system som samlar in data från en fysisk brevlåda och visullirerar informaionen på en webbplats. 

### syfte
Syftet med projketet är att skapa förstålse, trygghet och kunskap hos användaren kring postleveransen. Genom att få information om när brevlådan öppnas eller när posten anländer kan användaren spara tid och energi. 

### kontext 
Projektet riktar sig till personer som vill ha bättre koll över sin post, exempel ..... 

## Brevlådan steg för steg

### 1. Översikt

Detta projekt består av en fysisk brevlåda utrustad med en magnetsensor som registrerar när brevlådan öppnas. Sensordata skickas till ett system som visualiserar händelserna på en webbplats. 

Systemet består av:

- Fysisk brevlåda med sensor

- Mikrokontroller

- Datainsamling

- Webbgränssnitt för visualisering


### 2. Bill of Materials (BOM)
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

### 3. Installera Arduino IDE
- Sök på "https://www.arduino.cc/"
- Välj *Products* -> *Arduino IDE* -> *DOWNLOAD*
- Installera programmet

### 4. Koppla magnetsensorn till mikrokontrollen 
(Bild på boarden, digital/vanlig)
(visa hur kopplingen ser ut)



### 5. Arduino kod (FYLLA PÅ MED KOD)
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

### 6. WiFi koppling?
### 7. Visualisering på webbsidan
(kod och bilder från hur webbsidan ser ut)

Den insamlade datan visuliserars på webbplats där användaren kan se
 * När brevlådan senast öppnads
 * Förväntad tider för postlevrans
 * En logg över tidigare händelse 
 
 
 
### 8. Montering
(bilder och förklaringar)

