import "../styles/globals.css";
import NotificationContextProvider from "../store/notificationContext";
import Layout from "../components/layout/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <NotificationContextProvider>
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Component {...pageProps} />
            </NotificationContextProvider>
        </Layout>
    );
}

export default MyApp;
