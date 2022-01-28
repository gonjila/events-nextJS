import { createContext, useState } from "react";

export const NotificationContext = createContext({
    notification: null, // { title, message, status }
    showNotification: () => {},
    hideNotification: () => {},
});

function NotificationContextProvider({ children }) {
    const [activeNotification, setActiveNotification] = useState();

    const showNotificationHandler = (notificationData) => {
        setActiveNotification(notificationData);
    };

    const hideNotificationHandler = () => {
        setActiveNotification(null);
    };

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
    };

    return <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>;
}

export default NotificationContextProvider;
