import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;

  width: 100%;

  flex-direction: column;

  padding: 15px 50px;

  @media (max-width: 500px){
    padding: 15px 0px;
  };

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

  width: 100%;

  justify-content: space-between;

  margin: 20px 0;

  div:first-child {
    margin: 0px 5px 0 0px;
  };

  div:last-child {
    margin: 0px 0px 0px 5px;
  };

  @media (max-width: 500px){

    div:first-child {
      margin: 0px 0px 0 0px;
    };

    div:last-child {
      margin: 0px 0px 0px 0px;
    };

    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;

    scroll-padding: 0 1rem; /* ajuda a alinhar bem */
    gap: 1rem;
    padding: 1rem;
  }
`;

export const Card = styled.div`
  display: flex;

  flex-direction: column;

  width: calc(100% / 4);

  margin: 0 5px;

  background-color: #fff;

  padding: 20px 5px;

  border-radius: 3px;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
  `};

  @media (max-width: 500px){
    min-width: 100%;
    scroll-behavior: smooth;
    scroll-snap-align: start;
  }
`;

export const CardHeader = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 15px;
    font-weight: 500;
    margin-top: 10px;
  };

  ${({ theme }) => css`
    h3 {
      color: ${theme.colors.dark_charcoal};
    }
  `};
`;

export const Message = styled.div`
  display: flex;

  align-items: center;
  height: 100%;

  padding: 20px 5px;

  p {
    font-size: 14px;
    text-align: center;
  };

  ${({ theme }) => css`
    p {
      color: ${theme.colors.dark_charcoal};
    }
  `};
`;

export const CardFooter = styled.div`
  display: flex;

  justify-content: space-between;

  padding: 10px;

  a {
    font-size: 12px;
    text-decoration:none;
    color: #555;
  };

  ${({ theme }) => css`
    p {
      font-size: 12px;
      color: ${theme.colors.dark_charcoal};
    }
  `};
`;