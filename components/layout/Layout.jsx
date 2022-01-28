import { Fragment, useContext } from "react";

import MainHeader from "./MainHeader";
import Notification from "../ui/Notification";

import { NotificationContext } from "../../store/notificationContext";

function Layout({ children }) {
    const { notification } = useContext(NotificationContext);

    return (
        <Fragment>
            <MainHeader />
            <main>{children}</main>
            {notification && <Notification {...notification} />}
        </Fragment>
    );
}

export default Layout;
