const weatherApiKey = '583d5fc73dace2b4c056745eac5da020';

// Fetch the cities from the local JSON file
fetch('../data/cities.json')
  .then(response => response.json())
  .then(data => {
    const citySelect = document.getElementById("citySelect");
    data.forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error("Failed to load cities:", error);
  });

// Fetch weather when a city is selected
document.getElementById("citySelect").addEventListener("change", function () {
  const city = this.value;
  if (city) {
    fetchWeather(city);
    fetchForecast(city);
  }
});

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},PE&units=metric&appid=${weatherApiKey}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById("weatherResult").innerHTML = "City not found.";
        return;
      }

      const date = new Date();
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);

      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

      document.getElementById("weatherResult").innerHTML = `
        <h3>${data.name}</h3>
        <p>${formattedDate}</p>
        <img src="${iconUrl}" alt="${data.weather[0].description}" />
        <p><strong>${data.weather[0].main}:</strong> ${data.weather[0].description}</p>
        <p>🌡️ Temp: ${data.main.temp}°C (feels like ${data.main.feels_like}°C)</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      `;
    })
    .catch(() => {
      document.getElementById("weatherResult").innerHTML = "Error fetching weather.";
    });
}

function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},PE&units=metric&appid=${weatherApiKey}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const forecastContainer = document.createElement("div");
      forecastContainer.classList.add("forecast");

      // Filter forecast to show 12:00 PM data each day (5 days)
      const forecastList = data.list.filter(item => item.dt_txt.includes("12:00:00"));

      forecastList.forEach(item => {
        const day = new Date(item.dt_txt);
        const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
        const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

        const forecastCard = `
          <div class="forecast-day">
            <p>${dayName}</p>
            <img src="${iconUrl}" alt="${item.weather[0].description}" />
            <p>${item.main.temp.toFixed(1)}°C</p>
          </div>
        `;
        forecastContainer.innerHTML += forecastCard;
      });

      document.getElementById("weatherResult").appendChild(forecastContainer);
    })
    .catch(() => {
      console.log("Error loading forecast.");
    });
}
