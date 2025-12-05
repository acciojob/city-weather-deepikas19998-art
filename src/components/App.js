import React, { Component } from 'react';

class App extends Component {
  state = {
    query: '',
    weather: null,
    error: null,
  };

  handleInput = (e) => {
    this.setState({ query: e.target.value });
  };

  fetchWeather = async () => {
    const { query } = this.state;
    const API_KEY = "https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}";

    if (!query) {
      this.setState({ error: 'Enter a city name.', weather: null });
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      if (data.cod !== 200) {
        this.setState({ error: 'City not found.', weather: null });
        return;
      }

      this.setState({ weather: data, error: null });
    } catch (err) {
      this.setState({ error: 'Failed to fetch weather.', weather: null });
    }
  };

  render() {
    const { query, weather, error } = this.state;

    return (
      <div style={{ fontFamily: 'Arial', maxWidth: '400px', margin: '20px auto' }}>
        <h2>City Weather</h2>

        <input
          type="text"
          className="search"
          value={query}
          placeholder="Enter city name"
          onChange={this.handleInput}
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
        />

        <button
          onClick={this.fetchWeather}
          style={{ padding: '8px 12px', cursor: 'pointer' }}
        >
          Search
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {weather && (
          <div className="weather" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>{weather.name}</h3>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather-icon"
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;

