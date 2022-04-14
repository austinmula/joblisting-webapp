const AuthReducer = (state, actions) => {
  switch (actions.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: actions.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: actions.payload,
      };
    case "LOGOUT":
      return {
        user: sessionStorage.removeItem("user") || null,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
