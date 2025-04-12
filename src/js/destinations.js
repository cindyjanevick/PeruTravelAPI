async function fetchCityData(city) {
  const response = await fetch('../data/city-info.json'); // Adjust path as needed
  const cityData = await response.json();
  
  // Get data for the selected city
  return cityData[city.toLowerCase()];
}

// Function to inject city information dynamically
async function loadCityInfo() {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get('city'); // Get city from the URL parameter
  
  if (!city) {
    alert('City not found!');
    return;
  }

  // 👉 ADD THIS PART to dynamically set the links
  document.querySelector('.link-restaurants').href = `recommendations.html?city=${city}#restaurants`;
  document.querySelector('.link-attractions').href = `recommendations.html?city=${city}#attractions`;
  document.querySelector('.link-recommendations').href = `recommendations.html?city=${city}#recommendations`;

  const cityData = await fetchCityData(city); // Fetch city data dynamically
  
  if (!cityData) {
    alert('City data not found!');
    return;
  }

  // Inject City Name and Description
  document.querySelector('.city-info h1').textContent = cityData.name;
  document.querySelector('.city-info p').textContent = cityData.description;

  // Inject History, Culture, and Weather
  document.querySelector('.city-info .history').textContent = `History: ${cityData.history}`;
  document.querySelector('.city-info .culture').textContent = `Culture: ${cityData.culture}`;
  document.querySelector('.city-info .weather').textContent = `Weather: ${cityData.weather}`;

  // Inject Emergency Numbers
  const emergencyNumbers = document.querySelector('.emergency-numbers ul');
  emergencyNumbers.innerHTML = ''; // Clear existing numbers
  for (const [service, number] of Object.entries(cityData.emergency_numbers)) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${service}: </span>${number}`;
    emergencyNumbers.appendChild(li);
  }

  // Inject City Gallery (Image Carousel)
  const carousel = document.querySelector('.city-gallery .carousel');
  carousel.innerHTML = ''; // Clear existing images
  cityData.images.forEach(image => {
    const img = document.createElement('img');
    img.src = `../assets/images/${image}`;
    img.alt = `${cityData.name} Image`;
    carousel.appendChild(img);
  });
  setupCarousel(); // ✅ Add this line
  
  // Inject Events (optional, if you want to show them)
  const eventsSection = document.querySelector('.calendar-section #calendar');
  eventsSection.innerHTML = ''; // Clear existing events
  cityData.events.forEach(event => {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.innerHTML = `
      <h4>${event.title}</h4>
      <p>${event.date}</p>
      <p>${event.description}</p>
      <p><strong>Location:</strong> ${event.location}</p>
    `;
    eventsSection.appendChild(eventDiv);
  });
}

function setupCarousel() {
  const carousel = document.querySelector('.city-gallery .carousel');
  const images = carousel.querySelectorAll('img');
  let index = 0;

  if (images.length === 0) return;

  const updateCarousel = () => {
    carousel.style.transform = `translateX(-${index * 100}%)`;
  };

  document.querySelector('.prev-btn').addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    updateCarousel();
  });

  document.querySelector('.next-btn').addEventListener('click', () => {
    index = (index + 1) % images.length;
    updateCarousel();
  });

  updateCarousel(); // Show the first image
}

// Call the function to load city info when the page is loaded
loadCityInfo();
// Update recommendation links dynamically
function updateRecommendationLinks() {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get('city');

  if (!city) return;

  document.querySelector('.link-restaurants').href = `restaurants.html?city=${city}`;
  document.querySelector('.link-attractions').href = `attractions.html?city=${city}`;
  document.querySelector('.link-recommendations').href = `recommendations.html?city=${city}`;
}

// Call this after DOM is loaded
updateRecommendationLinks();
