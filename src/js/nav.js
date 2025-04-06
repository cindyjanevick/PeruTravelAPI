document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  console.log(hamburger); // Should log the hamburger element
  console.log(navLinks); // Should log the navLinks element

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      console.log("Hamburger clicked!"); // Check if click event is triggered
      navLinks.classList.toggle("open");
    });
  } else {
    console.error("Hamburger or navLinks not found.");
  }
});
