import React, { useState } from "react";
import axios from "axios";

import "./index.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=20b53919a21c5e6c903732f960015f82&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form className="mb-3" onSubmit={handleSubmit}>
       <div className="row">
       <div className="col-9">
      <input type="search" placeholder="Enter the city" onChange={updateCity}  className="form-control"
                autocomplete="off" />
      </div>
      <div className="col-3">
      <button type="Submit"  className="btn btn-primary w-100">Search</button>
      </div>
      </div>
    </form>
  );


     

  if (loaded) {
    return (
      <div className="weather-app" d-flex justify-content-center>
      <div>
     {form}
    <div className="App">
    
                 <div className="row">  
            </div>
          </div>
               <div className="overview">
          <h1>{weather.city}</h1>
          <ul>
            <li>Last updated: {weather.date}</li>
            <li>{weather.description}</li>
          </ul>
        </div>
    <div className="row">
          <div className="col-6">
            <div className="d-flex weather-temperature">
            <img src={weather.icon} alt={weather.description} />
              <div>
                <strong>{Math.round(weather.temperature)}°C</strong>
                <span className="units">
                  <a href="/">°C</a> | <a href="/">°F</a>
                </span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <ul>
            <li>Humidity: {weather.humidity}%</li>
            <li>Wind: {Math.round(weather.wind)}km/h</li>
            </ul>
          </div>
        </div>
  </div>
  <small>
<a href="https://github.com/Goldinsvitlana/React-GitHub-Netlify" target="_blank" rel="noreferrer">Open-source code</a> by Svitlana Goldin
</small>
      </div>
      
    );
    
  } else {
    return form
  }

}

