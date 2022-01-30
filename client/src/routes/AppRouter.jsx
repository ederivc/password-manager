import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Layout } from "../layouts/Layout";
import { PrivateRoute } from "./PrivateRoute";
import { publicRoutes, privateRoutes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRouter = () => {
  const { isLoading } = useAuth();

  return (
    <Router>
      <Layout>
        <Routes>
          {publicRoutes.map(({ path, Component }) => (
            <Route exact key={path} path={path} element={<Component />} />
          ))}
          {/* PRIVATE ROUTES */}
          {privateRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                !isLoading && (
                  <PrivateRoute>
                    <Component />
                  </PrivateRoute>
                )
              }
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
};

export { AppRouter };
