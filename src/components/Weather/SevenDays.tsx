import moment from "moment";

export default function SevenDays(props: any) {
  const state = props.weatherSevenDays;

  if (!state?.data?.list) {
    return <p>No data available</p>; // Gestion de l'absence de données
  }

  return (
    <>
      {state.data && (
        <div className="block">
          {state.data && <p className="title mt-2">48h</p>}
          <div
            className="ml-1 mr-1"
            style={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto",
              boxSizing: "border-box",
              whiteSpace: "break-spaces",
              flexDirection: "row",
            }}
          >
            {state.data.list &&
              state.data.list.slice(0, 8).map((day: any, i: number) => (
                <div
                  key={i}
                  className="ml-1 mr-1"
                  style={{
                    flex: "0 0 auto",
                    padding: "0px 2px 0px 2px",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#eafffd",
                      backdropFilter: "blur(5px)",
                      width: "150px",
                      minHeight: "204px",
                      borderRadius: "8px",
                    }}
                  >
                    <div className="city-temp">
                      {Math.round(day.main.temp - 273.15)}{" "}
                      {/* Conversion Kelvin → Celsius */}
                      <sup>°C</sup>
                    </div>
                    <div className="info">
                      <img
                        className="city-icon"
                        src={`https://openweathermap.org/img/wn/${day.weather?.[0]?.icon}@2x.png`}
                        alt={day.weather?.[0]?.description || "Weather icon"}
                      />
                      <p style={{ color: "grey" }}>
                        {day.weather?.[0]?.description || "No description"}
                      </p>
                    </div>
                    <p style={{ fontSize: "1rem" }}>
                      {moment(day.dt_txt).format("LT")}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          {state.data && <p className="title mt-2">7 days</p>}
          <div className="columns is-centered">
            <div className="column is-mobile is-tablet is-half">
              {state.data.list &&
                state.data.list
                  .filter((_: any, index: number) => index % 8 === 0) // Résolution du problème TS7006
                  .map((day: any, i: number) => (
                    <div key={i} className="d-flex mb-1">
                      <div className="card">
                        <div className="card-content">
                          <div className="media">
                            <div className="media-content has-text-left rows is-full">
                              <time>
                                <div className="subtitle row">
                                  {moment(day.dt_txt).format("dddd")}
                                </div>
                              </time>
                              <time>
                                <div>
                                  {moment(day.dt_txt).format("MMMM Do")}
                                </div>
                              </time>
                            </div>
                            <div className="media-content rows has-text-right is-full">
                              <div className="subtitle is-6 row">
                                {day.weather?.[0]?.description ||
                                  "No description"}
                              </div>
                              <div className="title is-4 row">
                                {Math.round(day.main.temp - 273.15)}{" "}
                                {/* Kelvin → Celsius */}
                                <sup>°C</sup>
                              </div>
                            </div>
                            <div className="media-right ">
                              <figure className="image is-128x128">
                                <img
                                  className="city-icon"
                                  src={`https://openweathermap.org/img/wn/${day.weather?.[0]?.icon}@2x.png`}
                                  alt={
                                    day.weather?.[0]?.description ||
                                    "Weather icon"
                                  }
                                />
                              </figure>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
