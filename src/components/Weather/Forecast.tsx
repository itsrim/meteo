import { useState } from "react";
import FetchData, { ForecastSevenDays } from "./Weather";
import SevenDays from "./SevenDays";
import moment from "moment";
// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11 - country Flag with isoCode
function countryToFlag(isoCode: any) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char: any) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

export default function Forecast() {
  const [query, setQuery] = useState<string>("");
  const [location, setLocation] = useState<string>(""); // for the click button search
  const [weather, setWeather] = useState<any>("");
  const [weatherSevenDays, setWeatherSevenDays] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);

  // for pressing enter
  const search = async (e: any) => {
    if (e.key === "Enter" && query) {
      setIsLoading(true);
      const res: any = await FetchData(query.toLowerCase());
      if (res) {
        setWeather(res.data);
        const response = await ForecastSevenDays(
          res.data.coord.lat,
          res.data.coord.lon
        );
        setWeatherSevenDays(response);
      }
      setQuery("");
      setLocation("");
      setIsLoading(false);
    }
  };

  // for the click button search
  const clickSearch = async (location: string) => {
    if (location) {
      setIsLoading(true);
      const res: any = await FetchData(location.toLowerCase());
      if (res) {
        setWeather(res.data);
        const response = await ForecastSevenDays(
          res.data.coord.lat,
          res.data.coord.lon
        );
        setWeatherSevenDays(response);
        setQuery("");
        setLocation("");
      }
      setIsLoading(false);
    }
  };
  return (
    <div className="main-container">
      <div className="container">
        <div className="header">
          <div className="icon-container">
            {weather.main ? (
              <img
                className="city-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            ) : (
              <span className="icon">
                <i className="fas fa-home"></i>
              </span>
            )}
          </div>
        </div>
        <div className="content">
          <div className="general-information">
            <span className="icon">
              <i className="fas fa-home"></i>
            </span>
            <div id="titleForecast" className="location" data-location>
              Weather in a city
            </div>
            <p className="subtitle">{moment().format("dddd, MMMM Do YYYY")}</p>
          </div>
          <div className="columns ">
            <div
              className="detail column"
              style={{ backgroundColor: "whitesmoke" }}
            >
              <div className="subtitle">Now</div>
              <div className="value" data-wind>
                {weather.main && (
                  <p style={{ color: "grey" }}>
                    {weather.weather[0].description}
                  </p>
                )}
              </div>
            </div>
            <div className="detail column">
              <div className="subtitle" style={{ whiteSpace: "nowrap" }}>
                Temperature
              </div>
              <div className="value" data-temperature>
                {weather.main && (
                  <p>
                    {Math.round(weather.main.temp)}
                    <sup>°C</sup>
                  </p>
                )}
              </div>
            </div>
            <div
              className="detail column"
              style={{ backgroundColor: "whitesmoke" }}
            >
              <div className="subtitle">City</div>
              <div className="value" data-precipitation>
                {weather.main && (
                  <div>
                    <span className="value">{weather.name}</span>
                    <sup className="subtitle">
                      {weather.sys.country} {countryToFlag(weather.sys.country)}
                    </sup>
                  </div>
                )}
              </div>
            </div>
          </div>
          <label className="text-center subtitle">
            Search a city's weather
          </label>
          <div className="city-search-container mt-3">
            <div className="field has-addons has-addons-centered">
              <div className="control">
                <input
                  id="cityInput2"
                  className="input"
                  type="text"
                  placeholder="City..."
                  value={location}
                  style={{ border: "1px solid black" }}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setLocation(e.target.value);
                  }}
                  onKeyPress={search}
                />
              </div>
              <div className="control">
                <button
                  id="btn-search"
                  className="button is-info"
                  onClick={(_e: any) => {
                    clickSearch(location);
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <br />
          <div className="columns ">
            <div
              className="detail column"
              style={{ backgroundColor: "whitesmoke" }}
            >
              <div className="control">
                <button
                  id="btn-search"
                  className="button is-secondary"
                  onClick={(_e: any) => {
                    setLocation("Turku");
                    clickSearch("turku");
                  }}
                >
                  Turku
                </button>
              </div>
            </div>
            <div
              className="detail column"
              style={{ backgroundColor: "whitesmoke" }}
            >
              <div className="control">
                <button
                  id="btn-search"
                  className="button is-secondary"
                  onClick={(_e: any) => {
                    setLocation("Toulouse");
                    clickSearch("toulouse");
                  }}
                >
                  Toulouse
                </button>
              </div>
            </div>
            <div
              className="detail column"
              style={{ backgroundColor: "whitesmoke" }}
            >
              <div className="control">
                <button
                  id="btn-search"
                  className="button is-secondary"
                  onClick={(_e: any) => {
                    setLocation("Paris");
                    clickSearch("paris");
                  }}
                >
                  Paris
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <progress className="progress is-small is-primary" max="100">
          loading
        </progress>
      )}
      <SevenDays weatherSevenDays={weatherSevenDays} />
    </div>
  );
}
