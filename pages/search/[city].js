import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import cities from "../../public/city.list.json";
import Head from "next/head";

const levenSort = require("leven-sort");

export default function City(props) {
  if (props.cities.length === 0) {
    return (
      <div className='text-center pt-2 h1'>
        <Head>
          <title>Résultat de la recherche: {props.search}</title>
        </Head>
        Aucun résultat
      </div>
    );
  }
  return (
    <ListGroup className='pt-2'>
      <Head>
        <title>Résultat de la recherche: {props.search}</title>
      </Head>
      {props.cities.map((city) => {
        return (
          <ListGroupItem key={city.id}>
            <Link href={`/city/${encodeURIComponent(city.id)}`} passHref>
              <a>
                {city.name} - {city.country}
              </a>
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(params) {
  const citiesFiltered = levenSort(
    cities.filter((c) =>
      c.name
        .toLowerCase()
        .replace(/[-:;,\/\\]/g, " ")
        .replace("  ", " ")
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .includes(
          params.params.city
            .toLowerCase()
            .replace(/[-:;,\/\\]/g, " ")
            .replace("  ", " ")
        )
    ),
    params.params.city[0]
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toUpperCase() +
      params.params.city
        .slice(1, params.params.city.length)
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase(),
    ["name"]
  );

  return { props: { cities: citiesFiltered, search: params.params.city } };
}
