import axios from "axios";

const URL: string = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY: string = "c6e381d8c7ff98f0fee43775817cf6ad";

// fetch data of 7 days
export const ForecastSevenDays = async (lat: string, lon: string) => {
  try {
    const response: any = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        API_KEY
    );
    if (response) {
      return response;
    } else {
      return "";
    }
  } catch (e) {
    console.error(e.error);
  }
};

// to get the lon lat and then send to the forecast of 1 week, otherwise, we can just have the current weather
const FetchData = async (query: any) => {
  try {
    const response: any = await axios.get(URL, {
      params: {
        q: query,
        units: "metric",
        APPID: API_KEY,
      },
    });
    if (response) {
      return response;
    } else {
      return "";
    }
  } catch (e) {
    console.error(e.error);
  }
};
export default FetchData;
