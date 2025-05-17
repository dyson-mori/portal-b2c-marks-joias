import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;

export const Images = styled.section`
  display: flex;

  margin-bottom: 20px;

  transition: .8s;

  img {
    margin: 5px;
  };
`;

export const Label = styled.section`
  display: flex;

  align-items: center;
  flex-direction: column;

  transition: .8s;

  ${({ theme }) => css`
    h3 {
      font-size: ${theme.font.size.black};
      font-weight: ${theme.font.weight[500]};
      color: ${theme.colors.primary};
      margin-bottom: 5px;
    };

    p {
      color: ${theme.colors.dark_charcoal};
    };
  `};
`;

export const SuccessLottie = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;