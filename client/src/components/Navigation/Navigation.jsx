import React from "react";
import { url } from "../../api/api";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Navigation.scss";

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={`${url}/img/password1.png`} alt="passwordmanager" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#pricing">Servicios</Nav.Link>
            <Nav.Link href="#pricing">Contactanos</Nav.Link>
            <Nav.Link href="#features">Acerca de</Nav.Link>
            <Nav.Link href="#features">Registrate</Nav.Link>
          </Nav>
          <Nav>
            <Button className="nav-btn" variant="primary" as={Link} to="/login">
              Iniciar Sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { Navigation };
