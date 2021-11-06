import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { url } from "../../api/api";

import "./Login.scss";

const Login = () => {
  return (
    <Container fluid className="login">
      <div className="login__content">
        <div className="login__info">
          <h1>Iniciar Sesión</h1>
          <Form className="login__form">
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Usuario o correo electrónico</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Iniciar Sesión
            </Button>
            <Container className="form__register">
              ¿Aún no tienes cuenta? <Link to="/registro">Registrate</Link>
            </Container>
          </Form>
        </div>
        <div className="login__image">
          <img src={`${url}/img/password1.png`} alt="passwordmanager" />
        </div>
      </div>
    </Container>
  );
};

export { Login };
