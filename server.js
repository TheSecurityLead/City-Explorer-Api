const express = require('express');
const fs = require('fs');
const app = express();
const Forecast = require('./Forecast'); 
const port = 3000;
const cors = require('cors');
app.use(cors());
let rawdata = fs.readFileSync('weather.json');
let weatherData = JSON.parse(rawdata);
app.use(express.static('public'));
app.use((err, req, res, next) => {
  console.error(err); 
  res.status(500).send({ error: "Something went wrong." });
});

app.get('/weather', async (req, res, next) => {
  try {
    const { lat, lon, searchQuery } = req.query;
    const cityData = weatherData.find(city => city.lat === lat && city.lon === lon && city.searchQuery === searchQuery);
    
    if (!cityData) {
      return res.status(404).send('City not found');
    }

    const forecasts = cityData.weather.map(day => new Forecast(day.date, day.description));
    res.json(forecasts);
  } catch (error) {
    next(error); 
  }
});


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server running on port ${port}`));


