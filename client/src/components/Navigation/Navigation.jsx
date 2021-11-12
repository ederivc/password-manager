import React, { useState, useEffect } from "react";
import { url } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Container,
  Nav,
  Navbar,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import "./Navigation.scss";

const Navigation = () => {
  const { name, isAuth, isLoading, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logoutUser();

    if (res.status === 200) {
      navigate("/login");
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={`${url}/img/password.png`} alt="passwordmanager" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#pricing">Services</Nav.Link>
            <Nav.Link href="#pricing">Contact us</Nav.Link>
            <Nav.Link href="#features">About</Nav.Link>
          </Nav>
          <Nav>
            {isAuth ? (
              <DropdownButton
                id="nav-dropdown"
                title={
                  <span>
                    <i className="fa fa-user fa-fw"></i>
                    {` ${name}`}
                  </span>
                }
              >
                <Dropdown.Item href="#/action-1">
                  <i className="fas fa-user-circle"></i> Account
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Sign out
                </Dropdown.Item>
              </DropdownButton>
            ) : (
              <Button
                className="nav-btn"
                variant="primary"
                as={Link}
                to="/login"
              >
                Sign In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { Navigation };
