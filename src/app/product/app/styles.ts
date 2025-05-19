import styled, { css } from 'styled-components';

export const Container = styled.main`
  width: 100%;
  padding: 25px 50px;

  
  ${({ theme }) => css`
    h2 {
      color: ${theme.colors.dark_charcoal};
      font-family: ${theme.font.family.montserrat_alternates};
    };

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

export const Tag = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 40px;
`;

export const Related = styled.section`
  display: flex;

  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;
`;