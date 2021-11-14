import React from "react";
import { Layout } from "../layouts/Layout";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "../pages/auth/Login/Login";
import { Website } from "../pages/Website/Website";
import { NotFound } from "../pages/NotFound/NotFound";
import { Home } from "../pages/PasswordManager/Home/Home";
import { Register } from "../pages/auth/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export { AppRouter };
