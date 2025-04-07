const weatherApiKey = '583d5fc73dace2b4c056745eac5da020';

// Travel Tips Data
const travelTips = {
  Lima: [
    "Try local ceviche by the coast.",
    "Take a walk along the Miraflores boardwalk.",
    "Avoid rush hour traffic if using taxis."
  ],
  Cusco: [
    "Acclimate for a day before going to Machu Picchu.",
    "Visit San Pedro Market for authentic souvenirs.",
    "Drink coca tea to help with the altitude."
  ],
  Arequipa: [
    "Explore the Colca Canyon for stunning views.",
    "Bring sunscreen—sun is strong at altitude.",
    "Don’t miss the alpaca dishes and local cheeses."
  ],
  Piura: [
    "Visit the beautiful Mancora beach for surfing and relaxation.",
    "Try the local seafood, especially the ceviche and the 'seco de chabelo.'",
    "Take a trip to the nearby Catacaos market to shop for traditional crafts and jewelry.",
    "Explore the historical city center with its colonial architecture and charming squares."
  ],
  Ica: [
    "Don't miss the Huacachina Oasis, where you can try sandboarding on the dunes.",
    "Visit the famous Pisco wineries and enjoy a tasting of Peru's national drink.",
    "Take a boat trip to the Ballestas Islands to see wildlife such as sea lions and penguins.",
    "Explore the Nazca Lines from an aerial tour to marvel at these ancient geoglyphs."
  ],
  Chiclayo: [
    "Visit the Lord of Sipán Tombs at the Royal Tombs of Sipán Museum for an insight into ancient Moche culture.",
    "Try the 'ceviche de conchas negras' (black clam ceviche) – a local delicacy.",
    "Explore the colorful Mercado Modelo for a taste of local life and food.",
    "Take a day trip to the archaeological site of Tucume, known for its pyramid structures."
  ],
  Iquitos: [
    "Explore the Amazon Rainforest by boat and immerse yourself in nature.",
    "Take a guided jungle tour to learn about local flora and fauna.",
    "Try local dishes like 'tacacho con cecina' (fried plantain and dried meat) and 'juanes' (rice and chicken wrapped in leaves).",
    "Visit the famous Belén Market to see the variety of exotic products and traditional goods."
  ]

};

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
  const tips = travelTips[city] || "No travel tips available for this city.";

  // Clear previous tips
  const tipsContainer = document.getElementById("travelTips");
  tipsContainer.innerHTML = `<h4>Travel Tips for ${city}: 💡</h4>`;

  // Create a list of travel tips
  const tipsList = Array.isArray(tips) ? tips : [tips];  // Ensure tips is always an array
  const ul = document.createElement("ul");  // Create a <ul> element

  tipsList.forEach(tip => {
    const li = document.createElement("li");  // Create a <li> element for each tip
    li.textContent = tip;  // Set the text of the list item
    ul.appendChild(li);  // Append the list item to the <ul>
  });

  // Append the <ul> to the tips container
  tipsContainer.appendChild(ul);
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
