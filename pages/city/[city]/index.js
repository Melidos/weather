import axios from "axios";
import React from "react";
import { Container, Image } from "react-bootstrap";
import Head from "next/head";

import styles from "../../../styles/city.index.module.css";

export default function City(props) {
  const BACKGROUNDS = {
    Thunderstorm: "linear-gradient(#3f2c7b, #936cc7)",
    Drizzle: "linear-gradient(#1E4B47, #8DCAC4)",
    Rain: "linear-gradient(#1E4B47, #8DCAC4)",
    Snow: "linear-gradient(#F8F8F8, #B8B8B8)",
    Clear: "linear-gradient(#49A6DF, #EEF8FE)",
    Clouds: "linear-gradient(#7B8D93, #BECCCD)",
    Mist: "linear-gradient(#7B8D93, #BECCCD)",
    Smoke: "linear-gradient(#7B8D93, #BECCCD)",
    Haze: "linear-gradient(#7B8D93, #BECCCD)",
    Dust: "linear-gradient(#CFA068, #D9AB72)",
    Fog: "linear-gradient(#7B8D93, #BECCCD)",
    Sand: "linear-gradient(#CFA068, #D9AB72)",
    Ash: "linear-gradient(#756456, #A99187)",
    Squall: "linear-gradient(#69758B, #64788B)",
    Tornado: "linear-gradient(#69758B, #64788B)",
  };

  return (
    <Container
      fluid
      id={styles.mainContainer}
      style={{ background: BACKGROUNDS[props.weather] }}
    >
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
      <div>
        <Image
          src={props.icon}
          className='mx-auto d-block'
          alt={props.main}
          id={styles.logoWeather}
        />
        <div id={styles.mainWeather}>{props.main}</div>
      </div>
      <div id={styles.mainTemp}>{props.temperature}°C</div>
      <div id={styles.secondaryContainer}>
        <div id={styles.minTemp}>{props.temp_min}°C</div>
        <div id={styles.maxTemp}>{props.temp_max}°C</div>
      </div>
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
      hours: new Intl.NumberFormat("fr-FR", {
        minimumIntegerDigits: 2,
      }).format(d.getHours()),
      minutes: new Intl.NumberFormat("fr-FR", {
        minimumIntegerDigits: 2,
      }).format(d.getMinutes()),
      seconds: new Intl.NumberFormat("fr-FR", {
        minimumIntegerDigits: 2,
      }).format(d.getSeconds()),
    },
  };
}
