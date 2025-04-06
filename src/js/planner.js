// scripts/planner.js
const plannerForm = document.getElementById("plannerForm");
plannerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const tripData = {
    name: plannerForm.tripName.value,
    start: plannerForm.startDate.value,
    end: plannerForm.endDate.value,
    notes: plannerForm.notes.value,
  };
  alert("Plan saved: " + JSON.stringify(tripData)); // You can store in localStorage too
});