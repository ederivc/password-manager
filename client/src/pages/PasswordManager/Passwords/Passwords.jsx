import React, { useState, useEffect } from "react";
import { Field, Formik } from "formik";
import { useAlert } from "../../../hooks/useAlert";
import { CustomAlert } from "../../../components/Alert";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { APICategory, APIPasswords } from "../../../api/api";
import { CustomInput } from "../../../components/CustomInput";
import { updatePasswordValidation } from "../../../common/Validations";
import { CustomCardText, CustomFormModal } from "../../../components/Utilities";

import "./Passwords.scss";

const Passwords = () => {
  const [showAlert, displayAlert] = useAlert();
  const [reload, setReload] = useAlert(false);
  const [passwords, setPasswords] = useState([]);
  const [categories, setCategories] = useState();
  const [passwordInfo, setPasswordInfo] = useState();
  const validationSchema = updatePasswordValidation();
  const [passwordToDelete, setPasswordToDelete] = useState();
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const fetchPasswords = async () => {
    const res = await APIPasswords.fetchPasswords();
    const json = await res.json();

    setPasswords(json);
  };

  const fetchCategories = async () => {
    const res = await APICategory.fetchCategories();
    let json = await res.json();

    if (!json.length) {
      setCategories([
        {
          name: "You haven't created any category",
        },
      ]);
      return;
    }

    const newArray = [{ name: "None" }];

    newArray.push(...json);

    setCategories(newArray);
  };

  useEffect(() => {
    fetchPasswords();
    fetchCategories();
  }, [reload]);

  const handleSubmit = async (data) => {
    const res = await APIPasswords.updatePasswords(data);
    const json = await res.json();

    if (res.ok) {
      displayAlert(json.success, "success");
      setReload(!reload);
      setShowModalUpdate(false);
    }

    if (res.status === 400) displayAlert(json.error, "danger");
  };

  const handleDelete = async () => {
    const res = await APIPasswords.deletePassword(passwordToDelete);
    const json = await res.json();

    if (res.ok) {
      displayAlert(json.success, "success");
      setReload(!reload);
      setShowModalDelete(false);
    }

    if (res.status === 400) displayAlert(json.error, "danger");
  };

  const showModalUpdateFunction = (passwordProp) => {
    const { name, password, _id, category, categoryName } = passwordProp;
    let displayCategory = "";

    if (!categories) {
      displayCategory = "You haven't created any category";
    }

    if (categories && !category) {
      displayCategory = categories[0].name;
    }

    if (category) displayCategory = categoryName;

    setPasswordInfo({
      id: _id,
      passwordName: name,
      password,
      category: displayCategory,
    });
    setShowModalUpdate(true);
  };

  const showModalDeleteFunction = (passwordProp) => {
    setPasswordToDelete(passwordProp._id);
    setShowModalDelete(true);
  };

  return (
    <Container className="passwords">
      <CustomAlert {...showAlert} />
      <h1>Passwords</h1>
      <Row className="mt-4">
        {passwords.map((password) => {
          return (
            <Col md={6} lg={4} key={password._id} className="my-2">
              <Card className="card">
                <CustomCardText className="card__header">
                  <strong>
                    <i className="fas fa-lock mr-2"></i> {password.name}
                  </strong>
                </CustomCardText>
                <Card.Body>
                  <CustomCardText
                    strong="Password"
                    span={password.password.replace(
                      password.password,
                      `${"*".repeat(password.password.length)}`
                    )}
                  />
                  <CustomCardText
                    strong="Category"
                    span={
                      password.categoryName ? password.categoryName : "None"
                    }
                  />
                  <CustomCardText
                    strong="Created at"
                    span={password.createdAt.slice(0, 10)}
                  />
                  <div className="d-flex justify-content-around">
                    <Button
                      variant="warning"
                      size="lg"
                      onClick={() => showModalUpdateFunction(password)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="lg"
                      onClick={() => showModalDeleteFunction(password)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      {showModalUpdate && (
        <CustomFormModal
          showProps={showModalUpdate}
          setShowProps={setShowModalUpdate}
          title="Edit Password"
          confirmBtn="Edit"
          handleSubmit={handleSubmit}
        >
          <Formik
            initialValues={passwordInfo}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ handleSubmit }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                className="passwords__form"
              >
                <Row>
                  <CustomInput
                    label="Password Name"
                    name="passwordName"
                    type="text"
                  />
                  <CustomInput label="Password" name="password" type="text" />
                  <Field name="category">
                    {({ field }) => {
                      return (
                        <Form.Group>
                          <Form.Label>Category</Form.Label>
                          <Form.Select {...field}>
                            {categories.map((category) => {
                              return (
                                <option
                                  key={category._id || "1"}
                                  value={category.name}
                                >
                                  {category.name}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                      );
                    }}
                  </Field>
                </Row>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowModalUpdate(false)}
                  >
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Edit Password
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </CustomFormModal>
      )}
      {showModalDelete && (
        <CustomFormModal
          showProps={showModalDelete}
          setShowProps={setShowModalDelete}
          title="Delete Password"
          confirmBtn="Delete"
          handleSubmit={handleDelete}
        >
          <p>Are you sure you want to delete this password?</p>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowModalDelete(false)}
            >
              No
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </CustomFormModal>
      )}
    </Container>
  );
};

export { Passwords };
