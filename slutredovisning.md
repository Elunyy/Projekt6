# Slutredovinsning

## MailMinder

## Eline:

Kod för magnetsensorn:

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
## Mathea:

Research för magnetsensorn. Lo-fi skissprototyp, Hi-Fi figmaprototyp. 

## Karina:
Research för magnetsensorn. Lo-fi skissprototyp

## Afnan:
Research för magnetsensorn. Lo-fi skissprototyp

## Ikran:
Research för magnetsensorn. Lo-fi skissprototyp
