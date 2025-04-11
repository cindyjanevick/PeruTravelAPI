import { getEventsData } from './events.js';

let eventsData = {};
const selectedCity = window.selectedCity || "lima";

// Initial month and year (April 2025)
let currentMonth = 3; // 0-based index for months, so 3 = April
let currentYear = 2025;

document.addEventListener("DOMContentLoaded", async () => {
  eventsData = await getEventsData(); // Fetch event data
  renderCalendar(); // Render the calendar once the data is loaded
});

// Renders the calendar
function renderCalendar() {
  const calendarContainer = document.getElementById("calendar");
  calendarContainer.innerHTML = "";

  const city = window.selectedCity || getCityFromURL() || "lima";

  // Add the month title with dynamic month and year
  const monthTitle = document.createElement("div");
  monthTitle.className = "month-title full-span";
  monthTitle.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
  calendarContainer.appendChild(monthTitle);

  // Add navigation buttons (previous and next month)
  const navContainer = document.createElement("div");
  navContainer.className = "calendar-nav";
  const prevButton = document.createElement("button");
  prevButton.textContent = "← Previous";
  prevButton.addEventListener("click", () => changeMonth(-1));

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next →";
  nextButton.addEventListener("click", () => changeMonth(1));

  navContainer.appendChild(prevButton);
  navContainer.appendChild(nextButton);
  calendarContainer.appendChild(navContainer);

  // Weekday headers
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekdays.forEach(day => {
    const weekdayDiv = document.createElement("div");
    weekdayDiv.className = "calendar-weekday";
    weekdayDiv.textContent = day;
    calendarContainer.appendChild(weekdayDiv);
  });

  // Get the first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Add empty divs before the start of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-day empty";
    calendarContainer.appendChild(empty);
  }

  // Get the number of days in the month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Add the days of the month
for (let day = 1; day <= daysInMonth; day++) {
  const dayDiv = document.createElement("div");
  dayDiv.className = "calendar-day";
  dayDiv.textContent = day;
  dayDiv.dataset.day = day;

  // Check if there's an event on this day
  const cityEvents = eventsData[city] && eventsData[city][currentMonth + 1]; // JSON is 1-based
  const hasEvent = cityEvents && cityEvents.some(event => event.date === day);

  if (hasEvent) {
    dayDiv.classList.add("has-event"); // ✅ Highlight only event days
  }

  dayDiv.addEventListener("click", () => showEvent(day, city));
  calendarContainer.appendChild(dayDiv);
}

  // Set event section title dynamically
  const eventSectionTitle = document.querySelector(".calendar-section h2");
  if (eventSectionTitle) {
    eventSectionTitle.textContent = `📅 Events in ${capitalize(city)}`;
  }
}

// Helper function to get the name of the month
function getMonthName(month) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[month];
}

// Function to navigate to previous or next month
function changeMonth(direction) {
  currentMonth += direction;

  // If we go past December, move to January (next year)
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }

  renderCalendar(); // Re-render the calendar with the updated month/year
}

// Function to show event details in a modal
function showEvent(day, city) {
  const modal = document.getElementById("eventModal");
  const eventTitle = document.getElementById("eventTitle");
  const eventDesc = document.getElementById("eventDescription");
  const eventDate = document.getElementById("eventDate");
  const eventLocation = document.getElementById("eventLocation");

  // Get the events for the selected city and month
  const cityEvents = eventsData[city] && eventsData[city][currentMonth + 1]; // Adding 1 to currentMonth to align with 1-based month in JSON

  if (cityEvents) {
    // Find the event for the clicked day
    const event = cityEvents.find(e => e.date === day);

    if (event) {
      // If the event is found, display its details
      eventTitle.textContent = event.title;
      eventDesc.textContent = event.description;
      eventDate.textContent = `${getMonthName(currentMonth)} ${day}, ${currentYear}`;
      eventLocation.textContent = event.location;
      modal.style.display = "block";
    } else {
      // No event found for that day
      eventTitle.textContent = "No events available";
      eventDesc.textContent = "";
      eventDate.textContent = "";
      eventLocation.textContent = "";
      modal.style.display = "block";
    }
  } else {
    // If no events are found for the selected city/month
    eventTitle.textContent = "No events available";
    eventDesc.textContent = "";
    eventDate.textContent = "";
    eventLocation.textContent = "";
    modal.style.display = "block";
  }
}




// Helper function to get city from query string
function getCityFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('city')?.toLowerCase();
}

// Helper function to capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Close modal when clicking on X
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.querySelector(".modal .close");
  const modal = document.getElementById("eventModal");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  const modal = document.getElementById("eventModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  eventsData = await getEventsData();
  console.log('Fetched events data:', eventsData);
  renderCalendar(); // Render the calendar once the data is loaded
});

