import React from "react";

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
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
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
