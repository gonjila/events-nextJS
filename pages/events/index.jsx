import { useRouter } from "next/router";

import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

import { getAllEvent } from "../../utils/api-utils";

function EventsPage({ eventsData }) {
    const router = useRouter();

    const findEventsHandler = (year, month) => {
        const fillPath = `/events/${year}/${month}`;

        router.push(fillPath);
    };

    return (
        <div>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={eventsData} />
        </div>
    );
}

export async function getStaticProps() {
    const allEvent = await getAllEvent();

    return {
        props: { eventsData: allEvent },
        revalidate: 3600,
    };
}

export default EventsPage;
