import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { url } from "../../../api/api";
import { useAuth } from "../../../context/useAuth";
import { Form, Row, Button } from "react-bootstrap";
import { CustomInputText } from "../../../common/FormUtilities";

import "./Register.scss";

const Register = () => {
  const { registerUser } = useAuth();
  const validationSchema = Yup.object().shape({
    email: Yup.string().min(8).max(15).required().default(""),
    password: Yup.string().min(8).max(15).required().default(""),
    confirmPassword: Yup.string().min(8).max(15).required().default(""),
  });

  const handleSubmit = (data) => {
    registerUser(data);
  };

  return (
    <div className="wrapper">
      <div className="register">
        <div className="d-flex">
          <div className="register__img">
            <img src={`${url}/img/register.jpg`} alt="" />
          </div>
          <div className="register__content">
            <h2 className="form-title">Crear una Cuenta</h2>
            <Formik
              initialValues={validationSchema.default()}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ handleSubmit }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row>
                    <CustomInputText label="Nombre" name="name" type="text" />
                    <CustomInputText
                      label="Correo electrónico"
                      name="email"
                      type="text"
                    />
                    <CustomInputText
                      label="Contraseña"
                      name="password"
                      type="password"
                    />
                    <CustomInputText
                      label="Confirmar Contraseña"
                      name="confirmPassword"
                      type="password"
                    />
                  </Row>
                  <Button type="submit">Crear Cuenta</Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Register };
