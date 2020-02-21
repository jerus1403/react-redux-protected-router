import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

import { colors, fontSize } from "../utility/styleUtility";

const Header = styled.header`
  display: block;
  padding: 15px;
  background-color: ${colors.darkBlue};
  border-bottom: 1px solid ${colors.white};
  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    list-style: none;
    margin: 0px;
  }
  ul li {
    margin: 5px 10px;
  }
  a {
    color: ${colors.white};
    text-decoration: none;
    font-size: ${fontSize.subHeading};
  }
`;

const NavBar = props => {
  return (
    <Header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Categories</Link>
          </li>
          <li>
            {props.auth.logInSuccess ? (
              <Link to='/user'>Profile</Link>
            ) : (
              <Link to='/login'>Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </Header>
  );
};

const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(NavBar);
