const API_URL = "https://api.openweathermap.org/data/2.5";
const REACT_APP_WEATHER_API_KEY = "c6e381d8c7ff98f0fee43775817cf6ad";

export const fetchWeatherData = async (city) => {
  const apiKey = REACT_APP_WEATHER_API_KEY; // Clé API
  const response = await fetch(
    `${API_URL}/weather?q=${city}&units=metric&appid=${apiKey}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

export const fetchForecastData = async (city) => {
  const apiKey = REACT_APP_WEATHER_API_KEY;
  const response = await fetch(
    `${API_URL}/forecast?q=${city}&units=metric&appid=${apiKey}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }
  return response.json();
};
