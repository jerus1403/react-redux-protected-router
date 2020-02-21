import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={location =>
        auth.logInSuccess ? children : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
