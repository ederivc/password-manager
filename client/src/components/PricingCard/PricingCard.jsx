import React from "react";
import { Button } from "../Button/Button";

import "./PricingCard.scss";

const PricingCard = ({
  title,
  price,
  description,
  buttonText,
  className,
  children,
}) => {
  return (
    <div className={`pricing__card ${className}`}>
      <div className="pricing__card__header">
        <span>{title}</span>
        <strong>{price}</strong>
        <span>{description}</span>
      </div>
      <div className="pricing__card__body">{children}</div>
      <div className="pricing__card__footer">
        <Button text={buttonText} />
      </div>
    </div>
  );
};

export { PricingCard };
