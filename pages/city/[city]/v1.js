import axios from "axios";
import React from "react";
import { Container, Table } from "react-bootstrap";
import GoogleMapReact from "google-map-react";
import Head from "next/head";

import styles from "../../../styles/city.v1.module.css";

export default function City(props) {
  return (
    <Container>
      <Head>
        <title>Meteo à {props.data.name}</title>
      </Head>
      <Container id={styles.googleMapsContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: props.googleAPI,
            libraries: "places",
          }}
          defaultCenter={{
            lat: props.data.coord.lat,
            lng: props.data.coord.lon,
          }}
          defaultZoom={11}
        ></GoogleMapReact>
      </Container>
      <Table bordered hover id={styles.mainTable}>
        <tbody>
          <tr>
            <td>Météo</td>
            <td>{props.main}</td>
          </tr>
          <tr>
            <td>Température</td>
            <td>{props.temperature} °C</td>
          </tr>
          <tr>
            <td>Température Ressentie</td>
            <td>{props.feels_like} °C</td>
          </tr>
          <tr>
            <td>Température Minimum</td>
            <td>{props.temp_min} °C</td>
          </tr>
          <tr>
            <td>Température Maximum</td>
            <td>{props.temp_max} °C</td>
          </tr>
          <tr>
            <td>Pression</td>
            <td>{props.data.main.pressure} hPa</td>
          </tr>
          <tr>
            <td>Humidité</td>
            <td>{props.data.main.humidity} %</td>
          </tr>
          <tr>
            <td>Vent</td>
            <td>{props.data.wind.speed} m/s</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(params) {
  let searchString = "";
  if (isNaN(parseInt(params.params.city))) {
    searchString =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      params.params.city +
      "&lang=fr&appid=" +
      process.env.REACT_APP_API_KEY +
      "&units=metric";
  } else {
    searchString =
      "https://api.openweathermap.org/data/2.5/weather?id=" +
      params.params.city +
      "&appid=" +
      process.env.REACT_APP_API_KEY +
      "&units=metric&lang=fr";
  }

  const data = await axios.get(searchString).then((res) => res.data);

  console.log(data);

  return {
    props: {
      main: data.weather[0].description.replace(/^[a-z]/g, (c) =>
        c.toUpperCase()
      ),
      temperature: parseFloat(data.main.temp).toFixed(0),
      temp_min: parseFloat(data.main.temp_min).toFixed(0),
      temp_max: parseFloat(data.main.temp_max).toFixed(0),
      name: data.name,
      country: data.sys.country,
      icon: "http://openweathermap.org/img/wn/" + data.weather.icon + "@2x.png",
      data,
      revalidate: 3600,
      googleAPI: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    },
  };
}
