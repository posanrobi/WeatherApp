const API_KEY = "853c77176ba246c6fd82cc030e81193b";

export async function fetchWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Error while fetching data!");
  }
  const data = await response.json();
  return data;
}
