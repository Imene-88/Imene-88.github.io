export const userLogin = (userInfo) => ({
    type: "USER_LOGIN",
});

export const userLoginSuccess = (user) => ({
  type: "USER_LOGIN_SUCCESS",
  payload: user,
});

export const userLoginError = (error) => ({
  type: "USER_LOGIN_ERROR",
  payload: error,
});

export const userRegister = (userInfo) => ({
  type: "USER_REGISTER",
});

export const userRegisterSuccess = (user) => ({
  type: "USER_REGISTER_SUCCESS",
  payload: user,
});

export const userRegisterError = (error) => ({
  type: "USER_REGISTER_ERROR",
  payload: error,
});