// BIBLIOTEK
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <NTPClient.h>      // Hämtar tid från NTP server 
#include <ArduinoMqttClient.h>

//DOOR PIN
#define Sensor  4
int prevsensorValue;    // previous state of door sensor

//WIFI 
const char* ssid = "MDU_guest"; // "Ditt ssid"
const char* password = "Frozen202512"; // "Ditt lösenord"

// MQTT
// const char* mqtt_server = "10.132.171.30"; // "DIn IP"
const int mqtt_port = 1883; // Port som används 

WiFiClient espClient;

MqttClient mqttClient(espClient);
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);

// NTP
const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 3600;  // Sveriges tidszon 
const int daylightOffset_sec = 0;

//BROKER & TOPIC
const char broker[] = "test.mosquitto.org"; // "Välj broker"
int port = 1883; // Välj port 
const char topic[] = "MDU/GRUPP6/MAILBOX"; // "Välj ett unikt namn"

const long interval = 8000;
unsigned long previousMillis = 0;

int count = 0;

void printLocalTime() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Kunde inte hämta tid");
    return;
  }
  char buffer[64];
  strftime(buffer, sizeof(buffer), "%A, %B %d %Y %H:%M:%S", &timeinfo);
  Serial.println(buffer);
}

void setup() {
  Serial.begin(115200); 

  pinMode(Sensor, INPUT_PULLUP);

  sensorValue = digitalRead(Sensor);
  prevsensorValue = sensorValue;

  // ANSLUT TILL WIFI 
  WiFi.begin(ssid, password);
  Serial.print("Ansluter till WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi ansluten!");

  // STARTA NTP
  timeClient.begin();
timeClient.setTimeOffset(3600); // UTC+1 för Sverige


  if (!mqttClient.connect(broker, port)) {
    Serial.print("MQTT connection failed! Error code =");
    Serial.println(mqttClient.connectError());

    while (1)
    ;
  }
  Serial.println("You've connected to the MQTT broker!");
  Serial.println();

}

void loop() {
 mqttClient.poll();
 timeClient.update();

 prevsensorValue = sensorValue;     // sparar sista state 
  sensorValue  = digitalRead(Sensor); // läser nytt state

if (prevsensorValue == 0 && sensorValue == 1) {
    Serial.println("Open");
    delay(500);
  }
 
  if (prevsensorValue == 1 && sensorValue == 0) {
    Serial.println("Closed");
    delay(500);
  }
}