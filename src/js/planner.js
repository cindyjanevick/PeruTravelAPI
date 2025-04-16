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

  // Get today's date in YYYY-MM-DD format for the start date restriction
  const today = new Date().toISOString().split('T')[0];
  startDate.min = today;  // Start date cannot be in the past
  
  // Function to update the end date minimum value based on the start date
  startDate.addEventListener('change', () => {
    const start = new Date(startDate.value);
    const nextDay = new Date(start.setDate(start.getDate() + 1));
    endDate.min = nextDay.toISOString().split('T')[0]; // End date should be at least 1 day after start date
  });

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

    // Load existing trips from localStorage, add the new one, and save it again
    const trips = JSON.parse(localStorage.getItem('trips')) || [];
    trips.push(newTrip);
    localStorage.setItem('trips', JSON.stringify(trips));

    form.reset();
    loadTrips();  // Re-load trips to reflect the new addition
  });

  loadTrips(); // Initial load
});
