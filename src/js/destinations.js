// scripts/destinations.js
fetch("data/destinations.json")
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById("destinationsGrid");
    data.forEach(place => {
      const card = document.createElement("div");
      card.className = "destination-card";
      card.innerHTML = `
        <img src="${place.image}" alt="${place.name}" loading="lazy">
        <h3>${place.name}</h3>
        <button onclick="showModal('${place.name}', '${place.description}')">More Info</button>
      `;
      grid.appendChild(card);
    });
  });

function showModal(title, description) {
  alert(`${title}\n\n${description}`); // Replace with custom modal if desired
}