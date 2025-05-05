import styled, { css } from "styled-components";

export const Container = styled.header`
  display: flex;

  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 20px;

  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
  };

  ${({ theme }) => css`
    svg {
      stroke: ${theme.colors.primary};
    };
    p {
      font-size: ${theme.font.size.normal};
      font-weight: ${theme.font.weight[500]};
      margin-right: 8px;
    };
  `};
`;