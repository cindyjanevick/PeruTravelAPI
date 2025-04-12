document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('plannerForm');
  const tripName = document.getElementById('tripName');
  const startDate = document.getElementById('startDate');
  const endDate = document.getElementById('endDate');
  const notes = document.getElementById('notes');

  // Create a container for displaying saved trips
  const tripList = document.createElement('div');
  tripList.id = 'tripList';
  document.querySelector('.travel-planner').appendChild(tripList);

  // Load from localStorage
  function loadTrips() {
    tripList.innerHTML = ''; // clear before adding
    const trips = JSON.parse(localStorage.getItem('trips')) || [];

    trips.forEach((trip, index) => {
      const card = document.createElement('div');
      card.className = 'trip-card';
      card.innerHTML = `
        <h3>${trip.name}</h3>
        <p><strong>Dates:</strong> ${trip.start} - ${trip.end}</p>
        <p>${trip.notes}</p>
        <button data-index="${index}" class="delete-btn">❌ Delete</button>
      `;
      tripList.appendChild(card);
    });

    // Add delete functionality
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        trips.splice(index, 1);
        localStorage.setItem('trips', JSON.stringify(trips));
        loadTrips();
      });
    });
  }

  // Save a new trip
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTrip = {
      name: tripName.value.trim(),
      start: startDate.value,
      end: endDate.value,
      notes: notes.value.trim()
    };

    const trips = JSON.parse(localStorage.getItem('trips')) || [];
    trips.push(newTrip);
    localStorage.setItem('trips', JSON.stringify(trips));

    form.reset();
    loadTrips();
  });

  loadTrips(); // Initial load
});
