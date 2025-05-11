import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;

  width: 100%;
  height: 100%;

  padding: 5px 10px;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      min-height: 150px;
    }
  `};
`;

export const Lottie = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Information = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  border: 0 1px 0 0 #000;

  ${({ theme }) => css`
    h4 {
      font-size: ${theme.font.size.light};
      font-weight: ${theme.font.weight[600]};
    };

    p {
      max-width: 70%;
      white-space: nowrap;
      overflow: hidden; /* "overflow" value must be different from "visible" */
      text-overflow: ellipsis;
      font-size: ${theme.font.size.light};
    };

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      margin-top: 10px;

      h4 {
        font-size: ${theme.font.size.light};
        font-weight: ${theme.font.weight[500]};
      };

      p {
        max-width: 75%;
      }
    };
  `};
`;