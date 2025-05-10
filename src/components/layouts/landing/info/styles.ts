import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  justify-content: center;
  gap: 5rem;
  padding: 15px 50px;

  @media (max-width: 500px){
    flex-direction: column;
    align-items: center;
    gap: 0rem;
  };

  div {
    display: flex;
    margin: 5px;
    align-items: center;
    flex-direction: column;
    padding: 10px;
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