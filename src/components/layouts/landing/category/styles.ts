import styled, { css } from "styled-components";

export const Container = styled.section`
  padding: 15px 50px;

  button {
    border: 0;
    padding: 0;
    cursor: pointer;
  }

  h3 {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #e91e63;

    ${({ theme }) => css`
      font-family: ${theme.font.family.montserrat_alternates};
      font-size: ${theme.font.size.semiBold};
    `};
  };

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  };

  .categories {
    display: flex;
    justify-content: center;
  };

  .categories > button {
    position: relative;

    margin: 5px;

    width: 100%;
  };

  .categories > button > img {
    aspect-ratio: 1/1;
  };

  .categories > button:nth-child(1) {
    position: relative;

    margin-left: 0px;
  };

  .categories > button:last-child {
    position: relative;

    margin-right: 0px;
  };

  .categories > button > p {
    position: absolute;

    left: 50%;

    transform: translate(-50%);

    bottom: 10px;

    color: #fff;

    text-transform: capitalize;

    font-weight: 500;
    font-family: var(--font-montserrat-alternates), sans-serif;
    letter-spacing: 1.5px;

    ${({ theme }) => css`
      font-size: ${theme.font.size.normal};
    `};
  };

  @media (max-width: 500px){
    padding: 15px 10px;

    .categories {
      overflow: auto;
      justify-content: start;
      scrollbar-width: none;
      -ms-overflow-style: none; 
    };

    .categories > button {
      min-width: 35%;
    };
    
    ${({ theme }) => css`
      h3 {
        font-size: ${theme.font.size.medium};
      };
      .categories > button > p {
        font-weight: 400;
        font-size: ${theme.font.size.light};
      };
    `};
  };
`;