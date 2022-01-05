import React from "react";
import video1 from "../../assets/video1.mp4";
import { Services } from "./Services/Services";
import { Company } from "./Company/Company";
import { Hero } from "./Hero/Hero";

import "./Website.scss";

const Website = () => {
  return (
    <div className="website">
      <Hero />
      <Company />
      <Services />
    </div>
  );
};

export { Website };
