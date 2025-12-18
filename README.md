# *MailMinder*

Insamlad data visuliserars på en webbplats där användaren kan se förväntad tider för postlevrans.

## Brevlådan steg för steg

### Bill of Materials (BOM)
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

### 1. Installera Arduino IDE
- Sök på "https://www.arduino.cc/"
- Välj *Products* -> *Arduino IDE* -> *DOWNLOAD*
- Installera programmet
- Ladda ner ArduinoMqttClient från Library

### 3. Koppla magnetsensorn till mikrokontrollen 

🔴 Röd kabel kopplad mellan **+** och **3,3v** på ESP8266

⚫ Svart kabel kopplad mellan **-** och **GND** på ESP8266

🟤 Sensorkablar kopplade mellan **D2** på ESD och **GND** på ESP8266

Se figur 1.

<img src="https://github.com/Elunyy/Projekt6/blob/main/bild/IMG_0004.jpeg" style="width:250px;"/>

*Figur 1. Bild av en breadboard som har en ESP8266, power supply och kablar kopplade.*


### 4. Arduino & MQTT kod
Koden registrerar förändring i sensorns tillstånd och skriver ut om brevlådan öppnas eller stängs. 

Du behöver göra följande: 
* Installera Mosquitto, vars instruktioner finns på Eclipse Mosquittos webbsida.
* Uppdatera till dit ssid och lösenord i Arduino-koden för att koppla till Wifi.
* Ladda upp koden till ESP8266 med hjälp av usb.
* Dra ur usb sladd och koppla på annan strömkälla för att sedan skicka data trådlöst.

```c++ 
// BIBLIOTEK
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <NTPClient.h>      // Hämtar tid från NTP server 
#include <ArduinoMqttClient.h>

//DOOR PIN
#define Sensor 4
bool prevsensorValue;
bool sensorValue;  

//WIFI 
const char* ssid = " "; // "Ditt ssid"
const char* password = " "; // "Ditt lösenord"

// MQTT
const char* mqtt_server = "10.132.171.30"; // "DIn IP"
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

  //ANSLUT TILL WIFI 
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

    while (1);
  }
  Serial.println("You've connected to the MQTT broker!");
  Serial.println();

}

void loop() {
 mqttClient.poll();
 prevsensorValue = sensorValue; // sparar sista value 
  sensorValue = digitalRead(Sensor); 

if (prevsensorValue == LOW && sensorValue == HIGH) {

  String jsonMessage ="{";
  jsonMessage += "\"open\":\"true\"";
  jsonMessage += "}";

    Serial.println("Open");
    delay(500);
    mqttClient.beginMessage(topic);

    mqttClient.print(jsonMessage);
    Serial.print(timeClient.getFormattedTime());
    mqttClient.endMessage();

  }
  delay(500);
}
```

### 5. Visualisering på webbsidan

<img src="https://github.com/Elunyy/Projekt6/blob/main/bild/Screenshot%202025-12-17%20at%2012.54.30.png" style="width:1000px;"/>

#### HTML

```html
<!DOCTYPE html>
<html lang="sv">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MailMinder</title>
  <link rel="icon" type="image/png" href="kuvert.png" />
  <link rel="stylesheet" href="stylesheet.css" />

</head>

<body>
  <script src="https://unpkg.com/mqtt@4.3.7/dist/mqtt.min.js"></script>
  <script src="javascript.js"></script>

  <header>
    <div class="brand">
      <img src="kuvert.png" alt="MailMinder logo" class="logo" />
      <h1>MailMinder</h1>
    </div>
    <div id="hamburgare">
      <img src="meny.png" alt="meny" class="hamburgare" />

    </div>
  </header>

  <div class="container">
    <button class="status-btn" type="button">Jag har hämtat posten</button>
    <button class="activity-btn" type="button">Annan aktivitet</button>
  </div>

  <div class="container2">

    <div class="cards">
      <div class="card">
        <i class="arrow right"></i>
        <h1 id="veckorubrik">Torsdag</h1>
        <div class="timeline">
          <div class="ticks" id="ticks"></div>
          <div class="track">
            <div class="v-lines-container" id="vLines"></div>
            <div class="gradient-layer" id="gradient"></div>
          </div>
        </div>
      </div>

      <div class="cardlog">
        <i class="arrow right"></i>
        <h3>Logg</h3>
        <div class="log-lines">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>

        </div>
      </div>
    </div>
  </div>

</body>

</html>
```

