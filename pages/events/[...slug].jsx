import { Fragment } from "react";

import ErrorAlert from "../../components/ui/ErrorAlert";
import Button from "../../components/ui/button";
import ResultsTitle from "../../components/events/ResultsTitle";
import EventList from "../../components/events/EventList";

import { getFilteredEvents } from "../../utils/api-utils";

function FilteredEventsPage({ filteredEvents, dateNum, hasError }) {
    if (hasError) {
        return (
            <Fragment>
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
                <p>Loading...</p>
            </ErrorAlert>
        );
    }

    if (filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const eventDate = new Date(dateNum.year, dateNum.month);

    return (
        <Fragment>
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
        props: { filteredEvents: filteredData, dateNum: { year: yearNum, month: monthNum - 1 } },
    };
}

export default FilteredEventsPage;
