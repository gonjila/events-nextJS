import { Fragment } from "react";
import Head from "next/head";

import ErrorAlert from "../../components/ui/ErrorAlert";
import Button from "../../components/ui/ButtonComponent";
import ResultsTitle from "../../components/events/ResultsTitle";
import EventList from "../../components/events/EventList";

import { getFilteredEvents } from "../../utils/api-utils";

function FilteredEventsPage({ filteredEvents, dateNum, hasError }) {
    const pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content={`All events for ${dateNum.month}/${dateNum.year}`} />
        </Head>
    );

    if (hasError) {
        return (
            <Fragment>
                {pageHeadData}

                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    if (!filteredEvents) {
        return (
            <ErrorAlert>
                {pageHeadData}

                <p>Loading...</p>
            </ErrorAlert>
        );
    }

    if (filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageHeadData}

                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const eventDate = new Date(dateNum.year, dateNum.month - 1);

    return (
        <Fragment>
            {pageHeadData}

            <ResultsTitle date={eventDate} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;

    const yearNum = +params.slug[0];
    const monthNum = +params.slug[1];

    const filteredData = await getFilteredEvents({ year: yearNum, month: monthNum });

    if (isNaN(yearNum) || isNaN(monthNum) || yearNum < 2021 || monthNum < 1 || monthNum > 12) {
        return {
            props: { hasError: true },
        };
    }

    return {
        props: { filteredEvents: filteredData, dateNum: { year: yearNum, month: monthNum } },
    };
}

export default FilteredEventsPage;
