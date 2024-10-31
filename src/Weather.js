import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    console.log(response.data);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter city name"
        onChange={updateCity}
      />
      <button type="submit">Search </button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <h2>Weather in {city}</h2>
        <ul>
          <li>Temperature:{Math.round(weather.temperature)}°C</li>
          <li>Humidity:{weather.humidity}%</li>
          <li>Desccription:{weather.description}</li>
          <li>Wind:{weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={Weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
