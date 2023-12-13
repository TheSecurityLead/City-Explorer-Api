const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

let rawdata = fs.readFileSync('weather.json');
let weatherData = JSON.parse(rawdata);
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server running on port ${port}`));
