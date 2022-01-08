import Image from "next/image";

import styles from "./EventItem.module.css";
import Button from "../ui/ButtonComponent";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

function EventItem({ title, image, date, location, id }) {
    const humanReadibleDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const formattedAdress = location.replace(", ", "\n");

    return (
        <li className={styles.item}>
            <Image src={"/" + image} alt={title} width={200} height={200} />
            <div className={styles.content}>
                <div className={styles.sumarry}>
                    <h2>{title}</h2>
                    <div className={styles.date}>
                        <DateIcon />
                        <time>{humanReadibleDate}</time>
                    </div>
                    <div className={styles.address}>
                        <AddressIcon />
                        <address>{formattedAdress}</address>
                    </div>
                </div>
                <div className={styles.actions}>
                    <Button link={`/events/${id}`}>
                        <span>Explore Event</span>
                        <span className={styles.icon}>
                            <ArrowRightIcon />
                        </span>
                    </Button>
                </div>
            </div>
        </li>
    );
}

export default EventItem;
