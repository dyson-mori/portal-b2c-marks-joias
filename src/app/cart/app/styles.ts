import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 10px 50px;

  min-height: 82vh;

  ${({ theme }) => css`
    color: ${theme.colors.text};

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      padding: 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    };
  `};
`;
