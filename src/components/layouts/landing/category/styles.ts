import styled, { css } from "styled-components";

export const Container = styled.section`
  padding: 15px 50px;

  h3 {
    font-weight: 600;
    margin-bottom: 0.5rem;

    ${({ theme }) => css`
      color: ${theme.colors.primary};
      font-family: ${theme.font.family.montserrat_alternates};
      font-size: ${theme.font.size.medium};
    `};
  };

  /* img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }; */

  @media (max-width: 500px){
    padding: 15px 10px;

    ${({ theme }) => css`
      h3 {
        font-size: ${theme.font.size.medium};
      };
    `};
  };
`;

export const List = styled.div`
  display: flex;
  justify-content: center;

  button {
    position: relative;

    border: 0;
    padding: 0;
    cursor: pointer;

    margin: 5px;

    width: 150px;
    height: 150px;
  };

  button > img {
    aspect-ratio: 1/1;
  };

  button > p {
    position: absolute;

    left: 50%;
    bottom: 10px;
    transform: translate(-50%);

    color: #fff;

    text-transform: capitalize;

    font-weight: 500;
    letter-spacing: 1.5px;

    ${({ theme }) => css`
      font-size: ${theme.font.size.light};
      font-family: ${theme.font.family.montserrat_alternates}
    `};
  };

  button:first-child {
    position: relative;
    margin-left: 0px;
  };

  button:last-child {
    position: relative;
    margin-right: 0px;
  };

  @media (max-width: 500px){
    overflow: auto;
    justify-content: start;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    ${({ theme }) => css`
    button > p {
      font-weight: 400;
      font-size: ${theme.font.size.light};
    };
  `};
  };
`;