// scripts/calendar.js
const calendar = document.getElementById("calendar");
const events = [
  { date: "2025-07-24", name: "Fiestas Patrias" },
  { date: "2025-06-24", name: "Inti Raymi Festival" },
];
calendar.innerHTML = events.map(event => `<p>${event.date}: ${event.name}</p>`).join("");