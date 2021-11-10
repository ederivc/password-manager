import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { Website } from "../pages/Website/Website";
import { Login } from "../pages/auth/Login/Login";
import { Register } from "../pages/auth/Register/Register";
import { Home } from "../pages/PasswordManager/Home/Home";
import { NotFound } from "../pages/NotFound/NotFound";

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Website />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>

          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="*" element={<NotFound />}></Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export { AppRouter };
