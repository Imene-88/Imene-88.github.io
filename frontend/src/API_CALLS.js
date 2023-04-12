import axios from "axios";

export const loginAPICall = async (userInfo, dispatch) => {
  dispatch({ type: "USER_LOGIN" });
  try {
    const res = await axios.post("/user_authentication/login", userInfo);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "USER_LOGIN_ERROR", payload: error });
  }
};

export const registerAPICall = async (userInfo, dispatch) => {
  dispatch({ type: "USER_REGISTER" });
  try {
    const res = await axios.post("/user_authentication/register", userInfo);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: res.data });
  }
  catch(error) {
    dispatch({ type: "USER_REGISTER_ERROR", payload: error});
  }
};