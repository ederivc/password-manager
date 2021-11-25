import React, { useState, useEffect } from "react";
import { url } from "../../api/api";
import { CustomLink } from "../Utilities";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

import "./Navigation.scss";

const Navigation = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { name, isAuth, logoutUser } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
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
        <nav
          className={`header__content__nav ${
            menuOpen && size.width < 768 ? "isMenu" : ""
          }`}
        >
          <ul>
            {isAuth ? (
              <>
                <CustomLink
                  to="/passwords"
                  text="Passwords"
                  onClick={menuToggleHandler}
                />
                <CustomLink to="/" text="Manage" onClick={menuToggleHandler} />
                <CustomLink
                  to="/"
                  text="Categories"
                  onClick={menuToggleHandler}
                />
                <CustomLink
                  to="/generatePassword"
                  text="Generate"
                  onClick={menuToggleHandler}
                />
                <Link to="/account" onClick={menuToggleHandler}>
                  <button className="header__content__nav__btn">{name}</button>
                </Link>
              </>
            ) : (
              <>
                <CustomLink to="/" text="About" onClick={menuToggleHandler} />
                <CustomLink
                  to="/"
                  text="Discover"
                  onClick={menuToggleHandler}
                />
                <CustomLink
                  to="/"
                  text="Services"
                  onClick={menuToggleHandler}
                />
              </>
            )}
          </ul>
          {!isAuth ? (
            <Link to="/login" onClick={menuToggleHandler}>
              <button className="header__content__nav__btn">Sign In</button>
            </Link>
          ) : (
            <Link to="/" onClick={menuToggleHandler}>
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
