import { Container, ListGroupItem } from "react-bootstrap";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import Router from "next/router";

export default function Home(props) {
  let [loadingPos, setLoadingPos] = useState(true);
  let [geoloc, setGeoloc] = useState(null);
  let [geolocError, setGeolocError] = useState(null);
  let [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const geo = navigator.geolocation;

    geo.getCurrentPosition(
      (pos) => {
        console.log(pos);
        setGeoloc(pos);
        setLoadingPos(false);

        axios
          .get(
            "http://api.openweathermap.org/geo/1.0/reverse?lat=" +
              pos.coords.latitude +
              "&lon=" +
              pos.coords.longitude +
              "&limit=5&appid=" +
              props.OWMAPI
          )
          .then((res) => {
            const name = res.data[0].name;

            console.log(res.data[0]);

            Router.push("/city/" + name);
          });
      },
      (err) => {
        console.error("Error: " + err.message);
        setGeolocError(err.message);
      }
    );
  });

  return (
    <Container>
      <Head>
        <title>Meteo à {weatherData?.name ?? "undefined"}</title>
      </Head>
      {geolocError ? "Error getting localisation: " + geolocError : ""}
    </Container>
  );
}

export async function getStaticProps(params) {
  return {
    props: {
      OWMAPI: process.env.REACT_APP_API_KEY,
    },
  };
}
