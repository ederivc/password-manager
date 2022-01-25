import React from "react";
import { IconLink } from "../Utilities";

import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer__info">
          <div className="footer__info__up">
            <h4>Password Manager</h4>
            <p>
              We provide the best tools our users need to easily create and
              manage their passwords.
            </p>
          </div>
          <div className="footer__info__down">
            <IconLink icon="fab fa-facebook-f" />
            <IconLink icon="fab fa-twitter" />
            <IconLink icon="fab fa-instagram" />
            <IconLink icon="fab fa-linkedin-in" />
          </div>
        </div>
      </div>
      <div className="footer__copyright">
        <p>Copyright &#169; 2022 Password Manager.</p>
      </div>
    </>
  );
};

export { Footer };
