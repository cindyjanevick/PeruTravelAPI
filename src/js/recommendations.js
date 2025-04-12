const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get('city')?.toLowerCase();
document.getElementById("city-name").textContent = city.charAt(0).toUpperCase() + city.slice(1);

fetch("../data/recommendations.json")
  .then(res => res.json())
  .then(data => {
    let items = data[city] || [];
    const container = document.getElementById("tour-cards");

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
          <p><strong>Length:</strong> ${item.length}</p>
        `;
        container.appendChild(card);
      });
    };

    renderItems(items);

    document.getElementById("tour-cost").addEventListener("change", filter);
    document.getElementById("tour-length").addEventListener("change", filter);

    function filter() {
        const cost = document.getElementById("tour-cost").value.toLowerCase();
        const length = document.getElementById("tour-length").value.toLowerCase();

      console.log("Selected cost:", cost);
      console.log("Selected length:", length);
      console.log("Original items:", items);

      const filtered = items.filter(item => {
        console.log("Comparing item.length:", item.length); // 🪵 Log this
        return (cost === "all" || item.cost === cost) &&
               (length === "all" || item.length === length);
      });
      console.log("Filtered items:", filtered);
      renderItems(filtered);
    }
  });

