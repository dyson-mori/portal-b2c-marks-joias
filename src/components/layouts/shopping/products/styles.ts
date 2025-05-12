import styled, { css } from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      margin-bottom: 5px;
      flex-direction: row;
      justify-content: start;
      background-color: transparent;
      box-shadow: none;

      overflow-x: scroll;

      scroll-snap-type: x mandatory;

      aspect-ratio: 1 / 1;

      scrollbar-width: none;
    }
  `};
`;

export const CartEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Product = styled.div`
  position: relative;
  display: flex;

  padding: 5px 10px;

  width: 100%;
  align-items: center;

  .name {
    display: flex;
    padding: 0 20px;
  };

  .price {
    p {
      white-space: nowrap;
    };
  };

  .quantity {
    display: flex;
    justify-content: center;
    width: 50%;
  }

  img {
    aspect-ratio: 1/1;
  }

  ${({ theme }) => css`
    a {
      display: inline-block;
      font-weight: 600;
      color: ${theme.colors.dark_charcoal};
      font-size: ${theme.font.size.light};
      white-space: nowrap;
      text-wrap: nowrap;
      width: calc(100vw / 3.5);
      overflow: hidden; /* "overflow" value must be different from "visible" */
      text-overflow: ellipsis;
      text-decoration: none;
    };

    p {
      font-weight: 400;
      font-size: ${theme.font.size.light};
    };

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      height: 100%;
      padding: 0px;
      margin: 2px;
      aspect-ratio: 1/1;
      scroll-snap-align: start;

      img {
        width: 100%;
        height: 100%;
      };

      .name {
        position: absolute;

        width: 100%;
        justify-content: center;

        bottom: 60px;

        a {
          width: calc(100vw / 1.2);
          color: #fff;
          font-weight: 400;
        };
      };

      .price {
        display: none;
      };

      .quantity {
        position: absolute;

        width: 100%;

        bottom: 10px;
      };
    };
  `};
`;

export const AddQuantity = styled.div`
  display: flex;

  ${({ theme }) => css`
    svg {
      stroke: ${theme.colors.primary};
    }
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      font-size: ${theme.font.size.light};
    };
  `};

  button {
    border: 0px;
    background-color: transparent;
    width: 50px;
    height: 50px;
    cursor: pointer;
  };
`;

export const Delete = styled.button`
  border: 0;

  min-width: 50px;
  height: 50px;
  background-color: transparent;
  z-index: 5;

  transition: .3s;

  cursor: pointer;

  &:hover {
    background-color: #292D32aa;
    svg {
      stroke: #fff;
    }
  };

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      position: absolute;

      top: 15px;
      right: 15px;

      svg {
        width: 30px;
        height: 30px;
        stroke-width: 1.5;
      };
    };
  `};
`;