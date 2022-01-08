export async function getAllEvent() {
    const getData = fetch("https://nextjs-course-3ef74-default-rtdb.firebaseio.com/events.json")
        .then((response) => response.json())
        .then((result) => {
            const tranferedData = [];

            for (const keys in result) {
                tranferedData.push({
                    id: keys,
                    ...result[keys],
                });
            }

            return tranferedData;
        });

    return getData;
}

export async function getFeaturedEvents() {
    const allEvent = await getAllEvent();
    return allEvent.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
    const allEvent = await getAllEvent();
    return allEvent.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const allEvent = await getAllEvent();

    let filteredEvents = allEvent.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}
