import { useState, useEffect } from "react";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./Api";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const fetchWeatherData = (lat, lon, city) => {
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        if (weatherResponse.cod !== 200 || forecastResponse.cod !== "200") {
          alert("Weather data not available for this location.");
          return;
        }

        setCurrentWeather({ city, ...weatherResponse });
        setForecast({ city, ...forecastResponse });
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to fetch weather data. Please try again later.");
      });
  };

  // (default location)
  useEffect(() => {
    const defaultCity = "Delhi";
    const defaultLat = "28.6139";
    const defaultLon = "77.2090";
    fetchWeatherData(defaultLat, defaultLon, defaultCity);
  }, []);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    fetchWeatherData(lat, lon, searchData.label);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
