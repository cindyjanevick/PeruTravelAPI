// Function to adjust the logo path dynamically after the header is loaded
function adjustLogoPath() {
  const logo = document.getElementById('logo');
  
  // Ensure the logo exists before adjusting its path
  if (logo) {
    if (window.location.pathname.includes('pages')) {
      // For pages inside 'pages' folder (e.g., destinations.html)
      logo.src = '../assets/images/perulogo.png';
    } else {
      // For index.html or root page
      logo.src = './assets/images/perulogo.png';
    }
  } else {
    console.error('Logo element not found.');
  }
}

// Function to load and insert the header
function loadHeader() {
  let headerPath = '';
  let footerPath = '';

  // Determine if the current page is inside the 'pages' folder
  if (window.location.pathname.includes('pages')) {
    // For pages like destinations.html, go up one level
    headerPath = '../partials/header.html';
    footerPath = '../partials/footer.html';
  } else {
    // For index.html, use the direct path
    headerPath = './partials/header.html';
    footerPath = './partials/footer.html';
  }

  // Dynamically load the header
  fetch(headerPath)  // Dynamically set header path based on location
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-container').innerHTML = data;
      // Call the function to adjust the logo path after the header is loaded
      adjustLogoPath(); 
      addHamburgerToggleEvent();
    })
    .catch(error => console.error('Error loading header:', error));

  // Dynamically load the footer
  fetch(footerPath)  // Dynamically set footer path
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
}

// Function to add event listeners for the hamburger button
function addHamburgerToggleEvent() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  } else {
    console.error("Hamburger or navLinks element not found");
  }
}

// Call the functions when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  loadFooter();
});
