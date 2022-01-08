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
