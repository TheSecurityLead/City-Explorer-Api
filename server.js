const express = require('express');
const fs = require('fs');
const app = express();
const Forecast = require('./Forecast'); 
const port = 3000;




let rawdata = fs.readFileSync('weather.json');
let weatherData = JSON.parse(rawdata);


app.get('/weather', (req, res) => {
  const { lat, lon, searchQuery } = req.query;
  const cityData = weatherData.find(city => city.lat === lat && city.lon === lon && city.searchQuery === searchQuery);
  
  if (!cityData) {
    return res.status(404).send('City not found');
  }

  // Add logic to process the found city data
  // For example, format the data and send it back to the client
});


app.get('/', (req, res) => res.send('Hello World!'));


app.listen(port, () => console.log(`Server running on port ${port}`));

// Additional routes and logic can be added below
