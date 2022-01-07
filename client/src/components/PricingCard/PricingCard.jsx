import React from "react";

import "./PricingCard.scss";

const PricingCard = ({
  background,
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
        <button>{buttonText}</button>
      </div>
    </div>
  );
};

export { PricingCard };
