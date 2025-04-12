const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get('city')?.toLowerCase();
document.getElementById("city-name").textContent = city.charAt(0).toUpperCase() + city.slice(1);

fetch("../data/restaurants.json")
  .then(res => res.json())
  .then(data => {
    let items = data[city] || [];
    const container = document.getElementById("restaurant-cards");

    const renderItems = (filteredItems) => {
      container.innerHTML = "";
      filteredItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="../assets/images/${item.image}" alt="${item.name}" loading="lazy"/>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p><strong>Cost:</strong> ${item.cost}</p>
          <a href="${item.url}" target="_blank">Visit Site</a>
        `;
        container.appendChild(card);
      });
    };

    renderItems(items);

    document.getElementById("restaurant-cost").addEventListener("change", (e) => {
      const selected = e.target.value;
      const filtered = selected === "all" ? items : items.filter(item => item.cost === selected);
      renderItems(filtered);
    });
  });
