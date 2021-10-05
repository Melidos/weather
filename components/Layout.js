import React from "react";
import { Container } from "react-bootstrap";

import Navsearch from "./Navsearch";

export default function Layout({ children }) {
  return (
    <>
      <Navsearch />
      <Container fluid className='m-0 p-0'>
        {children}
      </Container>
    </>
  );
}
