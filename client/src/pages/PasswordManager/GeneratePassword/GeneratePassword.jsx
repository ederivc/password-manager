import React, { useEffect, useState } from "react";
import RandExp from "randexp";
import { APIPasswords } from "../../../api/api";
import { useAlert } from "../../../hooks/useAlert";
import { CustomAlert } from "../../../components/Alert";
import { Container, Form, Row, Col } from "react-bootstrap";
import { CustomBtnRow } from "../../../components/Utilities";

import "./GeneratePassword.scss";

const GeneratePassword = () => {
  const [showAlert, displayAlert] = useAlert();
  const [password, setPassword] = useState("Password");
  const [validations, setValidations] = useState({
    characters: 10,
    symbols: true,
    numbers: true,
    capitals: true,
  });

  function shuffleRegex(text) {
    let a = text.split("");
    let n = a.length;

    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }

    return a.join("");
  }

  const generatePassword = () => {
    let regexExpression = `[a-z]{${validations.characters}}`;

    for (const [key, value] of Object.entries(validations)) {
      if (value === true) {
        switch (key) {
          case "symbols":
            regexExpression += "[-/:-@+$[-`{-~]{15}";
            break;

          case "numbers":
            regexExpression += "[0-9]{10}";
            break;

          case "capitals":
            regexExpression += "[A-Z]{10}";
            break;
        }
      }
    }

    const newRegexExpression = new RandExp(regexExpression).gen();

    const shuffledRegex = shuffleRegex(newRegexExpression);

    return shuffledRegex;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validations.characters < 5 || validations.characters > 20) {
      displayAlert("Number of characters must be between 5 and 20", "danger");
      return;
    }

    const res = await APIPasswords.createPassword(password);

    if (res.ok) {
      displayAlert("Your password has been saved successfully", "success");
      setValidations({
        characters: 10,
        symbols: true,
        numbers: true,
        capitals: true,
      });
    }
  };

  useEffect(() => {
    const newPassword = generatePassword();

    setPassword(newPassword.slice(0, validations.characters));
  }, [validations]);

  return (
    <Container className="password">
      <Form>
        <Container>
          <CustomAlert {...showAlert} />
          <h1>Generate Password</h1>
          <CustomBtnRow label="Number of Characters" colClass="password__col">
            <button
              type="button"
              onClick={() =>
                setValidations({
                  ...validations,
                  characters: validations.characters - 1,
                })
              }
            >
              <i className="fas fa-minus"></i>
            </button>
            <span className="mx-3">{validations.characters}</span>
            <button
              type="button"
              onClick={() =>
                setValidations({
                  ...validations,
                  characters: validations.characters + 1,
                })
              }
            >
              <i className="fas fa-plus"></i>
            </button>
          </CustomBtnRow>
          <CustomBtnRow
            label="Symbols?"
            colClass="password__col"
            icon={validations.symbols ? "fas fa-check" : "fas fa-times"}
            onClick={() =>
              setValidations({
                ...validations,
                symbols: !validations.symbols,
              })
            }
          />
          <CustomBtnRow
            label="Numbers?"
            colClass="password__col"
            icon={validations.numbers ? "fas fa-check" : "fas fa-times"}
            onClick={() =>
              setValidations({
                ...validations,
                numbers: !validations.numbers,
              })
            }
          />
          <CustomBtnRow
            label="Capital Letters?"
            colClass="password__col"
            icon={validations.capitals ? "fas fa-check" : "fas fa-times"}
            onClick={() =>
              setValidations({
                ...validations,
                capitals: !validations.capitals,
              })
            }
          />
          {/* <Row>
            <Col className="password__col">Category</Col>
            <Col className="password__col">
              <Form.Select aria-label="">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
          </Row> */}
          <Row>
            <Col className="password__col">
              <button type="submit" onClick={handleSubmit}>
                <span className="mx-2">Save</span>
                <i className="fas fa-lock mr-2"></i>
              </button>
            </Col>
            <Col className="password__col password__result">
              <div>
                <button type="button">{password}</button>
              </div>
            </Col>
          </Row>
        </Container>
      </Form>
    </Container>
  );
};

export { GeneratePassword };
