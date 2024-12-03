import { useState, useEffect } from "react";
import { fetchWeatherData, fetchForecastData } from "./components/api";
import WeatherCard from "./components/WeatherCard";
import "./index.css";

function App() {
  const [city, setCity] = useState("Toulouse"); // Default city set to Toulouse
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(""); // For today's weather image
  const [countryCode, setCountryCode] = useState(""); // Nouvel état pour le code du pays

  const isLocalEnvironment = () => {
    return window.location.hostname.includes("localhost");
  };

  const getImagePath = (weatherMain) => {
    const mainWeather = weatherMain.toLowerCase();
    return isLocalEnvironment()
      ? `${mainWeather}.jpg` // Local path
      : `meteo/${mainWeather}.jpg`; // Production path
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeatherData(city);
        const forecastData = await fetchForecastData(city);

        const mainWeather = weatherData.weather[0].main.toLowerCase();
        const imageUrl = getImagePath(mainWeather);

        console.log(`Image URL for today's weather: ${imageUrl}`);
        setBackgroundImage(imageUrl);

        setWeather({
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
          main: mainWeather,
        });
        setCountryCode(weatherData.sys.country); // Enregistrement du code du pays

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
        const enrichedDaily = daily.map((item) => ({
          date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
            weekday: "long",
          }),
          temp: item.main.temp,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          main: item.weather[0].main,
        }));
        setDailyForecast(enrichedDaily);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [city]);
  const getFlagEmoji = (countryCode) => {
    return countryCode
      .toUpperCase() // S'assurer que le code pays est en majuscules
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt())
      ); // Conversion des lettres en emoji
  };
  return (
    <div className="app">
      {/* Background image */}
      <div
        className="background-blur"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      {/* Main content */}
      <div className="content">
        <div className="search-container">
          <input
            type="text"
            className="search-box"
            placeholder="City?"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {/* <input type="text" class="search-box" placeholder="City?" /> */}
        </div>
        <div className="city-buttons">
          <button onClick={() => setCity("Turku")}>Turku</button>
          <button onClick={() => setCity("Toulouse")}>Toulouse</button>
          <button onClick={() => setCity("Paris")}>Paris</button>
        </div>

        <div className="weather-container">
          {weather && (
            <WeatherCard
              title={
                <span>
                  Today in {city}{" "}
                  {countryCode && (
                    <span style={{ marginLeft: "8px" }}>
                      {getFlagEmoji(countryCode)}
                    </span>
                  )}
                </span>
              }
              temperature={weather.temperature}
              description={weather.description}
              icon={weather.icon}
              backgroundImage={backgroundImage}
            />
          )}

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

          <div className="forecast-vertical">
            <h3>Daily Forecast</h3>
            {dailyForecast.map((day, index) => (
              <WeatherCard
                key={index}
                title={day.date}
                temperature={day.temp}
                description={day.description}
                icon={day.icon}
                backgroundImage={getImagePath(day.main)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
