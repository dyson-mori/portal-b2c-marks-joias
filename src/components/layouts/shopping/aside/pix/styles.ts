import styled, { css, keyframes } from "styled-components";

export const Container = styled.section`
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  min-width: calc(100vw / 3.5);
  max-width: calc(100vw / 3.5);

  h1 {
    font-size: 22px;
  }

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};

    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      width: 100%;
      margin-left: 0px;
    }
  `};
`;

export const Copy = styled.div`
  display: flex;

  justify-content: center;

  width: 100%;
  margin-bottom: 20px;

  .copy {
    display: flex;
    padding: 15px 10px;
    border-radius: 6px;
    background-color: #f4f4f4;
    width: 70%;
    
    p {
      width: 100%;
      white-space: nowrap;
      overflow: hidden; /* "overflow" value must be different from "visible" */
      text-overflow: ellipsis;
    };
  }

  button {
    margin-left: 5px;
    width: 55px;
    height: 55px;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    border-radius: 3px;
    background-color: #f4f4f4;

  };
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const Skeleton = styled.div`
  border-radius: 3px;
  background: #f0f0f0;
  background-image: linear-gradient(
    90deg,
    #f0f0f0 0px,
    #e0e0e0 40px,
    #f0f0f0 80px
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  animation: ${shimmer} 1.2s infinite linear;
`;