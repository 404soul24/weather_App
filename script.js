const getWeather = async (location) => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=RJDAUYYBF9KKWYC3STRSMFZMN`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const processWeatherData = (data) => ({
  location: data.resolvedAddress,
  description: data.description,
  current: {
    temp: data.currentConditions.temp,
    feelsLike: data.currentConditions.feelslike,
    humidity: data.currentConditions.humidity,
    conditions: data.currentConditions.conditions,
    icon: data.currentConditions.icon,
    windSpeed: data.currentConditions.windspeed,
  },
  forecast: data.days.map((day) => ({
    date: day.datetime,
    tempMax: day.tempmax,
    tempMin: day.tempmin,
    conditions: day.conditions,
    icon: day.icon,
    precipProb: day.precipprob,
  })),
});
const showLoading = () => {
  document.getElementById("cardWeather").innerHTML = `<p class="loading">Loading...</p>`;
};

const showError = (msg) => {
  document.getElementById("cardWeather").innerHTML = `<p class="error">${msg}</p>`;
};

const displayWeather = (weather) => {
  const card = document.getElementById("cardWeather");
  card.innerHTML = `
    <h2>${weather.location}</h2>
    <p>${weather.description}</p>
    <div class="current">
      <p><strong>${Math.round(weather.current.temp)}°F</strong> feels like ${Math.round(weather.current.feelsLike)}°F</p>
      <p>${weather.current.conditions} — Humidity: ${weather.current.humidity}% — Wind: ${weather.current.windSpeed} mph</p>
    </div>
    <div class="forecast">
      <h3>Forecast</h3>
      ${weather.forecast.map(day => `
        <div class="day">
          <span class="day-date">${day.date}</span>
          <span class="day-temps">↑${Math.round(day.tempMax)}° ↓${Math.round(day.tempMin)}°</span>
          <span class="day-conditions">${day.conditions}</span>
          <span class="day-rain">${day.precipProb}% rain</span>
        </div>
      `).join("")}
    </div>
  `;
};

const searchWeather = document.getElementById("searchWeather");
searchWeather.addEventListener("click", async () => {
  const input = document.getElementById("locationWeather");
  const locationWeather = input.value.trim();
  if (!locationWeather) {
    showError("Please enter a location.");
    return;
  }
  showLoading();
  try {
    const raw = await getWeather(locationWeather);
    const weather = processWeatherData(raw);
    displayWeather(weather);
  } catch {
    showError("Failed to fetch weather. Check the location and try again.");
  }
});
