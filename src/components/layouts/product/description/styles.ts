import styled, { css } from 'styled-components';

export const Container = styled.section`
  padding: 0 40px;

  width: calc(100% / 2);

  ${({ theme }) => css`
    pre {
      white-space: pre-wrap;
      color: ${theme.colors.granite_gray};
      width: 100%;
    };

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

    .discount {
      font-size: 14px;
      color: ${theme.colors.philippine_gray};
    };

    ${({ theme }) => css`
      @media (max-width: ${theme.settings.responsive.maxWidth}) {
        padding: 0;
        width: 100%;
        margin-top: 10px;
      };
    `};
  `};
`;

export const Delivery = styled.div<{ $isItInStock?: boolean }>`
  display: flex;

  align-items: center;

  margin: 15px 0px;

  ${({ theme, $isItInStock }) => css`
    p {
      font-size: 13px;
      color: ${$isItInStock ? theme.colors.primary : theme.colors.success};
      font-weight: ${theme.font.weight[500]};
    };
  `};
`;