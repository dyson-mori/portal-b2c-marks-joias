import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: flex;
  justify-content: space-between;

  width: 100%;
  min-height: 85vh;
  padding: 10px 50px;

  ${({ theme }) => css`
    color: ${theme.colors.dark_charcoal};

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      padding: 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: auto;
    };
  `};
`;