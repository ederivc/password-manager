import { useField } from "formik";
import { Form } from "react-bootstrap";

const CustomInput = ({ label, name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <>
      <Form.Group controlId={name} className="form-group">
        <Form.Label>{label}</Form.Label>
        <Form.Control {...field} {...props} isInvalid={!!meta.error} />
        {meta.touched && meta.error ? (
          <Form.Control.Feedback type="invalid">
            {meta.error}
          </Form.Control.Feedback>
        ) : null}
      </Form.Group>
    </>
  );
};

export { CustomInput };
