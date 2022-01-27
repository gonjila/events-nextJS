import { useRef } from "react";
import classes from "./NewsletterRegistration.module.css";

function NewsletterRegistration() {
    const emailRef = useRef(null);

    function registrationHandler(event) {
        event.preventDefault();
        const enteredEmail = emailRef.current.value;

        fetch(`/api/userEmail`, {
            method: "POST",
            body: JSON.stringify(enteredEmail),
        })
            .then((res) => res.json())
            .then((result) => console.log("result", result));
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
                    <></>
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;
