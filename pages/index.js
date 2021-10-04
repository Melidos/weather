import { Container, ListGroupItem } from "react-bootstrap";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import Router from "next/router";

export default function Home(props) {
  let [geolocError, setGeolocError] = useState(null);

  useEffect(() => {
    const geo = navigator.geolocation;

    geo.getCurrentPosition(
      (pos) => {
        axios
          .get(
            "https://api.openweathermap.org/geo/1.0/reverse?lat=" +
              pos.coords.latitude +
              "&lon=" +
              pos.coords.longitude +
              "&limit=5&appid=" +
              props.OWMAPI
          )
          .then((res) => {
            Router.push("/city/" + res.data[0].name);
          });
      },
      (err) => {
        setGeolocError(
          err.message === "User denied Geolocation"
            ? "Vous devez authoriser la géolocalisation"
            : err.message
        );
      }
    );
  });

  return (
    <Container>
      <Head>
        <title>Erreur de géolocalisation</title>
      </Head>
      {geolocError ? "Erreur: " + geolocError : ""}
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
