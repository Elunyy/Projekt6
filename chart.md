# GENOMGÅNG AV VAD VI HAR LÄRT OSS VECKA 50

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
