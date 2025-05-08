import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  justify-content: center;
  gap: 5rem;
  padding: 15px 50px;

  @media (max-width: 500px){
    flex-direction: column;
    gap: 0rem;
    justify-content: start;
    padding: 15px 10px;
  };

  div {
    display: flex;
    align-items: center;
    padding: 10px;
  };

  div > span {
    width: 1px;
    height: 80%;
    background-color: #ddd;
    margin: 10px;
  };

  ${({ theme }) => css`
    div > p {
      font-weight: ${theme.font.weight[500]};
      color: ${theme.colors.dark_charcoal};
    };
  `};
`;