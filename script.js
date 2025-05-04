const toggleBtn = document.getElementById("toggle-theme");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.querySelector(".search-btn");

const cityDisplay = document.querySelector(".city");
const dateDisplay = document.querySelector(".date");
const tempDisplay = document.querySelector(".temperature");
const weatherIcon = document.querySelector(".weather-icon");
const descDisplay = document.querySelector(".description");
const humidityDisplay = document.querySelector(".humidity");
const windDisplay = document.querySelector(".wind");

// Replace this with your actual API key
const apiKey = "YOUR_API_KEY_HERE"; // 🔑 Go get it from https://openweathermap.org/api

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "🌞" : "🌙";
});

searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") {
      alert("City not found!");
      return;
    }

    cityDisplay.textContent = data.name;
    dateDisplay.textContent = new Date().toDateString();
    tempDisplay.textContent = `${Math.round(data.main.temp)}°C`;
    descDisplay.textContent = data.weather[0].description;
    humidityDisplay.textContent = `${data.main.humidity}%`;
    windDisplay.textContent = `${data.wind.speed} M/s`;

    const icon = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  } catch (err) {
    alert("Error fetching weather. Check your internet or city name.");
    console.error(err);
  }
}

// Remove duplicate input fields if they exist
window.onload = () => {
  const inputs = document.querySelectorAll('#searchInput');
  if (inputs.length > 1) {
    for (let i = 1; i < inputs.length; i++) {
      inputs[i].remove();
    }
  }
};
