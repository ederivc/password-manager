import React from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../../helpers/images";
import { Button } from "../../../components/Button/Button";

import "./Company.scss";

const Company = () => {
  const navigate = useNavigate();

  return (
    <div className="company">
      <div className="company__info">
        <h2>Who we work with</h2>
        <p>
          Today, millions of people around the world have successfully connected
          their accounts. We provide the tools they need to easily create and
          manage their passwords.
        </p>
        <Button text="Sign Up" onClick={() => navigate("/register")} />
      </div>
      <div className="company__grid">
        <div className="company__grid__item">
          <img src={IMAGES.NVIDIA} alt="nvidia" />
        </div>
        <div className="company__grid__item">
          <img src={IMAGES.GOOGLE} alt="google" />
        </div>
        <div className="company__grid__item">
          <img src={IMAGES.NINTENDO} alt="nintendo" />
        </div>
        <div className="company__grid__item">
          <img src={IMAGES.SAMSUNG} alt="samsung" />
        </div>
        <div className="company__grid__item">
          <img src={IMAGES.SIGNAL} alt="signal" />
        </div>
        <div className="company__grid__item">
          <img src={IMAGES.SPOTIFY} alt="spotify" />
        </div>
      </div>
    </div>
  );
};

export { Company };
