const AuthReducer = (state, action) => {
    switch (action.type) {
      case "USER_LOGIN":
        return {
          user: null,
          isFetching: true,
          error: false,
        };
      case "USER_LOGIN_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "USER_LOGIN_ERROR":
        return {
          user: null,
          isFetching: false,
          error: true,
        };
      case "USER_REGISTER":
        return {
          user: null,
          isFetching: true,
          error: false,
        };
      case "USER_REGISTER_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "USER_REGISTER_ERROR":
        return {
          user: null,
          isFetching: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;