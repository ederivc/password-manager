import React from "react";
import { Hero } from "./Hero/Hero";
import { Company } from "./Company/Company";
import { Pricing } from "./Pricing/Pricing";
import { Services } from "./Services/Services";

import "./Website.scss";

const Website = () => {
  return (
    <div className="website">
      <Hero />
      <Company />
      <Services />
      <Pricing />
    </div>
  );
};

export { Website };
