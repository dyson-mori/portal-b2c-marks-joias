import styled, { css } from 'styled-components';

export const Container = styled.main`
  width: 100%;
  padding: 25px 50px;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      padding: 25px 10px;
    };
  `};
`;

export const Content = styled.article`
  display: flex;

  justify-content: space-between;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      flex-direction: column;
      /* padding: ${theme.settings.responsive.padding}; */
      /* padding: 10px; */
    };
  `};
`;

export const LabelTag = styled.div`
  padding: 25px 0;

  ${({ theme }) => css`
    p {
      color: ${theme.colors.granite_gray};
    }
  `};
`;