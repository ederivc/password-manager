import React from "react";

import "./Button.scss";

const Button = ({ text, onClick = null }) => {
  return (
    <button className="custom__button" onClick={onClick}>
      {text}
    </button>
  );
};

export { Button };
