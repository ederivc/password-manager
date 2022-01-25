import React from "react";

import "./Services.scss";

const Services = () => {
  return (
    <div className="services" id="services">
      <div className="services__flex">
        <div className="services__flex__item">
          <div className="item__header">
            <i className="fas fa-tools"></i>
            Create your password
          </div>
          <div className="item__body">
            <p>
              We provide you a wide variety of options so you can start creating
              and customizing your passwords
            </p>
          </div>
        </div>
        <i className="fas fa-arrow-down"></i>
        <div className="services__flex__item">
          <div className="item__header">
            <i className="fas fa-tools"></i>
            Organize your passwords
          </div>
          <div className="item__body">
            <p>
              Once you have created as many passwords as you want, you can
              organize them creating categories and filtering them
            </p>
          </div>
        </div>
      </div>
      <div className="services__title">
        <h2>
          Powerful tools to help you
          <span className="services__blue">create and manage</span> your
          passwords
        </h2>
      </div>
    </div>
  );
};

export { Services };
