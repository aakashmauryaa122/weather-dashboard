import React from "react";
import "./CurrentWeather.css";

const CurrentWeather = ({ data }) => {
  const weatherClass = data.weather[0].main.toLowerCase();

  const tempCelsius = (data.main.temp - 273.15).toFixed(1);
  const tempFahrenheit = ((tempCelsius * 9) / 5 + 32).toFixed(1);
  return (
    <div className={`weather-card ${weatherClass}`}>
      <div className="current-weather-header">
        <div>
          <h2 className="city">{data.city}</h2>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>

      <div className="current-weather-info">
        <p className="temperature">
          {tempCelsius}°C / {tempFahrenheit}°F
        </p>
        <div className="weather-details">
          <div className="details-row">
            <span>Feels like:</span>
            <span>{(data.main.feels_like - 273.15).toFixed(1)}°C</span>
          </div>
          <div className="details-row">
            <span>Humidity:</span>
            <span>{data.main.humidity}%</span>
          </div>
          <div className="details-row">
            <span>Pressure:</span>
            <span>{data.main.pressure} hPa</span>
          </div>
          <div className="details-row">
            <span>Wind:</span>
            <span>{data.wind.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
