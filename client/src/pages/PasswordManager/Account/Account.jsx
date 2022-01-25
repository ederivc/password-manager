import React, { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { APIUsers, url } from "../../../api/api";
import { useAlert } from "../../../hooks/useAlert";
import { CustomAlert } from "../../../components/Alert";
import { accountSchema } from "../../../helpers/validations";
import { CustomInput } from "../../../components/CustomInput";
import { CustomAccountCol } from "../../../components/Utilities";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

import "./Account.scss";

const Account = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const [user, setUser] = useState({});
  const [showAlert, displayAlert] = useAlert();
  const [changeData, setChangeData] = useState(false);
  const [dataHasLoaded, setDataHasLoaded] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const validationSchema = accountSchema(user, changePassword);
  useDocumentTitle("Account · Password Manager");

  const fetchUserData = async () => {
    const res = await APIUsers.fetchUserInfo();
    const json = await res.json();

    if (json.birthDate) {
      json.birthDate = json.birthDate.slice(0, 10);
    }

    json.createdAt = json.createdAt.slice(0, 10);

    setUser(json);
  };

  const updateUser = async (data) => {
    const res = await APIUsers.updateUser(data);
    const json = await res.json();

    if (res.ok) {
      const resLogout = await logoutUser();

      if (resLogout.status === 200) {
        navigate("/login");
      }
    } else {
      displayAlert(json.error, "danger");
    }
  };

  const changePasswordFunction = () => {
    if (!ref.current.values.changePasswordYup) {
      ref.current.values.changePasswordYup = true;
    } else {
      ref.current.values.changePasswordYup = false;
    }
    setChangePassword(!changePassword);
    if (!dataHasLoaded) setDataHasLoaded(!dataHasLoaded);
  };

  const handleSubmit = (data) => {
    if (changePassword) {
      if (data.newPassword !== data.confirmPassword) {
        displayAlert("Your passwords don't match", "danger");
        return;
      }
    } else {
      delete data.changePasswordYup;
      if (typeof data.birthDate !== "string") delete data.birthDate;
      Object.keys(data).forEach((key) => {
        if (key.toLowerCase().includes("password")) {
          data[key] = "";
        }
      });
    }

    updateUser(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!changeData) {
      setDataHasLoaded(false);
    }
  }, [changeData]);

  return (
    <Container fluid>
      <Container className="account p-4">
        <h1>Account</h1>
        <Container className="my-4">
          <Row>
            <Row className="mb-4">
              <img src={`${url}/img/defaultUser.svg`} alt="" />
            </Row>
            <Row className="my-md-3">
              <CustomAccountCol strong="Name" text={user.name} />
              <CustomAccountCol strong="Email" text={user.email} />
              <CustomAccountCol strong="Phone Number" text={user.phoneNumber} />
            </Row>
            <Row className="my-md-3">
              <CustomAccountCol strong="Birth Date" text={user.birthDate} />
              <CustomAccountCol
                strong="Account created on"
                text={user.createdAt}
              />
            </Row>
          </Row>
        </Container>
        <Button type="button" onClick={() => setChangeData(!changeData)}>
          {!changeData ? "Change Personal Data?" : "Hide Form"}
        </Button>
        {changeData && (
          <Formik
            innerRef={ref}
            enableReinitialize
            initialValues={
              !dataHasLoaded ? validationSchema.default() : ref.current.values
            }
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ handleSubmit }) => (
              <Form noValidate onSubmit={handleSubmit} className="mb-5">
                <CustomAlert {...showAlert} />
                <p className="p__message mt-4">
                  Only modify the fields that you want to change
                </p>
                <p className="p__message mt-4">
                  For security reasons, you will be logged out of your account
                  if you change your data
                </p>
                <Row className="my-md-4">
                  <Col sm={12} md={6} className="py-2 py-md-0">
                    <CustomInput label="Name" name="name" type="text" />
                  </Col>
                  <Col sm={12} md={6} className="py-2 py-md-0">
                    <CustomInput label="Email" name="email" type="email" />
                  </Col>
                </Row>
                <Row className="my-md-4">
                  <Col sm={12} md={6} className="py-2 py-md-0">
                    <CustomInput
                      label="Phone number"
                      name="phoneNumber"
                      type="text"
                    />
                  </Col>
                  <Col sm={12} md={6} className="py-2 py-md-0">
                    <CustomInput
                      label="Birth Date"
                      name="birthDate"
                      type="date"
                    />
                  </Col>
                </Row>
                {changePassword && (
                  <>
                    <Row className="my-md-4">
                      <Col sm={12} md={6} className="py-2 py-md-0">
                        <CustomInput
                          label="New Password"
                          name="newPassword"
                          type="password"
                        />
                      </Col>
                      <Col sm={12} md={6} className="py-2 py-md-0">
                        <CustomInput
                          label="Confirm New Password"
                          name="confirmPassword"
                          type="password"
                        />
                      </Col>
                    </Row>
                    <Row className="my-md-4">
                      <Col sm={12} md={6} className="py-2 py-md-0">
                        <CustomInput
                          label="Current Password"
                          name="password"
                          type="password"
                        />
                      </Col>
                    </Row>
                  </>
                )}
                <Row>
                  <Col sm={12} md={6} className="py-2 py-md-0">
                    <Button type="button" onClick={changePasswordFunction}>
                      Change Password? {!changePassword ? "(Yes)" : "(No)"}
                    </Button>
                  </Col>
                  <Col
                    sm={12}
                    md={6}
                    className="py-2 py-md-0 d-flex justify-content-md-end"
                  >
                    <Button type="submit" onClick={handleSubmit}>
                      Update Account
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        )}
      </Container>
    </Container>
  );
};

export { Account };
