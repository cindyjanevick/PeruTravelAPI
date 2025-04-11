// destinations.js
document.addEventListener("DOMContentLoaded", function () {
  const cityName = new URLSearchParams(window.location.search).get('city')?.toLowerCase() || 'lima'; // Convert city to lowercase
  const cityInfo = {
    lima: {
      description: 'Lima, Peru: a beautiful city with rich culture, amazing food, and fascinating history.',
    },
    cusco: {
      description: 'Cusco, Peru: the historic capital of the Inca Empire, famous for its archaeological sites and vibrant culture.',
    },
    arequipa: {
      description: 'Arequipa, Peru: known as the "White City," with its stunning colonial architecture and breathtaking mountain views.',
    },
    trujillo: {
      description: 'Trujillo, Peru: a coastal city with rich cultural history and beautiful beaches.',
    },
    puno: {
      description: 'Puno, Peru: a city located on the shores of Lake Titicaca, known for its traditional folklore and indigenous culture.',
    },
    // Add more cities as needed
  };

  // Update city info section
  const cityInfoSection = document.querySelector('.city-info');
  cityInfoSection.querySelector('h1').textContent = cityName.charAt(0).toUpperCase() + cityName.slice(1); // Capitalize first letter of city name
  cityInfoSection.querySelector('p').textContent = cityInfo[cityName]?.description || 'Information not available for this city.';
});
