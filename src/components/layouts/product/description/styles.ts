import styled, { css } from 'styled-components';

export const Container = styled.section`
  width: 80%;
  padding: 0 40px;

  ${({ theme }) => css`
    pre {
      white-space: pre-wrap;
      color: ${theme.colors.granite_gray};
      width: 100%;
    }
    h1 {
      font-size: 24px;
      color: ${theme.colors.dark_charcoal};
      font-weight: ${theme.font.weight[600]};
    };
    h2 {
      font-size: 24px;
      color: ${theme.colors.dark_charcoal};
      font-weight: ${theme.font.weight[800]};
    };
    ${({ theme }) => css`
      @media (max-width: ${theme.settings.responsive.maxWidth}) {
        padding: 0;
        width: 100%;
      };
    `};
  `};
`;

export const Delivery = styled.div`
  display: flex;

  align-items: center;

  margin: 15px 0px;

  p {
    ${({ theme }) => css`
      color: #47C747;
      font-size: 13px;
      font-weight: ${theme.font.weight[500]};
    `};
  }
`;