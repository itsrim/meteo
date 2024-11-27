const WeatherCard = ({
  title,
  temperature,
  description,
  icon,
  backgroundImage,
}) => {
  return (
    <div
      className="weather-card"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use dynamic background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textShadow: "1px 1px 5px rgba(0, 0, 0, 0.8)",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>{title}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <h1>{Math.round(temperature)}°</h1>
      <p style={{ color: "white" }}>{description}</p>
    </div>
  );
};

export default WeatherCard;
