import React from "react";

import "./Hero.scss";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__content">
        <h1>
          Password <strong>Manager</strong>
        </h1>
        <h2>World leaders in cybersecurity</h2>
        <span>Create and Store your passwords</span>
        <button>Explore now</button>
      </div>
    </div>
  );
};

export { Hero };
