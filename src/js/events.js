export async function getEventsData() {
    const response = await fetch("../data/events.json");
    const data = await response.json();
    return data;
  }
  