#### CSS

```css
 * { box-sizing: border-box; font-family: Arial, sans-serif; }
    body { margin: 0; background: #f6f8fa; color: #222; }
 
    header {
      background: rgba(70,150,255,0.5);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
 
    header h1 {
      font-size: 22px;
      margin: 0;
      font-weight: 600;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo {
      width: 90px;
      height: auto;
      display: block;
      border-radius: 6px;
    }
    
    .hamburgare {
      width: 50px;
      height: auto;
      display: block;
      margin-right: 15px;
    }
 
    .container {
      padding: 20px;
      max-width: 300px;
      margin: 0 auto;
      text-align: center;
    }

    .container2 {
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
    }
 
    .status-btn {
      background: rgba(70,150,255,0.5);
      border-radius: 50px;
      padding: 20px 20px;
      text-align: center;
      font-family: Arial, sans-serif;
      font-size: 20px;
      margin-top: 40px;
      border: none;
      cursor: pointer;
      display: inline-block;
      box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      transition: all 0.3s ease;
    }

    .status-btn:hover {
      background: rgba(70,150,255,0.7);
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0,0,0,0.15);
    }

    .status-btn:active {
      transform: translateY(0);
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .activity-btn {
      background: rgba(40,100,200,0.7);
      border-radius: 50px;
      padding: 15px 25px;
      text-align: center;
      font-family: Arial, sans-serif;
      font-size: 16px;
      margin-bottom: 10px;
      margin-top: 10px;
      border: none;
      cursor: pointer;
      display: inline-block;
      box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      transition: all 0.3s ease;
    }

    .activity-btn:hover {
      background: rgba(40,100,200,0.9);
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0,0,0,0.15);
    }

    .activity-btn:active {
      transform: translateY(0);
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
 
    h2 { margin-bottom: 4px; }
    .subtitle { color: #666; margin-bottom: 5px; }
 
    .cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
 
    .card {
      background: white;
      border-radius: 16px;
      width: 600px;
      height: 300px;
      padding: 16px;
    
      box-shadow: 0 4px 10px rgba(0,0,0,0.08);
    }

    .cardlog {
      background: white;
      border-radius: 16px;
      width: 200px;
      height: 300px;
      padding: 16px;
    
      box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      overflow-y: scroll;
    }   

    .card h1{
      font-size: 50px;
      margin-bottom: 8px;
      color: #444;
    }
 
    .card h3 {
      margin-top: 0;
      font-size: 20px;
    }
 
    .log-lines div {
      height: 10px;
      background: rgba(70,150,255,0.5);
      border-radius: 6px;
      margin-bottom: 8px;
      margin-left:20px;
        margin-right:20px;
    }

    .arrow {
      border: solid #777;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 5px;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%) rotate(-45deg);
      -webkit-transform: translateY(-50%) rotate(-45deg);      border-radius: 1px;    }

    .right {
      transform: translateY(-50%) rotate(-45deg);
      -webkit-transform: translateY(-50%) rotate(-45deg);
    }

    .card, .cardlog {
      position: relative;
    }
 
    @media (max-width: 700px) {
      .cards { grid-template-columns: 1fr; }
    }

/*Elines kod nedanför*/


.timeline {
  width: 90%;
  max-width: 500px;
  margin-top: 60px;
  margin-left: 20px;
}

.ticks {
  position: relative;
  height: 20px;
  margin-bottom: 5px;
}

.tick {
  position: absolute;
  font-size: 13px;
  color: #666;
  padding-bottom: 4px;
  transform: translateX(-50%);
  white-space: nowrap;
}

.tick::after {
  content: "";
  position: absolute;
  top: 17px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 9px;
  background: #666;
  opacity: 0.9;
  border-radius: 2px;
}

.track {
  position: relative;
  height: 45px;
  border-radius: 6px;
  background: white;
  border: 2px solid #e4e4e4;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) inset;
}

/* vertical lines that match hour ticks */
.v-lines-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.v-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(0, 0, 0, 0.12);
}

/* gradient showing mail likelihood */
.gradient-layer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
}

#canvasButton {
  display: block;
  margin: 20px 0;
  cursor: pointer;
  transition: opacity 0.2s;
}

#canvasButton:hover {
  opacity: 0.9;
}

#canvasButton:active {
  opacity: 0.7;
}
```
#### JavaScript

