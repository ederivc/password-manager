import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { url } from "../../../api/api";
import { useAuth } from "../../../hooks/useAuth";
import { useAlert } from "../../../hooks/useAlert";
import { Form, Row, Button, Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CustomAlert } from "../../../components/Alert";
import { CustomInputText } from "../../../components/CustomInputText";

import "./Register.scss";

const Register = () => {
  const navigate = useNavigate();
  const { isAuth, registerUser } = useAuth();
  const [showAlert, displayAlert] = useAlert();
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(4).required().default(""),
    email: Yup.string().email().min(8).required().default(""),
    password: Yup.string().min(1).max(15).required().default(""),
    confirmPassword: Yup.string().min(1).max(15).required().default(""),
  });

  useEffect(() => {
    if (isAuth) navigate("/home");
  });

  const handleSubmit = async (data, props) => {
    if (data.password !== data.confirmPassword) {
      displayAlert("Passwords do not match", "danger");
      return;
    }

    const { res, json } = await registerUser(data);

    if (res.status === 200) {
      displayAlert(
        "Registration successfully completed, please check your email to activate your account",
        "success"
      );
      props.resetForm();
    } else {
      displayAlert(`${json.error}`, "danger");
    }
  };

  return (
    <Container className="wrapper">
      <div className="register">
        <Col md={6} className="register__img">
          <img src={`${url}/img/register.jpg`} alt="" />
        </Col>
        <Col md={6} className="register__form">
          <h2 className="form-title">Sign Up</h2>
          <Formik
            initialValues={validationSchema.default()}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ handleSubmit }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <CustomAlert {...showAlert} />
                <Row>
                  <CustomInputText label="Name" name="name" type="text" />
                  <CustomInputText label="Email" name="email" type="email" />
                  <CustomInputText
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <CustomInputText
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                  />
                </Row>
                <Button type="submit" className="register__btn">
                  Create Account
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </div>
    </Container>
  );
};

export { Register };
