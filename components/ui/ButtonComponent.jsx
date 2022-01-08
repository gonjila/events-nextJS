import Link from "next/link";

import styles from "./ButtonComponent.module.css";

function Button({ link, children, onClick }) {
    if (link) {
        return (
            <Link href={link}>
                <a className={styles.btn}>{children}</a>
            </Link>
        );
    }

    return (
        <button className={styles.btn} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
