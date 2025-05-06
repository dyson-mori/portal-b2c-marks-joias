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
  margin-top: 5px;

  ${({ theme }) => css`
    p {
      max-width: 70%;
      white-space: nowrap;
      overflow: hidden; /* "overflow" value must be different from "visible" */
      text-overflow: ellipsis;
    }
    h4 {
      font-size: ${theme.font.size.medium};
      font-weight: ${theme.font.weight[600]};
    };
  `};
`;