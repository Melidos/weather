import { Container, ListGroupItem } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

export default function Home(props) {
  let [loadingPos, setLoadingPos] = useState(true);
  let [geoloc, setGeoloc] = useState(null);
  let [geolocError, setGeolocError] = useState(null);

  useEffect(() => {
    const geo = navigator.geolocation;

    geo.getCurrentPosition(
      (pos) => {
        console.log(pos);
        setGeoloc(pos);
        setLoadingPos(false);
      },
      (err) => {
        console.error("Error: " + err.message);
        setGeolocError(err.message);
      }
    );
  });

  const cities = [
    { id: 2988507, name: "Paris" },
    { id: 2995469, name: "Marseille" },
    { id: 2996944, name: "Lyon" },
    { id: 2972315, name: "Toulouse" },
    { id: 6454924, name: "Nice" },
    { id: 2990969, name: "Nantes" },
    { id: 2992166, name: "Montpellier" },
    { id: 2973783, name: "Strasbourg" },
    { id: 3031582, name: "Bordeaux" },
    { id: 2998324, name: "Lille" },
    { id: 2983990, name: "Rennes" },
    { id: 2984114, name: "Reims" },
    { id: 2972328, name: "Toulon" },
    { id: 2980291, name: "Saint-Etienne" },
    { id: 3003796, name: "Le Havre" },
  ];

  return (
    <Container>
      <Head>
        <title>Meteo à {geoloc}</title>
      </Head>
      <Container
        style={{
          height: "30vh",
          margin: "0 auto",
          padding: "20px 0",
        }}
      >
        {" "}
        {geolocError ? (
          "Error getting localisation: " + geolocError
        ) : loadingPos ? (
          "Loading your location"
        ) : (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: props.googleAPI,
              libraries: "places",
            }}
            defaultCenter={{
              lat: geoloc.coords.latitude,
              lng: geoloc.coords.longitude,
            }}
            defaultZoom={11}
          ></GoogleMapReact>
        )}
      </Container>
    </Container>
  );
}

export async function getStaticProps(params) {
  return {
    props: {
      googleAPI: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    },
  };
}
