import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 10px 50px;

  ${({ theme }) => css`
    color: ${theme.colors.text};

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      padding: ${theme.settings.responsive.padding};
      flex-direction: column;
      justify-content: center;
      align-items: center;
    };
  `};
  min-height: 82vh;
`;
