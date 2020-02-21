import { LOG_OUT, LOGIN_SUCCESS, LOGIN_FAILED } from "../types/types";

const initialState = {
  logInSuccess: false,
  logInFailed: false,
  logInPayload: null,
  logInError: null
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        logInSuccess: true,
        logInPayload: action.payload
      };
    case LOGIN_FAILED:
      return {
        ...state,
        logInFailed: true,
        logInError: action.payload
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default Auth;
