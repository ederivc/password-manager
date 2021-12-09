const authReducer = (state, action) => {
  switch (action.type) {
    case "USER_IS_AUTH":
      const { name, email } = action.payload;
      return {
        ...state,
        name,
        email,
        isAuth: true,
        isLoading: false,
      };

    case "USER_IS_NOT_AUTH":
      return {
        ...state,
        isAuth: false,
        isLoading: false,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        name: "",
        email: "",
        isAuth: false,
        isLoading: true,
      };

    default:
      break;
  }
};

export { authReducer };
