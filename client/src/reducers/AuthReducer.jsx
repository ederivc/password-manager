const AuthReducer = (state, action) => {
  switch (action.type) {
    case "userIsAuth":
      const { name, email } = action.payload;
      return {
        ...state,
        name,
        email,
        isAuth: true,
      };

    case "userIsNotAuth":
      return {
        ...state,
        isAuth: false,
      };
  }
};

export { AuthReducer };
