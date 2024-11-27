const WeatherCard = ({ title, temperature, description, icon }) => {
  return (
    <div className="weather-card">
      <h3>{title}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <h1>{Math.round(temperature)}°</h1>
      <p>{description}</p>
    </div>
  );
};

export default WeatherCard;
