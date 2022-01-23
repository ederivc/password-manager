import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { APIUsers, url } from "../../../api/api";
import { useAlert } from "../../../hooks/useAlert";
import { CustomAlert } from "../../../components/Alert";
import { CustomInput } from "../../../components/CustomInput";
import { Container, Row, Button, Form } from "react-bootstrap";

const ForgotPassword = () => {
  const [showAlert, displayAlert] = useAlert();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().min(8).required().default(""),
  });

  const handleSubmit = async (data, props) => {
    const res = await APIUsers.forgotPassword(data);
    const json = await res.json();

    if (res.ok) {
      displayAlert(`${json.success}`, "success");
      props.resetForm();
    }

    if (res.status === 400) {
      displayAlert(`${json.error}`, "danger");
    }
  };

  return (
    <Container fluid className="login">
      <div className="login__content">
        <div className="login__info">
          <h1>Forgot Password</h1>
          <Formik
            initialValues={validationSchema.default()}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ handleSubmit }) => (
              <Form noValidate onSubmit={handleSubmit} className="login__form">
                <CustomAlert {...showAlert} />
                <Row>
                  <CustomInput label="Email" name="email" type="email" />
                </Row>
                <Button type="submit">Send Reset Link</Button>
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

export { ForgotPassword };
