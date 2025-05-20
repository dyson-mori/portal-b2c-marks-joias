import styled, { css } from "styled-components";

export const Container = styled.header`
  display: flex;

  align-items: center;

  width: 100%;

  margin-bottom: 10px;

  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
  };

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      p {
        font-size: ${theme.font.size.light};
      }
    };
  `};
`;