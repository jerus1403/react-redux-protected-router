import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { data } from "../data/data";
import { breakpoints } from "../utility/styleUtility";

const Container = styled.div`
  display: block;
  text-align: center;
  img {
    width: 100%;
  }
  @media (min-width: ${breakpoints.mobile}) {
    img {
      width: auto;
    }
  }
`;

const Category = () => {
  const params = useParams();
  const singleCategory = data.find(el => {
    if (el.id === parseInt(params.id)) {
      return el;
    }
  });
  return (
    <Container>
      <h1>{singleCategory.desc}</h1>
      <img src={singleCategory.url} alt={singleCategory.desc} />
    </Container>
  );
};

export default Category;
