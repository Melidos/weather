import React from "react";
import { Container } from "react-bootstrap";

import Navsearch from "./Navsearch";

export default function Layout({ children }) {
  return (
    <>
      <Navsearch />
      <Container>{children}</Container>
    </>
  );
}
