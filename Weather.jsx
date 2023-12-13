import React from 'react';

function Weather({ forecasts }) {
  return (
    <div>
      {forecasts.map((forecast, index) => (
        <div key={index}>
          <p>{forecast.date}: {forecast.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Weather;
