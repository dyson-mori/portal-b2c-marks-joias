import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  justify-content: center;
  gap: 5rem;
  padding: 15px 50px;

  @media (max-width: 500px){
    columns: 2;
    gap: 0rem;
    flex-wrap: wrap;
    justify-content: space-between;

    padding: 10px;
  };

  div {
    display: flex;
    margin: 5px;
    width: 40%;
    align-items: center;
    flex-direction: column;
  };

  div > p {
    margin-top: 5px;
    text-align: center;
    font-size: 90%;
    font-weight: 500;
  }

  ${({ theme }) => css`
    div > p {
      color: ${theme.colors.dark_charcoal};
    };
  `};
`;