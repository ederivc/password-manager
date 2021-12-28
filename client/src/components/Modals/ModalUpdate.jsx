import React from "react";
import { Formik, Field } from "formik";
import { Button, Form, Row, Modal } from "react-bootstrap";
import { CustomInput } from "../CustomInput";
import { CustomFormModal } from "../Utilities";

function ModalUpdate({
  showModalUpdate,
  setShowModalUpdate,
  handleSubmit,
  passwordInfo,
  validationSchema,
  categories,
}) {
  return (
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
          <Form noValidate onSubmit={handleSubmit} className="passwords__form">
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
  );
}

export { ModalUpdate };
