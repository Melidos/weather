import { ListGroup, ListGroupItem } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
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
    <ListGroup className='pt-2'>
      <Head>
        <title>Villes principales de France</title>
      </Head>
      {cities.map((city) => {
        return (
          <ListGroupItem key={city.id}>
            <Link href={`/city/${encodeURIComponent(city.id)}`} passHref>
              <a>{city.name}</a>
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
