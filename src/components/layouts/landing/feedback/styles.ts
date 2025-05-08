import styled, { css } from "styled-components";

const prefix = {
  padding_spacing: '15px 50px'
};

export const Container = styled.section`
  display: flex;

  flex-direction: column;
  justify-content: center;

  padding: ${prefix.padding_spacing};

  ${({ theme }) => css`
    h2 {
      color: ${theme.colors.dark_charcoal};
      font-weight: 500;
      text-align: center;
    };
    span {
      color: ${theme.colors.primary};
      font-weight: 600;
    };
  `};
`;

export const Comments = styled.div`
  display: flex;
  justify-content: center;

  margin: 20px 0;

  span {
    width: calc(100% / 4.5);
    aspect-ratio: 1/1;

    margin: 5px;

    background-color: #f1f1f1;
  }
`;