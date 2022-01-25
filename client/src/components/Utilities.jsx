import { Link } from "react-router-dom";
import { Row, Col, Card, Modal } from "react-bootstrap";

const CustomBtnRow = ({
  label,
  colClass,
  rowClass = "",
  icon = null,
  onClick = null,
  children,
}) => {
  return (
    <Row className={`${rowClass} py-sm-2 py-0`}>
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
  );
};

const CustomCardText = ({ strong, span, className = null, children }) => {
  return (
    <Card.Text className={className}>
      {children ? (
        children
      ) : (
        <>
          <strong>{strong}: </strong>
          <span>{span} </span>
        </>
      )}
    </Card.Text>
  );
};

const CustomLink = ({ to, text, onClick }) => {
  return (
    <li>
      <Link to={to} onClick={onClick}>
        {text}
      </Link>
    </li>
  );
};

const CustomSpanLi = ({ text, onClick }) => {
  return (
    <li>
      <span onClick={onClick}>{text}</span>
    </li>
  );
};

const CustomAccountCol = ({ strong, text }) => {
  return (
    <Col md={4} className="my-2 my-md-0">
      <strong>{strong}: </strong>{" "}
      {text ? text : `You have not registered any ${strong.toLowerCase()}`}
    </Col>
  );
};

const CustomFormModal = ({ showProps, setShowProps, title, children }) => {
  const handleClose = () => setShowProps(false);

  return (
    <Modal show={showProps} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

const IconLink = ({ icon }) => {
  return (
    <a
      href="https://www.linkedin.com/in/eder-rivera-cisneros-b35a7521a"
      target="_blank"
    >
      <i className={icon}></i>
    </a>
  );
};

export {
  IconLink,
  CustomLink,
  CustomSpanLi,
  CustomBtnRow,
  CustomCardText,
  CustomFormModal,
  CustomAccountCol,
};
