import axios from "axios";
import React from "react";
import { Container, Table } from "react-bootstrap";
import cities from "../../public/city.list.json";
import GoogleMapReact from "google-map-react";
import Head from "next/head";

export default function City(props) {
  return (
    <Container>
      <Head>
        <title>Meteo à {props.data.name}</title>
      </Head>
      <Container
        style={{
          height: "30vh",
          margin: "0 auto",
          padding: "20px 0",
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          defaultCenter={{
            lat: props.data.coord.lat,
            lng: props.data.coord.lon,
          }}
          defaultZoom={11}
        ></GoogleMapReact>
      </Container>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>Météo</td>
            <td>{props.data.weather[0].main}</td>
          </tr>
          <tr>
            <td>Température</td>
            <td>{props.data.main.temp} °C</td>
          </tr>
          <tr>
            <td>Température Ressentie</td>
            <td>{props.data.main.feels_like} °C</td>
          </tr>
          <tr>
            <td>Température Minimum</td>
            <td>{props.data.main.temp_min} °C</td>
          </tr>
          <tr>
            <td>Température Maximum</td>
            <td>{props.data.main.temp_max} °C</td>
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
  const data = await axios
    .get(
      "http://api.openweathermap.org/data/2.5/weather?id=" +
        params.params.city +
        "&appid=" +
        process.env.REACT_APP_API_KEY +
        "&units=metric&lang=fr"
    )
    .then((res) => res.data);

  return {
    props: {
      data,
      revalidate: 3600,
    },
  };
}
