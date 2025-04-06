// Function to load and insert the header
function loadHeader() {
  fetch('../partials/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-container').innerHTML = data;
      // Call the function to add event listeners after the header is loaded
      addHamburgerToggleEvent();
    })
    .catch(error => console.error('Error loading header:', error));
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
  
// Function to load and insert the footer
function loadFooter() {
  fetch('../partials/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
}

// Call the functions when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  loadFooter();
});
