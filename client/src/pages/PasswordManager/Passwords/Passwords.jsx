import React, { useState, useEffect } from "react";
import { useAlert } from "../../../hooks/useAlert";
import { CustomAlert } from "../../../components/Alert";
import { APICategory, APIPasswords } from "../../../api/api";
import { CustomCardText } from "../../../components/Utilities";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { updatePasswordSchema } from "../../../helpers/validations";
import { ModalDelete } from "../../../components/Modals/ModalDelete";
import { ModalUpdate } from "../../../components/Modals/ModalUpdate";

import "./Passwords.scss";

const Passwords = () => {
  const [showAlert, displayAlert] = useAlert();
  const [reload, setReload] = useAlert(false);
  const [passwords, setPasswords] = useState([]);
  const [categories, setCategories] = useState();
  const [passwordInfo, setPasswordInfo] = useState();
  const validationSchema = updatePasswordSchema();
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
        <ModalUpdate
          showModalUpdate={showModalUpdate}
          setShowModalUpdate={setShowModalUpdate}
          handleSubmit={handleSubmit}
          passwordInfo={passwordInfo}
          validationSchema={validationSchema}
          categories={categories}
        />
      )}
      {showModalDelete && (
        <ModalDelete
          showModalDelete={showModalDelete}
          setShowModalDelete={setShowModalDelete}
          handleDelete={handleDelete}
          title="Delete Password"
          text="Are you sure you want to delete this password?"
        />
      )}
    </Container>
  );
};

export { Passwords };
