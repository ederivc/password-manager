import React from "react";
import { Formik } from "formik";
import { APIUsers, url } from "../../../api/api";
import { useAlert } from "../../../hooks/useAlert";
import { CustomAlert } from "../../../components/Alert";
import { useParams, useNavigate } from "react-router-dom";
import { CustomInput } from "../../../components/CustomInput";
import { passwordSchema } from "../../../helpers/validations";
import { Container, Row, Button, Form } from "react-bootstrap";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { userId, token } = useParams();
  const [showAlert, displayAlert] = useAlert();

  const handleSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      displayAlert("Passwords do not match", "danger");
      return;
    }

    const userData = { ...data, userId, token };

    const res = await APIUsers.resetPassword(userData);
    const json = await res.json();

    if (res.ok) navigate("/login");

    if (res.status === 400) {
      displayAlert(`${json.error}`, "danger");
    }
  };

  return (
    <Container fluid className="login">
      <div className="login__content">
        <div className="login__info">
          <h1>Reset Password</h1>
          <Formik
            initialValues={passwordSchema.default()}
            validationSchema={passwordSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ handleSubmit }) => (
              <Form noValidate onSubmit={handleSubmit} className="login__form">
                <CustomAlert {...showAlert} />
                <Row>
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
                <Button type="submit">Reset Password</Button>
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

export { ResetPassword };
