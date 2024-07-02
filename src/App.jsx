import "./App.css";
import { useState } from "react";
import { fetchWeatherData } from "./api";
import CurrentDay from "./currentDay";
import sunImage from "./assets/sun.png";
import searchIcon from "./assets/searchIcon.png";
import sunriseIcon from "./assets/sunrise.png";
import sunsetIcon from "./assets/sunset.png";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [clickedSearch, setClickedSearch] = useState(false);

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setError("");
  };

  const handleSearch = async () => {
    try {
      setClickedSearch(true);
      const data = await fetchWeatherData(city);
      setWeather(data);
      setError("");

      setTimeout(() => {
        setClickedSearch(false);
      }, 1000);
    } catch (error) {
      setError(error.message);
      setWeather(null);
    }
  };

  const convertUnixToTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 pl-12 pr-12 pt-6 pb-6 rounded-lg flex flex-col min-h-[90vh] w-96 mx-auto">
        <div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <input
              type="text"
              value={city}
              onChange={handleInputChange}
              className="bg-white p-1 pl-2 pr-2 rounded-lg text-black w-full"
            ></input>
            <button onClick={handleSearch}>
              <img
                src={searchIcon}
                alt="search icon"
                className="h-7 w-7 hover:scale-110 transition-all duration-500"
              ></img>
            </button>
          </div>
          {error && <div>{error}</div>}
          {weather ? (
            <div
              className={`text-white flex flex-col items-center ${
                clickedSearch ? "animate-fade-in" : ""
              }`}
            >
              <div className="flex item-center gap-8 mb-8">
                <h1 className="mb-4 mt-4 text-7xl">{`${(
                  weather.main.temp - 273.15
                ).toFixed(0)}°C`}</h1>
                <div className="flex flex-col items-end justify-end">
                  <CurrentDay />
                  <h3>{`Feels like ${(weather.main.feels_like - 273.15).toFixed(
                    0
                  )}°C`}</h3>
                </div>
              </div>
              <img
                src={sunImage}
                className={`h-28 w-28 ${
                  clickedSearch ? "animate-spin-once" : ""
                } mb-8`}
              ></img>
              <div className="mb-3 text-lg bg-slate-100 text-black p-1 rounded-xl w-full flex justify-center gap-2">
                <div className="flex flex-col items-center pl-4">
                  <p>Weather</p>
                  <p className="text-gray-500">{`${weather.weather[0].description}`}</p>
                </div>
                <div className="flex flex-col items-center border-l-2 border-r-2 border-slate-300 pl-4 pr-4">
                  <p>Humidity</p>
                  <p className="text-gray-500">{`${weather.main.humidity}%`}</p>
                </div>
                <div className="flex flex-col items-center pr-4">
                  <p>Visibility</p>
                  <p className="text-gray-500">{`${
                    weather.visibility / 1000
                  }km`}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center justify-center mt-6 bg-white text-black rounded-xl p-2">
                <div>
                  <img
                    src={sunriseIcon}
                    alt="sunrise image"
                    className={`${clickedSearch ? "animate-fade-in" : ""} `}
                  />
                  <p>Sunrise</p>
                  <p>{`${convertUnixToTime(weather.sys.sunrise)}`}</p>
                </div>
                <div>
                  <img
                    src={sunsetIcon}
                    alt="sunsiet image"
                    className={`${clickedSearch ? "animate-fade-in" : ""} `}
                  />
                  <p>Sunset</p>
                  <p>{`${convertUnixToTime(weather.sys.sunset)}`}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-10">Please enter the city</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
