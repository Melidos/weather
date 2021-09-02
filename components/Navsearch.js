import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";

export default function Navsearch() {
  let [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <Navbar bg='light' expand='lg' className='px-2'>
      <Form
        className='d-flex mx-auto'
        style={{ width: "95%" }}
        onSubmit={(e) => {
          router.push("/search/" + search);
          e.preventDefault();
        }}
      >
        <FormControl
          type='search'
          placeholder='Rechercher'
          className='mr-2'
          aria-label='Rechercher'
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant='outline-info'>Search</Button>
      </Form>
    </Navbar>
  );
}
