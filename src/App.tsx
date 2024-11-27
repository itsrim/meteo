import { useState, useEffect } from "react";
import { fetchWeatherData, fetchForecastData } from "./components/api";
import WeatherCard from "./components/WeatherCard";
import "./index.css";

function App() {
  const [city, setCity] = useState("Toulouse");
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");

  const isLocalEnvironment = () => {
    return window.location.hostname.includes("localhost");
  };

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeatherData(city);
        const forecastData = await fetchForecastData(city);

        const mainWeather = weatherData.weather[0].main.toLowerCase();
        const imageUrl = isLocalEnvironment()
          ? `${mainWeather}.jpg`
          : `/${mainWeather}.jpg`;

        console.log(`Image URL for today's weather: ${imageUrl}`);
        setBackgroundImage(imageUrl);

        setWeather({
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
          main: mainWeather,
        });

        const todayHourly = forecastData.list.slice(0, 8).map((item) => ({
          time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          temp: item.main.temp,
          icon: item.weather[0].icon,
        }));
        setHourlyForecast(todayHourly);

        const daily = forecastData.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        setDailyForecast(
          daily.map((item) => ({
            date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
              weekday: "long",
            }),
            temp: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [city]);

  return (
    <div className="app">
      {/* Input field */}
      <input
        type="text"
        className="search-box"
        placeholder="City?"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      {/* City selection buttons */}
      <div className="city-buttons">
        <button onClick={() => handleCityChange("Turku")}>Turku</button>
        <button onClick={() => handleCityChange("Toulouse")}>Toulouse</button>
        <button onClick={() => handleCityChange("Paris")}>Paris</button>
      </div>

      <div className="weather-container">
        {/* Current weather */}
        {weather && (
          <WeatherCard
            title={`Today in ${city}`}
            temperature={weather.temperature}
            description={weather.description}
            icon={weather.icon}
            backgroundImage={backgroundImage}
          />
        )}

        {/* Hourly forecast */}
        <div className="hourly-container">
          <h3>Hourly Forecast</h3>
          <div className="hourly-forecast">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="hourly-item">
                <p>{hour.time}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
                  alt="weather-icon"
                />
                <p>{Math.round(hour.temp)}°</p>
              </div>
            ))}
          </div>
        </div>

        {/* Daily forecast */}
        <div className="forecast-vertical">
          {dailyForecast.map((day, index) => (
            <WeatherCard
              key={index}
              title={day.date}
              temperature={day.temp}
              description={day.description}
              icon={day.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
