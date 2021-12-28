import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { APICategory } from "../../../api/api";
import { useAlert } from "../../../hooks/useAlert";
import { CustomAlert } from "../../../components/Alert";
import { CustomInput } from "../../../components/CustomInput";
import { Container, Form, Row, Button, Table } from "react-bootstrap";

import "./Categories.scss";

const Categories = () => {
  const [showAlert, displayAlert] = useAlert();
  const [categories, setCategories] = useState();
  const [submited, setSubmited] = useState(false);
  const validationSchema = Yup.object().shape({
    category: Yup.string().min(5).max(15).required().default(""),
  });

  const handleSubmit = async (data, e) => {
    const res = await APICategory.createCategory(data);
    const json = await res.json();

    if (res.status === 200) {
      setSubmited(!submited);
      e.resetForm();
    }

    if (json.error) {
      displayAlert(json.error, "danger");
    }
  };

  const getCategories = async () => {
    const res = await APICategory.fetchCategories();
    const json = await res.json();

    setCategories(json);
  };

  useEffect(() => {
    getCategories();
  }, [submited]);

  return (
    <Container className="categories">
      <h1>Categories</h1>
      <CustomAlert {...showAlert} />
      <Formik
        initialValues={validationSchema.default()}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleSubmit }) => (
          <Form noValidate onSubmit={handleSubmit} className="categories__form">
            <Row>
              <CustomInput label="Category Name" name="category" />
            </Row>
            <Button type="submit">Create</Button>
          </Form>
        )}
      </Formik>
      <Row className="mt-4">
        <Table responsive striped className="categories__table mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Number of Passwords</th>
              <th>Created At</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.passwords}</td>
                  <td>{category.createdAt.slice(0, 10)}</td>
                  <td>
                    <Link to={`/categories/${category.name}/${category._id}`}>
                      <i className="fas fa-external-link-square-alt"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export { Categories };
