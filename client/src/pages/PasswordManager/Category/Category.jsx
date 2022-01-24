import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "../../../hooks/useAlert";
import { CustomAlert } from "../../../components/Alert";
import { APICategory, APIPasswords } from "../../../api/api";
import { CustomCardText } from "../../../components/Utilities";
import { updatePasswordSchema } from "../../../helpers/validations";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ModalDelete } from "../../../components/Modals/ModalDelete";
import { ModalUpdate } from "../../../components/Modals/ModalUpdate";

const Category = () => {
  const [showAlert, displayAlert] = useAlert();
  const { categoryName, categoryId } = useParams();
  const [reload, setReload] = useState(false);
  const [passwords, setPasswords] = useState();
  const [categories, setCategories] = useState();
  const [passwordInfo, setPasswordInfo] = useState();
  const validationSchema = updatePasswordSchema();
  const [passwordToDelete, setPasswordToDelete] = useState();
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const fetchPasswords = async () => {
    const res = await APIPasswords.fetchCategoryPasswords(categoryId);
    const json = await res.json();

    setPasswords(json);
  };

  const fetchCategories = async () => {
    const res = await APICategory.fetchCategories();
    let json = await res.json();

    const newArray = [{ name: "None" }];

    newArray.push(...json);

    setCategories(newArray);
  };

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
    const { name, password, _id, categoryName } = passwordProp;

    setPasswordInfo({
      id: _id,
      passwordName: name,
      password,
      category: categoryName,
    });
    setShowModalUpdate(true);
  };

  const showModalDeleteFunction = (passwordProp) => {
    setPasswordToDelete(passwordProp._id);
    setShowModalDelete(true);
  };

  useEffect(() => {
    fetchPasswords();
    fetchCategories();
  }, [reload]);

  return (
    <Container className="passwords">
      <CustomAlert {...showAlert} />
      <h1>{categoryName} passwords</h1>
      <Row className="mt-4">
        {passwords?.map((password) => {
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
        />
      )}
    </Container>
  );
};

export { Category };
