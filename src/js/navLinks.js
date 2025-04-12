// Function to get the city from the URL parameter
function getCityFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('city'); // Return the city name
  }
  
  // Function to update nav links dynamically
  function updateNavLinks() {
    const city = getCityFromURL(); // Get the current city from the URL
  
    if (city) {
      // If there's a city parameter in the URL, update the links dynamically
      document.getElementById('link-destinations').href = `destinations.html?city=${city}`;
      document.getElementById('link-attractions').href = `attractions.html?city=${city}`;
      document.getElementById('link-restaurants').href = `restaurants.html?city=${city}`;
      document.getElementById('link-recommendations').href = `recommendations.html?city=${city}`;
    }
  }
  
  // Call the update function when the page is loaded
  document.addEventListener('DOMContentLoaded');
  