import styled, { css } from 'styled-components';

export const Container = styled.main`
  display: flex;

  justify-content: space-between;

  padding: 50px;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      flex-direction: column;
      padding: ${theme.settings.responsive.padding};
    };
  `};
`;
