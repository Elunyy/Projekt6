# VAD VI HAR LÄRT OSS VECKA 50

## Array
En array kan lagra flera värden i en variabel

Syntax:

``` c++
let array_name = [
'value1',
'value2',
'value3',
...
];
```
Användbara Array metoder:

``` c++
typeof(persons); //visa datatyp
persons.length; //visa längden på arrayen
persons.reverse(persons); //sortera omvänd
persons.push('David'); //lägg till element i slutet
persons.pop(); //ta bort sista elementet
persons.splice(2, 1); //ta bort element (start, deleteCount)
persons.splice(0, 1, 'Anna'); //ersätt element (start, count, newValue)
persons.sort(); //sortera arrayen
persons.join(', '); //utdata till sträng
```

## Object
Object - en variabel som kan hålla flera variabler

Object Properties - en samling av ett objekts **egenskaper**

Object Methods - vad objektet kan **utföra**

Object kan lagra flera värden i ett namngivet format

Värden lagras enligt key: value format

Syntax:
``` c++
let object_name = {
key1: value1,
key2: value2,
key3: value3,
...
};
```
Användbara Object metoder:

``` c++
let person = { //skapar object
first: 'Anna',
last: 'Andersson',
age: 25
};
```
``` c++
person.first; //åtkomst till värde
person.street = 'streetname' //lägg till i object
delete person.street //ta bort från object
```

## JSON

En textbaserad notation

Värden skrivs enligt **name: value** format

JSON värden kan vara:
- String
- Number
- Boolean
- Null
- Array
- JSON object


Kan ses som en liten databas

Kan lagras

Kan kommuniceras (skickas eller tas emot)

Ett Javascript object kan lätt konverteras till JSON

Syntax:

``` c++
let object_name = {
"key1": "value1",
"key2": "value2",
"key3": "value3",
...
};
```
‼️ Måste ha double quotes

Filtypen är alltid .json

Användbara JSON metoder:

``` c++
JSON.parse('{
"first": "Anna",
"last": "Andersson",
"age": 25
}'); //JSON to Javascript Object
```

``` c++
JSON.stringify({
first: "Anna",
last: "Andersson",
age: 25
}); //Javascript Object to JSON
```

## Canvas
NyTt från och med HTML5
<canvas id="myCanvas"></canvas>
Genom DOM manipulering kan i rita och måla

Skapa "duk" för att måla på
Dessa modes refereras som context i Javascript

``` C++
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
</script>
```


Metoder att testa på Context-objektet:

``` C++
ctx.beginPath();
ctx.moveTo(100, 10); //x, y
ctx.lineTo(100, 90);
ctx.lineWidth = 5;
ctx.strokeStyle = 'red';
ctx.stroke();
ctx.fillStyle = 'rgba(255,0,0,0.5)'; //red with opacity (see through) of 0.5
ctx.fillRect(30, 30, 50, 50); //draw rectangle from x1, y1 to x2, y2
ctx.moveTo(0, 50); //start-x1, start-y1
ctx.bezierCurveTo(75, 200, 125, -100, 200, 50); //bez-x1, bez-y1, bez-x2, bez-y2, end-x3, end-y3
ctx.stroke(); //draw curves with bezier mathematics
ctx.textAlign = 'left'; //left-aligned
ctx.fillStyle = 'green'; //text color
ctx.fillText('text', 190, 90); //draw filled text at x, y
```


## Charts
Vi hade först lite svårt att få chartsen att fungera frånn Chart.js men det fungerade när vi la in följande länk i ```<head>```delen 
<img width="457" height="27" alt="Screenshot 2025-12-11 at 16 59 16" src="https://github.com/user-attachments/assets/a5014407-348f-4670-bbf0-35e25078dc2c" /> 

Med hjälp av den fick vi följande bar chart att fungera:

<img width="1031" height="525" alt="Screenshot 2025-12-11 at 14 36 25" src="https://github.com/user-attachments/assets/ea453b30-bc45-4a19-8c6d-5a1c1cc9966f" />

### Ändringar i kod

Detta diagram kan man också modifiera genom att ändra på koden.
* type: doughnut/line exempelvis
* labels: har vi ändrat till veckodagarna i vårt exempel
* data: förändrar höjdn på stapeln beroende på data
  
```javascript
<script>
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
</script>
```
## Stacked Bar Chart
Efter vi fick det att fungera ville vi anpassa en chart som passar till vår målgrupp och den typ av kunskap vi vill visa. Vi kom fram till att en stacked bar chart hade kunnat ge användaren användbar information. Tanken var att man kan få en veckoöversikt vilka dagar man fått post eller om det skett andra avvikelser under veckan.

Den var krångligare att lägga in för då behövde man också lägga in src länken som tidigare och även lägga till kod som var specifik för den charten istället för att den kan ändras beroende på vad man skriver i koden som ovan.

<img width="655" height="293" alt="Screenshot 2025-12-11 at 15 40 17" src="https://github.com/user-attachments/assets/2789e532-bf84-46c6-930b-d258e43537ae" />

## Fokus på målgrupp och användare
Men även fast detta också är kunskap för anvädaren att kunna se en överblick på veckan så kom vi fram till att prioriteten är det orginella diagrammet som visar när det är mest troligt att du får posten på dagen. Därför har vi valt att återgå till att skapa det diagrammet för att prioritera användaren.

### Vibe code
Med hjälp av vibe coding eller Co-pilot i VScode har vi nu en chart som fungerar som en heat map. Även fast detta inte är skapat med hjälp av Chart.js och inte är funktionell ännu så är vi närmare det resultat som vi är ute efter. 

<img width="484" height="145" alt="Screenshot 2025-12-11 at 16 57 57" src="https://github.com/user-attachments/assets/d056914d-9b5b-47f9-b8bc-c1f71c63b33c" />

```javascript
<script>
  const viewStart = 8 * 60;   // 08:00
  const viewEnd   = 17 * 60;  // 18:00
  const total = viewEnd - viewStart;

  const mailLikelihood = [];
  for(let m=0; m<total; m++){
    const t = viewStart + m;
    const hour = t / 60;
    const center = 15;
    const dist = Math.abs(hour - center);
    const val = Math.max(0, 1 - dist/2);
    mailLikelihood.push(val);
  }
  
  function renderGradient(data){
    const stops = [];
    for(let i=0; i<data.length; i++){
      const pct = (i / (data.length - 1)) * 100;
      const intensity = data[i];
      const color = `rgba(70,150,255,${0.8 * intensity})`;
      stops.push(`${color} ${pct}%`);
    }

```

