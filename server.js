const express = require('express');
const fs = require('fs');
const app = express();
const Forecast = require('./Forecast'); 
const port = 3000;

let rawdata = fs.readFileSync('weather.json');
let weatherData = JSON.parse(rawdata);

app.use((err, req, res, next) => {
  console.error(err); // Log the error for server-side debugging
  res.status(500).send({ error: "Something went wrong." });
});

app.get('/weather', (req, res) => {
  const { lat, lon, searchQuery } = req.query;
  const cityData = weatherData.find(city => city.lat === lat && city.lon === lon && city.searchQuery === searchQuery);
  
  if (!cityData) {
    return res.status(404).send('City not found');
  }

   const forecasts = cityData.weather.map(day => new Forecast(day.date, day.description));
  res.json(forecasts); 
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server running on port ${port}`));


