import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { AppRouter } from "./routes/AppRouter";

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
};

export { App };
