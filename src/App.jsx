import "./App.css";
import { useState } from "react";
import { fetchWeatherData, fetchCitySuggestions } from "./api";
import CurrentDay from "./currentDay";
import sunImage from "./assets/sun.png";
import searchIcon from "./assets/searchIcon.png";
import sunriseIcon from "./assets/sunrise.png";
import sunsetIcon from "./assets/sunset.png";
import snowIcon from "./assets/snow_icon.png";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [clickedSearch, setClickedSearch] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setCity(query);
    setError("");

    if (query.length > 2) {
      try {
        const data = await fetchCitySuggestions(query);

        const filteredSuggestions = data.filter((suggestion) =>
          suggestion.name.toLowerCase().includes(query.toLowerCase())
        );

        const noDuplicates = Array.from(
          new Set(filteredSuggestions.map((item) => item.name))
        ).map((name) => {
          return filteredSuggestions.find((item) => item.name === name);
        });
        setSuggestions(noDuplicates);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name);
    setSuggestions([]);
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
      <div
        className={`${
          weather && weather.main.temp - 273.15 < 0
            ? "bg-gradient-to-r from-sky-900 to-indigo-400"
            : "bg-gradient-to-r from-cyan-500 to-blue-500"
        } pl-12 pr-12 pt-6 pb-6 rounded-lg flex flex-col min-h-[90vh] w-96 mx-auto
        }`}
      >
        <div>
          <div className="flex items-center justify-center gap-2 mb-4 relative">
            <input
              type="text"
              value={city}
              onChange={handleInputChange}
              className="bg-white p-1 pl-2 pr-2 rounded-lg text-black w-full"
              placeholder="Enter City"
            ></input>
            {suggestions.length > 0 && (
              <ul className="bg-white absolute top-9 left-0 right-0 z-10 rounded-lg w-full h-auto max-h-80 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.lat}
                    className="text-black p-2 h-auto w-auto cursor-pointer hover:bg-sky-200 border-b-2 "
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}, {suggestion.country}
                  </li>
                ))}
              </ul>
            )}
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
                src={weather.main.temp - 273.15 < 0 ? snowIcon : sunImage}
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
                  <p className="text-gray-500">{`${(
                    weather.visibility / 1000
                  ).toFixed(0)}km`}</p>
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
            <p className="mt-20">No weather data available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
