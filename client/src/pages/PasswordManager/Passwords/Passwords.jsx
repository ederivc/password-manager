import React, { useState, useEffect } from "react";
import { useAlert } from "../../../hooks/useAlert";
import { CustomAlert } from "../../../components/Alert";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { APIPasswords } from "../../../api/api";

import "./Passwords.scss";
import { CustomCardText } from "../../../components/Utilities";

const Passwords = () => {
  const [showAlert, displayAlert] = useAlert();
  const [passwords, setPasswords] = useState([]);

  const fetchPasswords = async () => {
    const res = await APIPasswords.fetchPasswords();
    const json = await res.json();
    setPasswords(json);
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

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
                  <CustomCardText strong="Password" span={password.password} />
                  <CustomCardText strong="Category" span="Category" />
                  <CustomCardText
                    strong="Created at"
                    span={password.createdAt}
                  />
                  <div className="d-flex justify-content-around">
                    <Button variant="warning" size="lg">
                      Editar
                    </Button>
                    <Button variant="danger" size="lg">
                      Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export { Passwords };
