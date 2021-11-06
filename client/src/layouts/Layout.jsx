import React from "react";
import { Navigation } from "../components/Navigation/Navigation";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export { Layout };
