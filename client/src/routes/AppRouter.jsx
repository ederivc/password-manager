import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Layout } from "../layouts/Layout";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "../pages/auth/Login/Login";
import { Website } from "../pages/Website/Website";
import { NotFound } from "../pages/NotFound/NotFound";
import { Register } from "../pages/auth/Register/Register";
import { Account } from "../pages/PasswordManager/Account/Account";
import { Category } from "../pages/PasswordManager/Category/Category";
import { Passwords } from "../pages/PasswordManager/Passwords/Passwords";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ResetPassword } from "../pages/auth/ForgotPassword/ResetPassword";
import { Categories } from "../pages/PasswordManager/Categories/Categories";
import { ForgotPassword } from "../pages/auth/ForgotPassword/ForgotPassword";
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
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route
            exact
            path="/resetPassword/:userId/:token"
            element={<ResetPassword />}
          />
          {/* PRIVATE ROUTES */}
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
          <Route
            path="/categories/:categoryName/:categoryId"
            element={
              !isLoading && (
                <PrivateRoute>
                  <Category />
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
