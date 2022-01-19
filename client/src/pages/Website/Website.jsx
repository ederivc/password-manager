import React from "react";
import { Hero } from "./Hero/Hero";
import { About } from "./About/About";
import { Company } from "./Company/Company";
import { Pricing } from "./Pricing/Pricing";
import { Services } from "./Services/Services";
import { Footer } from "../../components/Footer/Footer";

import "./Website.scss";

const Website = () => {
  return (
    <div className="website">
      <Hero />
      <Company />
      <Services />
      <Pricing />
      <About />
      <Footer />
    </div>
  );
};

export { Website };
