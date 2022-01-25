import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button/Button";

import "./Hero.scss";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="hero__content">
        <h1>
          Password <strong>Manager</strong>
        </h1>
        <h2>World leaders in cybersecurity</h2>
        <span>Create and Store your passwords</span>
        <Button text="Explore now" onClick={() => navigate("/login")} />
      </div>
    </div>
  );
};

export { Hero };
