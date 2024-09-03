import React, { useState } from "react";
import axios from "axios";

import "./Style.css";

export default function Weather(props) {
  let [city, setCity] = useState("");
  let [weatherInfos, setWeatherInfos] = useState({});

  function displayResult(response) {
    setWeatherInfos({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
      city: response.data.name,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayResult);
  }

  function searchCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit} id="searchForm" className="searchBox">
      <input
        type="search"
        placeholder="Enter a city"
        onChange={searchCity}
        id="enterCity"
      />
      <input
        type="submit"
        value="Search"
        id="submitBtn"
        className="searchButton"
      />
    </form>
  );

  return (
    <div className="WeatherContainer" id="weatherCont">
      <header>{form}</header>
      <main>
        <div className="currentWeather" id="weathertoday">
          <div>
            <h1 id="currentCity">{weatherInfos.city}</h1>

            <p>
              <span id="description">
                Description: {weatherInfos.description}{" "}
              </span>
              <br />
              Humidity: <strong>{weatherInfos.humidity}% </strong>, Wind:
              <strong>{weatherInfos.wind}km/h</strong>
            </p>
          </div>
          <div className="weatherTemperature">
            <span id="temperatureIcon">
              <img src={weatherInfos.icon} alt={weatherInfos.description} />
            </span>
            <span className="currentTemperature" id="displayCurrentemp">
              {Math.round(weatherInfos.temperature)}
            </span>
            <span id="temperatureDegrees">°C</span>
          </div>
        </div>
      </main>
      <footer>
        <p>
          This project was coded by {""}
          <a
            href="https://github.com/FatimaBartels"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fatima Bartels
          </a>
          and is {""}
          <a
            href="https://github.com/FatimaBartels/react-weather"
            target="_blank"
            rel="noopener noreferrer"
          >
            on GitHub
          </a>{" "}
          {""}
          and {""}
          <a
            href="https://fb-weather-react-app.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            hosted on Netlify
          </a>
        </p>
      </footer>
    </div>
  );
}
