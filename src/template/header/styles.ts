import styled, { css } from 'styled-components';
import Link from "next/link";

export const Container = styled.header`
  position: sticky;
  top: 0;

  display: flex;

  width: 100%;
  height: 50px;

  padding: 0 50px;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};

    @media (max-width: 500px) {
      padding: 0;
      justify-content: space-between;
    };
  `};

  z-index: 1;
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
      font-size: ${theme.font.size.extraLight};
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

export const Nav = styled.nav`
  display: flex;

  align-items: center;

  padding: 0 60px;

  width: 100%;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      padding: 0 20px;
    };
  `};

  @media (max-width: 500px){
    display: none;
  };
`;

export const LinkStyle = styled(Link) <{ param: string }>`
  position: relative;

  padding: 15px;

  text-decoration: none;

  ${({ theme, param }) => css`
    font-size: ${theme.font.size.normal};
    font-weight: ${theme.font.weight[400]};
    color: ${theme.colors.dark_charcoal};
    
    ${param === 'true' && css`
      color: ${theme.colors.primary};
      font-weight: ${theme.font.weight[500]};
    `};

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      padding: 10px 15px;
    };
  `};
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