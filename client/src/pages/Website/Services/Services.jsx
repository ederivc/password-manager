import React from "react";

import "./Services.scss";

const Services = () => {
  return (
    <div className="services">
      <div className="services__flex">
        <div className="services__flex__item">
          <div className="item__header">
            <i class="fas fa-tools"></i>
            Create your password
          </div>
          <div className="item__body">
            <p>
              We provide you a wide variety of options so you can start creating
              and customizing your password
            </p>
          </div>
        </div>
        <i class="fas fa-arrow-down"></i>
        <div className="services__flex__item">
          <div className="item__header">
            <i class="fas fa-tools"></i>
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
          <h2 className="services__blue">create and manage</h2> your passwords
        </h2>
      </div>
    </div>
  );
};

export { Services };
