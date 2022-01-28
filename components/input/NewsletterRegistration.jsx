import { useRef, useContext } from "react";

import classes from "./NewsletterRegistration.module.css";

import { NotificationContext } from "../../store/notificationContext";

function NewsletterRegistration() {
    const emailRef = useRef(null);
    const { showNotification, notification } = useContext(NotificationContext);

    function registrationHandler(event) {
        event.preventDefault();
        const enteredEmail = emailRef.current.value;

        showNotification({
            title: "Signing up...",
            message: "Registering for newsletter.",
            status: "pending",
        });

        fetch(`/api/userEmail`, {
            method: "POST",
            body: JSON.stringify(enteredEmail),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                return response.json().then((data) => {
                    throw new Error(data.message || "Something went wrong!");
                });
            })
            .then((data) => {
                showNotification({
                    title: "Success!",
                    message: "Successfully registered for newsletter.",
                    status: "success",
                });
            })
            .catch((err) => {
                showNotification({
                    title: "Error!",
                    message: err.message || "Something went wrong.",
                    status: "success",
                });
            });

        console.log(notification);
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        aria-label="Your email"
                        ref={emailRef}
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;
