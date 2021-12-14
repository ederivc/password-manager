import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Layout } from "../layouts/Layout";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "../pages/auth/Login/Login";
import { Website } from "../pages/Website/Website";
import { NotFound } from "../pages/NotFound/NotFound";
import { Home } from "../pages/PasswordManager/Home/Home";
import { Register } from "../pages/auth/Register/Register";
import { Account } from "../pages/PasswordManager/Account/Account";
import { Passwords } from "../pages/PasswordManager/Passwords/Passwords";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Categories } from "../pages/PasswordManager/Categories/Categories";
import { GeneratePassword } from "../pages/PasswordManager/GeneratePassword/GeneratePassword";

const AppRouter = () => {
  const { isLoading } = useAuth();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Website />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          {/* PRIVATE ROUTES */}
          <Route
            path="/home"
            element={
              !isLoading && (
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              )
            }
          />
          <Route
            path="/generatePassword"
            element={
              !isLoading && (
                <PrivateRoute>
                  <GeneratePassword />
                </PrivateRoute>
              )
            }
          />
          <Route
            path="/passwords"
            element={
              !isLoading && (
                <PrivateRoute>
                  <Passwords />
                </PrivateRoute>
              )
            }
          />
          <Route
            path="/account"
            element={
              !isLoading && (
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              )
            }
          />
          <Route
            path="/categories"
            element={
              !isLoading && (
                <PrivateRoute>
                  <Categories />
                </PrivateRoute>
              )
            }
          />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export { AppRouter };
