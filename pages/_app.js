import Layout from "../components/Layout";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { Spinner, Container } from "react-bootstrap";

import "../styles/globals.css";
import styles from "../styles/_app.module.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Chargement...</title>
      </Head>
      <Layout>
        {loading ? (
          <Container
            className='d-flex justify-content-center'
            id={styles.mainAppContainer}
          >
            <Spinner
              animation='border'
              role='status'
              id={styles.loadingPageSpinner}
            >
              <span className='visually-hidden'>Chargement...</span>
            </Spinner>
          </Container>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </>
  );
}

export default MyApp;
