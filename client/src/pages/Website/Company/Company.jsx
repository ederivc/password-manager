import React from "react";
import nvidia from "../../../assets/nvidia.png";
import google from "../../../assets/google.png";
import nintendo from "../../../assets/nintendo.png";
import samsung from "../../../assets/samsung.png";
import signal from "../../../assets/signal.png";
import spotify from "../../../assets/spotify.png";

import "./Company.scss";

const Company = () => {
  return (
    <div className="company">
      <div className="company__info">
        <h2>Who we work with</h2>
        <p>
          Today, millions of people around the world have successfully connected
          their accounts. We provide the tools they need to easily create and
          manage their passwords.
        </p>
        <button>About us</button>
      </div>
      <div className="company__grid">
        <div className="company__grid__item">
          <img src={nvidia} alt="" />
        </div>
        <div className="company__grid__item">
          <img src={google} alt="" />
        </div>
        <div className="company__grid__item">
          <img src={nintendo} alt="" />
        </div>
        <div className="company__grid__item">
          <img src={samsung} alt="" />
        </div>
        <div className="company__grid__item">
          <img src={signal} alt="" />
        </div>
        <div className="company__grid__item">
          <img src={spotify} alt="" />
        </div>
      </div>
    </div>
  );
};

export { Company };
