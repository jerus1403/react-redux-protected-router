import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { data } from "../data/data";
import { breakpoints } from "../utility/styleUtility";

const Card = styled.div`
  display: inline;
  text-align: center;
  a {
    cursor: pointer;
  }
  img {
    box-shadow: 0 10px 6px -6px #777;
    width: 300px;
    height: 200px;
    @media (min-width: ${breakpoints.largeDesktop}) {
      width: 400px;
      height: 300px;
    }
  }
`;

const Div = styled.div`
  display: grid;
  grid-template-columns: 100%;
  margin-top: 30px;
  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: 33% 33% 33%;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    grid-template-columns: 50% 50%;
  }
`;

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Category = () => {
  const renderData = () => {
    return data.map(item => {
      return (
        <Card key={item.id}>
          <Link to={`/categories/${item.id}`}>
            <img src={item.url} alt={item.desc} />
          </Link>
          <h2>{item.desc}</h2>
        </Card>
      );
    });
  };
  return (
    <Container>
      <h1>Categories</h1>
      <Div>{renderData()}</Div>
    </Container>
  );
};

export default Category;
