import styled, { css, keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

export const NavButton = styled.button`
  display: none;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  border: 0;
  background-color: transparent;

  width: 50px;
  height: 100%;

  ${({ theme }) => css`
    span {
      width: 30%;
      height: 2px;
      border-radius: 5;
      background-color: ${theme.colors.primary};
      margin: 1.3px;
    }
  `};

  @media (max-width: 500px){
    display: flex;
  };
`;

export const Overlay = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
`;

export const Menu = styled.nav<{ isClosing: boolean }>`
  display: flex;

  align-items: center;
  flex-direction: column;

  width: 280px;
  height: 100vh;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  animation: ${({ isClosing }) => (isClosing ? slideOut : slideIn)} 0.3s forwards;

  ul {
    width: 100%;
  };

  li {
    padding: 10px 0px;
    list-style-type: none;
  };

  ${({ theme }) => css`
    a {
      display: flex;
      align-items: center;
      text-decoration: none;

      font-size: ${theme.font.size.normal};
      font-weight: ${theme.font.weight[400]};
      color: ${theme.colors.text};
    };

    svg {
      stroke: ${theme.colors.primary};
    };
  `};

`;