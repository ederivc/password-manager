import React, { useEffect, useReducer, createContext } from "react";
import { APIUsers } from "../api/api";
import { AuthReducer } from "../reducers/AuthReducer";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    name: null,
    email: null,
    isAuth: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const fetchAuthUser = async () => {
    const res = await APIUsers.fetchAuthUser();
    const data = await res.json();

    if (res.status === 200) {
      dispatch({ type: "userIsAuth", payload: data });
    } else if (res.status == 400) {
      dispatch({ type: "userIsNotAuth" });
    }
  };

  const registerUser = async (data) => {
    if (data.password !== data.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    const res = await APIUsers.registerUser(data);
    const json = await res.json();

    console.log(res);
    console.log(json);
  };

  useEffect(() => {
    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        name: state.name,
        email: state.email,
        isAuth: state.isAuth,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
