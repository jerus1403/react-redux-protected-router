import React, { useEffect } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import PrivateRoute from "./PrivateRoute";

import CategoryPage from "../pages/CategoryPage";
import LoginPage from "../pages/LoginPage";
import UserProfile from "../pages/UserProfile";
import NavBar from "../navigation/NavBar";
import Category from "../components/Category";

const Routes = props => {
  return (
    <div>
      <NavBar auth={props.state.auth} />
      <Switch>
        <Route exact path='/'>
          <CategoryPage />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/categories/:id'>
          <Category />
        </Route>
        <PrivateRoute path='/user' auth={props.state.auth}>
          <UserProfile />
        </PrivateRoute>
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  state: state
});

export default withRouter(connect(mapStateToProps)(Routes));
