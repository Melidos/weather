import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { Container, Navbar, Form, FormControl, Button } from "react-bootstrap";

import cities from "../public/city.list.json";

export default function Navsearch() {
  let [search, setSearch] = useState();
  const router = useRouter();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
  });

  function handleClick(e) {
    if (e.target.id !== "searchFormInput")
      document.getElementById("searchResultAutocomplete").innerHTML = "";
  }

  return (
    <>
      <Navbar bg='light' expand='lg' className='px-2'>
        <Form
          className='d-flex mx-auto'
          style={{ width: "95%" }}
          onSubmit={(e) => {
            if (search !== undefined) {
              document.getElementById("searchResultAutocomplete").innerHTML =
                "";
              router.push("/city/" + search.id);
              e.preventDefault();
            } else {
              e.preventDefault();
            }
          }}
        >
          <Container fluid>
            <FormControl
              type='search'
              placeholder='Rechercher'
              className='mr-2'
              id='searchFormInput'
              aria-label='Rechercher'
              onChange={(e) => {
                setSearch(
                  filterCities(
                    e.target.value
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toLowerCase()
                      .replace(/[-:;,\/\\]/g, " ")
                      .replace("  ", " ")
                  )
                );
                console.log(search);
              }}
              onFocus={(e) => {
                setSearch(
                  filterCities(
                    e.target.value
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toLowerCase()
                      .replace(/[-:;,\/\\]/g, " ")
                      .replace("  ", " ")
                  )
                );
                console.log(search);
              }}
            />
            <div
              style={{
                zIndex: "1",
                position: "absolute",
                background: "white",
                width: "94%",
                border: "1px solid gainsboro",
                borderRadius: "0 0 5px 5px",
              }}
              id='searchResultAutocomplete'
            ></div>
          </Container>
          <Button variant='outline-info'>Search</Button>
        </Form>
      </Navbar>
    </>
  );
}

function filterCities(name) {
  var results = [];
  if (name !== "") {
    results = cities
      .filter((c) =>
        c.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/[-:;,\/\\]/g, " ")
          .replace("  ", " ")
          .startsWith(name)
      )
      .sort((a, b) => a.name.length - b.name.length)
      .slice(0, 10);
  }
  AddandResetSeachResultAutocomplete(results);

  return results[0];
}

function AddandResetSeachResultAutocomplete(searchResult) {
  const parent = document.getElementById("searchResultAutocomplete");
  parent.innerHTML = "";
  if (searchResult.length === 0) {
    var e = document.createElement("a");
    e.setAttribute("class", "dropdown-item");
    e.setAttribute("href", "#");
    e.innerHTML = "Aucun résultat";
    parent.appendChild(e);
  } else {
    searchResult.forEach((element) => {
      var e = document.createElement("a");
      e.setAttribute("class", "dropdown-item");
      e.setAttribute("href", "/city/" + element.id);
      e.innerHTML = element.name;
      parent.appendChild(e);
    });
  }
}

/*
TODO:
-Ajouter un delai sur la recherche
-Ajouter une navigation en utilisant les fleches directionnelles sur l'input
*/
