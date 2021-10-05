import axios from "axios";
import React, { useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import Head from "next/head";

import styles from "../../../styles/city.index.module.css";

export default function City(props) {
  useEffect(() => {
    console.log(props);
  });

  return (
    <Container fluid id={styles.mainContainer}>
      <Head>
        <title>Meteo à {props.name}</title>
      </Head>
      <div>
        <h1 id={styles.cityLocation}>
          {props.name}, {props.country}
        </h1>
        <span id={styles.timeUpdate}>
          Mis à jour à {props.hours}:{props.minutes}:{props.seconds}
        </span>
      </div>
      <Image
        src={props.icon}
        className='mx-auto d-block'
        alt={props.main}
        id={styles.logoWeather}
      />
      <div id={styles.mainTemp}>{props.temperature}°C</div>
      <div id={styles.secondaryContainer}>
        <div id={styles.minTemp}>{props.temp_min}°C</div>
        <div id={styles.maxTemp}>{props.temp_max}°C</div>
      </div>
      <div id={styles.mainWeather}>{props.main}</div>
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

  const d = new Date(Date.now());

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
      icon:
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png",
      weather: data.weather[0].main,
      revalidate: 3600,
      hours: d.getHours(),
      minutes: d.getMinutes(),
      seconds: d.getSeconds(),
    },
  };
}
