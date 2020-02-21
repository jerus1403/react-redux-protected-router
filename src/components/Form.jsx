import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, connect } from "react-redux";
import ReactLoading from "react-loading";

import Input from "./Input";
import { breakpoints, colors, fontSize } from "../utility/styleUtility";
import * as authAction from "../store/actions/auth";

const Error = styled.div`
  color: red;
  padding: 0 5px;
`;

const Button = styled.div`
  text-align: center;
  margin-top: 20px;
  button {
    margin: 10px 0 15px;
    padding: 7px 14px;
    background-color: ${props =>
      props.isDisabled ? colors.lightGray : colors.midBlue};
    color: ${props => (props.isDisabled ? colors.gray : colors.white)};
    cursor: ${props => (props.isDisabled ? "not-allowed" : "pointer")};
    font-size: ${fontSize.normal};
    font-weight: 650;
    border: none;
  }
`;

const Form = styled.form`
  display: block;
  text-align: center;
  width: 100%;
  min-width: 300px;
  padding: 0 20px 20px;
  background-color: ${colors.darkBlue};
  color: ${colors.white};
  h2 {
    text-align: center;
  }
  .spinner {
    margin: 10px auto 0;
  }

  @media (min-width: ${breakpoints.mobile}) {
    width: auto;
  }
`;

const Login = props => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/user" } };

  // INITIAL STATE FOR ALL THE INPUT FIELDS
  const intialState = {
    email: "",
    password: ""
  };
  // INITIAL STATE FOR ERRORS FROM THE INPUT FIELDS
  const errorInitialState = {
    emailError: "",
    emailValid: false,
    passwordError: "",
    passwordValid: false
  };

  const dispatch = useDispatch();
  const [field, setField] = useState(intialState);
  const [errorObject, setError] = useState(errorInitialState);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {}, [field, errorObject, intialState]);

  // ONCHANGE METHOD TO GET VALUE FROM ALL THE INPUT FIELDS
  const onChangeHandler = event => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    setField({
      ...field,
      [event.target.name]: value
    });
    // REGULAR EXPRESSIONS TO CHECK NUMERIC FIELD AND EMAIL FIELD
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

    let errors = errorObject;
    switch (name) {
      case "email":
        errors.emailError = emailRegex.test(value) ? "" : "Email is not valid";
        errors.emailValid = emailRegex.test(value) ? true : false;
        break;
      case "password":
        errors.passwordError = passwordRegex.test(value)
          ? ""
          : "Password is not valid";
        errors.passwordValid = passwordRegex.test(value) ? true : false;
        break;
      default:
        break;
    }
    setError({ ...errors });
  };

  const loginHandler = async event => {
    event.preventDefault();
    setLoading(true);
    await dispatch(authAction.Login(field.email, field.password));
    setLoading(false);
    history.replace(from);
  };

  // IF NO ERROR FROM THE INPUT FIELDS => isEnabled is TRUE
  const isEnabled = errorObject.emailValid && errorObject.passwordValid;

  return (
    <Form>
      <h2>LOGIN</h2>
      <Input
        label='Username'
        name='email'
        type='email'
        onChange={onChangeHandler}
        value={field.email}
        setField
      />
      {/* ------------------ERROR MESSAGE AREA------------------------ */}
      {!errorObject.emailValid ? <Error>{errorObject.emailError}</Error> : ""}
      <Input
        label='Password'
        name='password'
        type='password'
        onChange={onChangeHandler}
        value={field.password}
      />
      {/* ------------------ERROR MESSAGE AREA------------------------ */}
      {!errorObject.passwordValid ? (
        <Error>{errorObject.passwordError}</Error>
      ) : (
        ""
      )}
      {props.state.auth.logInFailed ? (
        <Error>{props.state.auth.logInError.message}</Error>
      ) : null}
      {isLoading ? (
        <ReactLoading
          className='spinner'
          type='spin'
          color={colors.lightBlue}
          height='40px'
          width='40px'
        />
      ) : (
        <Button isDisabled={!isEnabled}>
          <button onClick={loginHandler} disabled={isEnabled ? false : true}>
            Login
          </button>
        </Button>
      )}
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(mapStateToProps)(Login);
