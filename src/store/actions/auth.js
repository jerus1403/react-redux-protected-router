import { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";

import { LOGIN_SUCCESS, LOGIN_FAILED, LOG_OUT } from "../types/types";
Auth.configure(awsconfig);

export const Login = (email, password) => {
  return async dispatch => {
    try {
      const user = await Auth.signIn(email, password);
      const userSession = user.signInUserSession;
      //   localStorage.setItem("token", userSession.idToken.jwtToken);
      dispatch({ type: LOGIN_SUCCESS, payload: userSession.idToken.jwtToken });
    } catch (err) {
      dispatch({ type: LOGIN_FAILED, payload: err });
    }
  };
};

export const Logout = () => {
  return async dispatch => {
    Auth.signOut()
      .then(data => {
        dispatch({ type: LOG_OUT });
      })
      .catch(err => console.log(err));
  };
};
