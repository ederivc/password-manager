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
          <Route exact path="/" element={<Website />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>

          <Route
            path="/home"
            element={
              !isLoading && (
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              )
            }
          ></Route>
          <Route exact path="*" element={<NotFound />}></Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export { AppRouter };
