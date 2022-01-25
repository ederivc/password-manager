import React, { useEffect } from "react";
import { Formik } from "formik";
import { url } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useAlert } from "../../../hooks/useAlert";
import { CustomAlert } from "../../../components/Alert";
import { CustomInput } from "../../../components/CustomInput";
import { registerSchema } from "../../../helpers/validations";
import { Form, Row, Button, Container, Col } from "react-bootstrap";

import "./Register.scss";

const Register = () => {
  const navigate = useNavigate();
  const { isAuth, registerUser } = useAuth();
  const [showAlert, displayAlert] = useAlert();

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
        "Registration successfully completed, please check your email or verify your SPAM to activate your account",
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
            initialValues={registerSchema.default()}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ handleSubmit }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <CustomAlert {...showAlert} />
                <Row>
                  <CustomInput label="Name" name="name" type="text" />
                  <CustomInput label="Email" name="email" type="email" />
                  <CustomInput
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <CustomInput
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
