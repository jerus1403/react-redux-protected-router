import React from "react";
import styled from "styled-components";

import Form from "../components/Form";
import { breakpoints, colors } from "../utility/styleUtility";

const Div = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: ${breakpoints.mobile}) {
    padding: 50px 0;
  }
`;

const Login = () => {
  return (
    <Div>
      <Form />
    </Div>
  );
};

export default Login;
