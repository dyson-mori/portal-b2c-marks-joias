import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  padding: 15px 50px;

  @media (max-width: 500px){
    padding: 15px 10px;
  };
`;

export const Description = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  margin: 40px 0;

  .landing-about-logo {
    position: relative;
  };

  .landing-about-logo > svg {
    position: absolute;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  .landing-about-texts {
    width: 100%;
    text-align: center;
    text-align: start;

    ${({ theme }) => css`
      .landing-about-title {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
      };

      .landing-about-title > h4 {
        margin: 15px 10px 15px 0;
      };

      h4 {
        font-size: ${theme.font.size.medium};

        background: linear-gradient(90deg, ${theme.colors.primary}, rgba(57,95,245,1)); /* ou qualquer cor */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        /* Compatibilidade adicional */
        background-clip: text;
        color: transparent;
      };

      p {
        font-size: ${theme.font.size.normal};
      };
    `};
  };

  @media (max-width: 500px){
    flex-direction: column;

    .landing-about-logo {
      height: 150px;
    };

    .landing-about-title {
      flex-direction: column;
    };

    .landing-about-title > h4 {
      text-align: center;
      margin: 15px;
    };
  };
`;

export const Images = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  #middle {
    width: 100%;
    margin-left: 10px;
  };
`;