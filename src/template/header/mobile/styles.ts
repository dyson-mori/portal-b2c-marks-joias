import styled, { css } from 'styled-components';
import Link from "next/link";

export const Container = styled.header<{ $scrolled: boolean; $isLanding: boolean }>`
  position: fixed;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 50px;

  padding: 0 50px;

  ${({ theme, $scrolled, $isLanding }) => css`
    /* position: ${$isLanding ? 'fixed' : 'sticky'}; */

    background-color: #fff;
    /* background-color: ${$isLanding ? ($scrolled ? '#fff' : 'transparent') : '#fff'}; */
    box-shadow: ${$isLanding ? ($scrolled ? theme.settings.box.simple : 'none') : theme.settings.box.simple};

    @media (max-width: 500px) {
      padding: 0 25px;
    };
  `};

  z-index: 3;
  transition: .5s;
`;

export const Icon = styled(Link)`
  display: flex;
  position: relative;

  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  ${({ theme }) => css`
    p {
      position: absolute;
      top: 5px;
      left: 5px;
      color: ${theme.colors.primary};
      font-size: 60%;
      font-weight: ${theme.font.weight[700]};
    };

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      p {
        font-size: ${theme.font.size.thin};
        font-weight: ${theme.font.weight[600]};
      }
    };

    .logo {
      width: 100%;
      height: 100%;
      stroke: ${theme.colors.primary};
    };

    .shopping-cart {
      stroke: ${theme.colors.primary};
    }
  `};
`;

export const NavButton = styled.button`
  display: flex;

  justify-content: center;
  flex-direction: column;

  border: 0;
  background-color: transparent;

  width: 50px;
  height: 100%;

  ${({ theme }) => css`
    span {
      width: 30%;
      height: 2px;
      border-radius: 5px;
      background-color: ${theme.colors.primary};
      margin: 1.3px;
    }
  `};
`;

export const Menu = styled.div`
  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 300px;

  top: 0;
  left: 0;
  bottom: 0;

  background-color: #fff;
  
  z-index: 5;

  transition: .5s;

  ul {
    width: 100%;
  };

  li {
    list-style-type: none;
  };

  li > a {
    padding: 0 10px;

    height: 50px;
  };

  li > .sub-categories {
    
  }

  ${({ theme }) => css`
    a {
      display: flex;
      align-items: center;
      text-decoration: none;

      font-size: ${theme.font.size.normal};
      font-weight: ${theme.font.weight[400]};
      color: ${theme.colors.dark_charcoal};
    };

    svg {
      stroke: ${theme.colors.primary};
    };
  `};
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  transition: .5s;
`;

export const Drawer = styled.nav`
  display: none;
  position: absolute;

  width: 45%;
  height: 100vh;

  background-color: #f3f3f3;

  @media (max-width: 500px){
    display: flex;
  };
`;