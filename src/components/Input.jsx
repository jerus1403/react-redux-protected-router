import React from "react";
import styled from "styled-components";

const Div = styled.div`
  width: auto;
  width: 90%;
  padding: 5px 15px;
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    width: 200px;
    height: 25px;
    padding: 0 3px;
  }
`;

const Input = props => {
  return (
    <Div>
      <label>{props.label}</label>
      <input
        placeholder=''
        onChange={props.onChange}
        value={props.value || ""}
        type={props.type}
        name={props.name}
      />
    </Div>
  );
};

export default Input;
