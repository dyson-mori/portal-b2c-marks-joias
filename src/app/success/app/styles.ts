import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;

export const Images = styled.section`
  display: flex;

  margin-bottom: 20px;
  img {
    margin: 5px;
  };
`;

export const Label = styled.section`
  display: flex;

  align-items: center;
  flex-direction: column;

  ${({ theme }) => css`
    h3 {
      font-size: ${theme.font.size.black};
      font-weight: ${theme.font.weight[500]};
      color: ${theme.colors.primary};
      margin-bottom: 5px;
    };

    p {
      color: ${theme.colors.dark_charcoal};
    };
  `};
`;