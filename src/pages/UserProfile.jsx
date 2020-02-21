import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, connect } from "react-redux";

import * as authAction from "../store/actions/auth";
import { LOG_OUT } from "../store/types/types";
import { fontSize, colors } from "../utility/styleUtility";

const Div = styled.div`
  display: block;
  text-align: center;
  padding: 20px;
`;

const Button = styled.button`
  background-color: ${colors.darkBlue};
  color: ${colors.white};
  margin: 10px 0 15px;
  padding: 7px 14px;
  font-size: ${fontSize.normal};
  font-weight: 650;
  border: none;
  cursor: pointer;
`;

const UserProfile = props => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logOutHandler = async () => {
    await dispatch(authAction.Logout);
    props.setDefaultAttributesAction();
    localStorage.clear();
    history.push("/login");
  };

  return (
    <Div>
      <h1>You have logged in!!!</h1>
      <Button onClick={logOutHandler}>Logout</Button>
    </Div>
  );
};

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDefaultAttributesAction: () => dispatch({ type: LOG_OUT })
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserProfile)
);
