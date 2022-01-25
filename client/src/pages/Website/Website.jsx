import React from "react";
import { Hero } from "./Hero/Hero";
import { About } from "./About/About";
import { Company } from "./Company/Company";
import { Pricing } from "./Pricing/Pricing";
import { Services } from "./Services/Services";
import { Footer } from "../../components/Footer/Footer";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

import "./Website.scss";

const Website = () => {
  useDocumentTitle("Password Manager: Create and store your passwords");

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
