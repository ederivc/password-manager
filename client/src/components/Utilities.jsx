import { Row, Col } from "react-bootstrap";

const CustomBtnRow = ({
  label,
  colClass,
  icon = null,
  onClick = null,
  children,
}) => {
  return (
    <>
      <Row>
        <Col className={colClass}>
          <label>{label}</label>
        </Col>
        <Col className={colClass}>
          {children ? (
            children
          ) : (
            <button type="button" onClick={onClick}>
              <i className={icon}></i>
            </button>
          )}
        </Col>
      </Row>
    </>
  );
};

export { CustomBtnRow };
