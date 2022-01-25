import React from "react";
import { PricingCard } from "../../../components/PricingCard/PricingCard";

import "./Pricing.scss";

const Pricing = () => {
  return (
    <div id="pricing">
      <h2 className="pricing-title">
        Choose a plan that <span>works for you</span>
      </h2>
      <div className="pricing">
        <PricingCard
          title="Basic"
          price="Free"
          description="Basic plan"
          buttonText="Try for free"
        >
          <ul className="pricing__list">
            <li>Unlimited passwords</li>
            <li>Access on one device type - computer or mobile</li>
            <li>Password generator</li>
            <li>Unlimited categories</li>
          </ul>
        </PricingCard>
        <PricingCard
          className="middle"
          title="Premium"
          price="$9.99"
          description="Premium includes everything in Free, plus:"
          buttonText="Coming soon"
        >
          <ul className="pricing__list">
            <li>Unlimited passwords</li>
            <li>Access on one device type - computer or mobile</li>
            <li>Password generator</li>
            <li>Unlimited categories</li>
          </ul>
        </PricingCard>
        <PricingCard
          title="Enterprise"
          price="$19.99"
          description="Enterprise includes everything in Premium, plus:"
          buttonText="Coming soon"
        >
          <ul className="pricing__list">
            <li>Unlimited passwords</li>
            <li>Access on one device type - computer or mobile</li>
            <li>Password generator</li>
            <li>Unlimited categories</li>
          </ul>
        </PricingCard>
      </div>
    </div>
  );
};

export { Pricing };
