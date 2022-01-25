import React, { useEffect, useReducer, createContext } from "react";
import { APIUsers } from "../api/api";
import { TYPES } from "../actions/authActions";
import { AuthReducer } from "../reducers/AuthReducer";
import { removeCookie, setCookie } from "../helpers/helpers";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    name: null,
    email: null,
    isAuth: null,
    isLoading: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const fetchAuthUser = async () => {
    const res = await APIUsers.fetchAuthUser();
    const data = await res.json();

    if (res.status === 200) {
      dispatch({ type: TYPES.USER_IS_AUTH, payload: data });
    } else if (res.status === 400) {
      dispatch({ type: TYPES.USER_IS_NOT_AUTH });
    }
  };

  const loginUser = async (data) => {
    const res = await APIUsers.loginUser(data);
    const json = await res.json();

    if (res.status === 200) {
      setCookie("access-token", json.accessToken, 30);
      dispatch({
        type: TYPES.USER_IS_AUTH,
        payload: {
          name: json.name,
          email: data.email,
        },
      });
    }

    return { res, json };
  };

  const registerUser = async (data) => {
    const res = await APIUsers.registerUser(data);
    const json = await res.json();

    return { res, json };
  };

  const logoutUser = async () => {
    const res = await APIUsers.logoutUser();
    dispatch({
      type: TYPES.LOGOUT_USER,
    });

    removeCookie("access-token");
    return { status: 200 };
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
        isLoading: state.isLoading,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
