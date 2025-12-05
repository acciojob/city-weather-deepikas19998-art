import React, { useState } from "react";
import "./App.css"; // you MUST create this file (CSS given below)

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "e467712b257e418838be97cc881a71de";

  const searchWeather = async () => {
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=imperial`
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setWeather({
        name: data.name,
        temp: Math.round(data.main.temp),
        desc: data.weather[0].main,
        icon: data.weather[0].icon
      });
    } catch (err) {
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <input
        className="search"
        type="text"
        placeholder="Enter a city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchWeather()}
      />

      {weather && (
        <div className="weather">
          <h2>{weather.name}</h2>
          <h1>{weather.temp}°F</h1>
          <p>{weather.desc}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}

export default App;
