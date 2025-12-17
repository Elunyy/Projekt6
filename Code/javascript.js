// --------------------------------
// MQTT Configuration and State
// --------------------------------
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