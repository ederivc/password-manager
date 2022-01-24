import React, { useEffect } from "react";
import { Formik } from "formik";
import { url } from "../../../api/api";
import { useAuth } from "../../../hooks/useAuth";
import { useAlert } from "../../../hooks/useAlert";
import { Link, useNavigate } from "react-router-dom";
import { CustomAlert } from "../../../components/Alert";
import { loginSchema } from "../../../helpers/validations";
import { CustomInput } from "../../../components/CustomInput";
import { Container, Form, Button, Row } from "react-bootstrap";

import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const { isAuth, loginUser } = useAuth();
  const [showAlert, displayAlert] = useAlert();

  useEffect(() => {
    if (isAuth) navigate("/generatePassword");
  });

  const handleSubmit = async (data) => {
    const { res, json } = await loginUser(data);

    if (res.status === 200) {
      navigate("/generatePassword");
    } else {
      displayAlert(`${json.error}`, "danger");
    }
  };

  return (
    <Container fluid className="login">
      <div className="login__content">
        <div className="login__info">
          <h1>Sign In</h1>
          <Formik
            initialValues={loginSchema.default()}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ handleSubmit }) => (
              <Form noValidate onSubmit={handleSubmit} className="login__form">
                <CustomAlert {...showAlert} />
                <Row>
                  <CustomInput label="Email" name="email" type="email" />
                  <CustomInput
                    label="Password"
                    name="password"
                    type="password"
                  />
                </Row>
                <Button type="submit">Login</Button>
                <Container className="form__forgot">
                  <Link to="/forgotPassword">Forgot Password?</Link>
                </Container>
                <Container className="form__register">
                  Don't have an account? <Link to="/register">Register</Link>
                </Container>
              </Form>
            )}
          </Formik>
        </div>
        <div className="login__image">
          <img src={`${url}/img/password.png`} alt="passwordmanager" />
        </div>
      </div>
    </Container>
  );
};

export { Login };
