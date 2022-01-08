import EventList from "../components/events/EventList";

import { getFeaturedEvents } from "../utils/api-utils";

function HomePage({ eventsData }) {
    return (
        <div>
            <EventList items={eventsData} />
        </div>
    );
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();

    return {
        props: { eventsData: featuredEvents },
        revalidate: 3600,
    };
}

export default HomePage;
