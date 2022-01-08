import Head from "next/head";

import EventList from "../components/events/EventList";

import { getFeaturedEvents } from "../utils/api-utils";

function HomePage({ eventsData }) {
    return (
        <div>
            <Head>
                <title>Featured Events</title>
                <meta name="description" content="Find a lot of greate events that allow you to evolve..." />
            </Head>
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
