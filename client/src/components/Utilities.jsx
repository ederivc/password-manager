import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

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

const CustomCardText = ({ strong, span, className = null, children }) => {
  return (
    <>
      <Card.Text className={className}>
        {children ? (
          children
        ) : (
          <>
            <strong>{strong}: </strong>
            <span>{span}: </span>
          </>
        )}
      </Card.Text>
    </>
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

const CustomAccountCol = ({ strong, text }) => {
  return (
    <Col md={4} className="my-2 my-md-0">
      <strong>{strong}: </strong>{" "}
      {text ? text : `You have not registered any ${strong.toLowerCase()}`}
    </Col>
  );
};

export { CustomBtnRow, CustomCardText, CustomLink, CustomAccountCol };