```js
let mqttClient = null;
const mailboxEvents = []; // Store timestamps when mailbox was opened

const BROKER_URL = 'wss://test.mosquitto.org:8081'; // Replace with your Mosquitto broker WebSocket URL
const TOPIC = 'MDU/GRUPP6/MAILBOX';

// Auto-connect to MQTT on page loadju

function initMQTT() {
  try {
    mqttClient = mqtt.connect(BROKER_URL);

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      
      // Subscribe to the topic
      mqttClient.subscribe(TOPIC, (err) => {
        if (err) {
          console.error(`Error subscribing to ${TOPIC}:`, err);
        } else {
          console.log(`Subscribed to topic: ${TOPIC}`);
        }
      });
    });

    mqttClient.on('message', (topic, message) => {
      try {
        const msgStr = message.toString();
        console.log('Raw MQTT message received:', msgStr);
        
        const data = JSON.parse(msgStr);
        console.log('Parsed data:', data);
        
        // Expected format: {"open": true, "time": "14:30"} or {"open": true, "timestamp": 1639584600000}
        if (data.open === true || data.open === 1 || data.open === "true") {
          let eventTime;
          
          if (data.timestamp) {
            // Unix timestamp in milliseconds
            eventTime = new Date(data.timestamp);
          } else if (data.time) {
            // Time string format "HH:MM:SS"
            const [hours, minutes, seconds] = data.time.split(':').map(Number);
            eventTime = new Date();
            eventTime.setHours(hours, minutes, seconds, 0, 0);
          } else {
            // Use current time
            eventTime = new Date();
          }
          
            let evenTtime2 = eventTime;

          mailboxEvents.push(eventTime);
          console.log(`✓ Mailbox opened at ${eventTime.toLocaleTimeString()}`);
          // console.log(getDay(evenTtime2));
          console.log(`Total events: ${mailboxEvents.length}`);
          
          // Update visualization
          updateVisualization();
          console.log('✓ Visualization updated');
        } else {
          console.log('Message received but open was not true:', data.open);
        }
      } catch (e) {
        console.error('Error parsing message:', e);
        console.error('Message was:', message.toString());
      }
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT Error:', err);
    });

    mqttClient.on('close', () => {
      console.log('Disconnected from broker');
    });

  } catch (e) {
    console.error('Connection error:', e);
  }
}

// --------------------------------
// Timeline Data - Updated based on MQTT events
// --------------------------------
const viewStart = 8 * 60;   // 08:00
const viewEnd = 17 * 60;    // 17:00
const total = viewEnd - viewStart;

// Calculate mail likelihood based on actual events
function calculateMailLikelihood() {
  const likelihood = new Array(total).fill(0);
  
  if (mailboxEvents.length === 0) {
    // If no events yet, show no color (transparent)
    return likelihood.fill(0);
  }

  // Adjust standard deviation based on number of events
  // More events = tighter, more concentrated gradient
  const baseStdDev = 45;  // Starting width (minutes)
  const minStdDev = 15;   // Minimum width (maximum concentration)
  const stdDev = Math.max(minStdDev, baseStdDev / Math.sqrt(mailboxEvents.length));

  // For each minute in the view window
  for (let m = 0; m < total; m++) {
    const currentMinute = viewStart + m;
    let totalWeight = 0;
    
    // Calculate weight based on proximity to actual events
    mailboxEvents.forEach(event => {
      const eventMinutes = event.getHours() * 60 + event.getMinutes();
      
      // Only consider events within the view window
      if (eventMinutes >= viewStart && eventMinutes <= viewEnd) {
        const distance = Math.abs(currentMinute - eventMinutes);
        // Gaussian-like distribution with ADAPTIVE standard deviation
        const weight = Math.exp(-(distance * distance) / (2 * stdDev * stdDev));
        totalWeight += weight;
      }
    });
    
    // Normalize to 0-1 range by averaging (not summing)
    likelihood[m] = Math.min(1, totalWeight / mailboxEvents.length);
  }
  
  return likelihood;
}

let mailLikelihood = calculateMailLikelihood();

function updateVisualization() {
  mailLikelihood = calculateMailLikelihood();
  renderGradient(mailLikelihood);
}

// --------------------------------
// Build TICKS: every hour
// --------------------------------
let ticksEl;
let vLinesEl;
let gradientEl;
const tickTimes = [];

function minutesToLabel(m) {
  const h = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  return `${h}:${mm}`;
}

function initializeTimeline() {
  ticksEl = document.getElementById("ticks");
  vLinesEl = document.getElementById("vLines");
  gradientEl = document.getElementById("gradient");

  if (!ticksEl || !vLinesEl || !gradientEl) {
    console.error("Timeline elements not found!");
    return;
  }

  // Build ticks
  for (let t = viewStart; t <= viewEnd; t += 60) {   // every hour
    tickTimes.push(t);

    const d = document.createElement("div");
    d.className = "tick";
    d.textContent = minutesToLabel(t);
    
    // Position tick at the same percentage as the vertical line
    const offset = t - viewStart;
    const pct = (offset / total) * 100;
    d.style.left = pct + '%';
    
    ticksEl.appendChild(d);
  }

  // Build vertical lines
  buildVerticalLines();
  
  // Render initial gradient
  renderGradient(mailLikelihood);
}

function renderGradient(data) {
  const stops = [];
  for (let i = 0; i < data.length; i++) {
    const pct = (i / (data.length - 1)) * 100;
    const intensity = data[i];
    const color = `rgba(70,150,255,${0.7 * intensity})`;
    stops.push(`${color} ${pct}%`);
  }

  gradientEl.style.background = `linear-gradient(90deg, ${stops.join(",")})`;
}

// --------------------------------
// Build Vertical Lines
// --------------------------------
function buildVerticalLines() {
  if (!vLinesEl) return;
  vLinesEl.innerHTML = '';
  tickTimes.forEach(t => {
    const offset = t - viewStart;
    const pct = (offset / total) * 100;
    const line = document.createElement('div');
    line.className = 'v-line';
    line.style.left = pct + '%';
    vLinesEl.appendChild(line);
  });
}

// Initialize timeline when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTimeline);
} else {
  initializeTimeline();
}

// Initialize MQTT connection on page load
initMQTT();

// Button functionality - remove last event when clicked
function initializeButton() {
  const statusButton = document.querySelector('.status-btn');
  const activityButton = document.querySelector('.activity-btn');
  
  const handleClick = () => {
    if (mailboxEvents.length > 0) {
      const removedEvent = mailboxEvents.pop();
      console.log(`Removed event at ${removedEvent.toLocaleTimeString()}`);
      console.log(`Remaining events: ${mailboxEvents.length}`);
      updateVisualization();
    } else {
      console.log('No events to remove');
    }
  };
  
  if (statusButton) {
    statusButton.addEventListener('click', handleClick);
  }
  
  if (activityButton) {
    activityButton.addEventListener('click', handleClick);
  }
}

// Initialize button when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeButton);
} else {
  initializeButton();
}

// Test function for debugging - call addTestEvent() from console
window.addTestEvent = function() {
  const now = new Date();
  mailboxEvents.push(now);
  console.log(`Test event added at ${now.toLocaleTimeString()}`);
  updateVisualization();
};
```
 
### 6. Montering

Sensormodulen läggs ned i en låda som satts upp på kanten av brevlådan med hjälp av kardborreband. De två delarna av sensorerna är ditsatta på locked respektive sidan av brevlådan så att de får kontakt när luckan är stängd.

<img src="https://github.com/Elunyy/Projekt6/blob/main/bild/IMG_0010.jpeg" style= "width:400px">
