import { useRouter } from "next/router";
import { Fragment } from "react";

import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/ErrorAlert";

function FilteredEventsPage() {
    const router = useRouter();

    const filterData = router.query.slug;

    if (!filterData) {
        return (
            <ErrorAlert>
                <p>Loading...</p>
            </ErrorAlert>
        );
    }

    const yearNum = +filterData[0];
    const monthNum = +filterData[1];

    if (
        (isNaN(yearNum) || isNaN(monthNum) || yearNum < 2021 || monthNum < 1 || monthNum > 12) &&
        filterData.length > 1
    ) {
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

    const filteredEvents = getFilteredEvents({
        year: yearNum,
        month: monthNum,
    });

    if ((!filteredEvents || filteredEvents.length === 0) && filterData.length > 1) {
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

    const date = new Date(yearNum, monthNum - 1);

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}

export async function getServerSideProps() {
    const getData = await fetch("https://nextjs-course-3ef74-default-rtdb.firebaseio.com/events.json")
        .then((response) => response.json())
        .then((result) => {
            const tranferedData = [];

            for (const keys in result) {
                tranferedData.push({
                    id: keys,
                    date: result[keys].date,
                    descrption: result[keys].description,
                    image: result[keys].image,
                    isFeatured: result[keys].isFeatured,
                    location: result[keys].location,
                    title: result[keys].title,
                });
            }

            return tranferedData;
        });

    const getFilteredEvents = (year, month) => {
        const filteredData = getData.filter((event) => {
            const date = new Date(event.date);

            return date.getFullYear() === year && date.getMonth() === month - 1;
        });

        return filteredData;
    };

    return {
        props: {},
    };
}

export default FilteredEventsPage;
