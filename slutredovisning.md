# Slutredovinsning

## Projektöversikt
- kort om vad vi gjort
- syfte
- kontexten ("En beskrivning och analys av användare och kontex")

Att utveckla en brevlåda med magnetsensor som kommunicerar när posten har kommit eller när brevlådan öppnats. Systemet samlar in data som visualiseras via en webbplats för att skapa förståelse och kunskap hos användaren kring postleverans. (?)

## Brevlådan steg för steg

### 1. Översikt

Detta projekt består av en fysisk brevlåda utrustad med en magnetsensor som registrerar när brevlådan öppnas. Sensordata skickas till ett system som visualiserar händelserna på en webbplats.

Systemet består av:

- Fysisk brevlåda med sensor

- Mikrokontroller

- Datainsamling

- Webbgränssnitt för visualisering


### 2. Bill of Materials (BOM)

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
### 4. Koppla ...
### 5. Arduino kod

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

### 6. Visualisering på webbsidan
### 7. Montering
