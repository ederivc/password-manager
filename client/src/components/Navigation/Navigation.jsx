import React, { useState, useEffect } from "react";
import { url } from "../../api/api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import "./Navigation.scss";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { name, isAuth, logoutUser } = useAuth();

  const menuToggleHandler = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLoginRedirect = () => {
    if (location.pathname !== "/login") menuToggleHandler();
    navigate("/login");
  };

  const handleLogout = async () => {
    const res = await logoutUser();

    if (res.status === 200) {
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <div className="header__content">
        <h2 className="header__content__logo">
          <Link to="/">
            <img src={`${url}/img/password.png`} alt="passwordmanager" />
          </Link>
        </h2>
        <nav className={`header__content__nav ${menuOpen ? "isMenu" : ""}`}>
          <ul>
            {isAuth ? (
              <>
                <li>
                  <Link to="/">Passwords</Link>
                </li>
                <li>
                  <Link to="/">Manage</Link>
                </li>
                <li>
                  <Link to="/">Groups</Link>
                </li>
                <li>
                  <Link to="/">Generate</Link>
                </li>
                <li>
                  <button className="header__content__nav__btn">{name}</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">About</Link>
                </li>
                <li>
                  <Link to="/">Discover</Link>
                </li>
                <li>
                  <Link to="/">Services</Link>
                </li>
              </>
            )}
          </ul>
          {!isAuth ? (
            <button
              onClick={handleLoginRedirect}
              className="header__content__nav__btn"
            >
              Sign In
            </button>
          ) : (
            <Link to="/">
              <button
                onClick={handleLogout}
                className="header__content__nav__logout"
              >
                Sign Out
              </button>
            </Link>
          )}
        </nav>
        <div className="header__content__toggle">
          {menuOpen ? (
            <i className="fas fa-times" onClick={menuToggleHandler}></i>
          ) : (
            <i className="fas fa-bars" onClick={menuToggleHandler}></i>
          )}
        </div>
      </div>
    </header>
  );
};

export { Navigation };
