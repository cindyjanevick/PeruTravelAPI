const weatherApiKey = '583d5fc73dace2b4c056745eac5da020';



// Fetch the cities from the local JSON file
fetch('data/cities.json')
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
    updateTravelTips(city);  // Correct function to update travel tips
}
});




function updateTravelTips(city) {
  fetch("data/citytips.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      const tips = data[city] || ["No travel tips available for this city."];

      const tipsContainer = document.getElementById("travelTips");
      tipsContainer.innerHTML = `<h4>💡 Travel Tips for ${city}:</h4>`;

      const ul = document.createElement("ul");

      tips.forEach(tip => {
        const li = document.createElement("li");
        li.textContent = tip;
        ul.appendChild(li);
      });

      tipsContainer.appendChild(ul);
    })
    .catch(error => {
      console.error("Failed to load travel tips:", error);
      const tipsContainer = document.getElementById("travelTips");
      tipsContainer.innerHTML = `
        <h4>💡 Travel Tips for ${city}:</h4>
        <p>Oops! Unable to load travel tips at the moment.</p>
      `;
    });
}





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
      if (data.cod !== "200") {
        document.getElementById("weatherResult").innerHTML += "<p>Unable to fetch forecast data.</p>";
        return;
      }
      
      const forecastContainer = document.createElement("div");
      forecastContainer.classList.add("forecast");

      // Filter forecast data to show only forecasts for midday (12:00)
      const forecastList = data.list.filter(item => item.dt_txt.includes("12:00:00"));

      // Clear previous forecast data if any
      forecastContainer.innerHTML = "";

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
      document.getElementById("weatherResult").innerHTML += "<p>Error loading forecast.</p>";
    });
}



window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      await getWeatherByCoords(lat, lon);
    }, error => {
      console.log("Geolocation not available or denied", error);
    });
  }
});

async function getWeatherByCoords(lat, lon) {
  const apiKey = "583d5fc73dace2b4c056745eac5da020"; // Replace with your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayCurrentLocationWeather(data);
  } catch (error) {
    console.error("Error fetching weather for current location:", error);
  }
}

function displayCurrentLocationWeather(data) {
  const cityName = data.name;
  const temp = data.main.temp;
  const feelsLike = data.main.feels_like;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const pressure = data.main.pressure;
  const tempMin = data.main.temp_min;
  const tempMax = data.main.temp_max;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  weatherResult.innerHTML = `
    <div class="current-location-weather">
      <h3>📍 Weather at Your Location: ${cityName}</h3>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
      <p><strong>${temp}°C</strong> - ${description}</p>
      <p>🌡️ Feels Like: ${feelsLike}°C</p>
      <p>🔻 Min: ${tempMin}°C | 🔺 Max: ${tempMax}°C</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>💨 Wind Speed: ${windSpeed} m/s</p>
      <p>🧭 Pressure: ${pressure} hPa</p>
    </div>
  `;
}
