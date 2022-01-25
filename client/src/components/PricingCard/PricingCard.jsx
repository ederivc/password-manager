import React from "react";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

import "./PricingCard.scss";

const PricingCard = ({
  title,
  price,
  description,
  buttonText,
  className,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <div className={`pricing__card ${className}`}>
      <div className="pricing__card__header">
        <span>{title}</span>
        <strong>{price}</strong>
        <span>{description}</span>
      </div>
      <div className="pricing__card__body">{children}</div>
      <div className="pricing__card__footer">
        <Button text={buttonText} onClick={() => navigate("/login")} />
      </div>
    </div>
  );
};

export { PricingCard };
