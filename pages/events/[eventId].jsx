import { Fragment } from "react";

import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";

import { getEventById, getFeaturedEvents } from "../../utils/api-utils";

function EventDetailPage({ event }) {
    if (!event) {
        return (
            <Fragment>
                <div className="center">
                    <h3>Loading...</h3>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
}

export async function getStaticProps(context) {
    const eventId = context.params.eventId;

    const event = await getEventById(eventId);

    // თუ მონაცემები ვერ მოიძებნა 404 გვერდზე გადავიდეს, მაგრამ ჩვენ შექმნილიგვაქვს გვერდი მაგისთვის და არ გვჭირდება ეგ
    // if (!event) {
    //     return {
    //         notFound: true,
    //     };
    // }

    return {
        props: { event },
        revalidate: 1800,
    };
}

export async function getStaticPaths() {
    const featuredEvents = await getFeaturedEvents();

    const pathsWithParams = featuredEvents.map((event) => ({ params: { eventId: event.id } }));

    return {
        paths: pathsWithParams,
        fallback: true,
    };
}

export default EventDetailPage;
