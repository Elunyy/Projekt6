Filen "chart.md" skall med minimalt använda ord, påvisa med lärorika exempel ett vad du lärt dig under veckan
Exempel möjliga lärdomar:

# Förutsättningar för Chart (CDN, Canvas, JS)

# HTML/CSS-kod 

# JS-kod

Eline:
```c++
const int Sensor = 13;
bool sensorValue;
bool prevsensorValue;
void setup() { 
  pinMode(Sensor, INPUT);
  Serial.begin(115200);
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
Mathea:
Research för magnetsensorn. Lo-fi skissprototyp, Hi-Fi figmaprototyp. 
Karina:

Afnan:

Ikran:
