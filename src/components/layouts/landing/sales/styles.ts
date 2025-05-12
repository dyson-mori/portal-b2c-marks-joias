import styled, { css } from "styled-components";

export const Container = styled.section`
  padding: 15px 50px;

  h3 {
    margin-bottom: 0.5rem;
    font-weight: 600;

    ${({ theme }) => css`
      color: ${theme.colors.primary};
      font-family: ${theme.font.family.montserrat_alternates};
      font-size: ${theme.font.size.bold};
    `};
  };

  @media (max-width: 500px){
    padding: 15px 10px;

    ${({ theme }) => css`
      h3 {
        font-size: ${theme.font.size.medium};
      };
    `};
  };
`;

export const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  img {
    object-fit: cover;
    margin-bottom: 5px;
  };

  @media (max-width: 500px){
    justify-content: center;
    img {
      margin: 5px;
    };
  };
`;

export const ProductEmpty = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 60vh;
`;