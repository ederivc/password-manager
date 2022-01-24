import React from "react";

import "./Button.scss";

const Button = ({ text }) => {
  return <button className="custom__button">{text}</button>;
};

export { Button };
