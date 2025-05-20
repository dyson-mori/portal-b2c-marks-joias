import styled, { css } from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;

  padding: 10px;

  div:last-child {
    border: 0px;
  };

  ${({ theme }) => css`
    /* box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white}; */

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      margin-bottom: 5px;
      flex-direction: row;
      justify-content: start;
      background-color: transparent;
      box-shadow: none;

      overflow-x: scroll;
      overflow-y: hidden;

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

  padding: 10px;

  width: 100%;
  align-items: center;

  /* .quantity {
    display: flex;
    justify-content: center;
    width: 50%;
  }; */

  img {
    width: 100px;
    height: 100px;
    aspect-ratio: 1/1;
  }

  border-bottom: 1px solid #f4f4f4;

  ${({ theme }) => css`
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

      /* .quantity {
        position: absolute;

        width: 100%;

        bottom: 10px;
      }; */
    };
  `};
`;

export const TitleDescription = styled.div`
  display: flex;

  justify-content: center;

  flex-direction: column;
  padding: 0 10px;

  width: 100%;
  height: 100%;

  /* border: 1px dashed #555; */

  a {
    display: inline-block;
    font-weight: 600;
    white-space: nowrap;
    text-wrap: nowrap;
    width: calc(100vw / 3.5);
    overflow: hidden; /* "overflow" value must be different from "visible" */
    text-overflow: ellipsis;
    text-decoration: none;
  };

  p {
    display: -webkit-box;
    -webkit-line-clamp: 2; /* máximo de 3 linhas */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 5px;
  };

  ${({ theme }) => css`
    a {
      color: ${theme.colors.dark_charcoal};
      font-size: ${theme.font.size.light};
    };
    
    p {
      font-weight: 400;
      color: ${theme.colors.granite_gray};
      font-size: ${theme.font.size.light};
    };

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      position: absolute;

      width: 100%;
      justify-content: center;

      bottom: 60px;

      a {
        color: #fff;
        font-weight: 400;
        width: calc(100vw / 1.2);
      };
    };
  `};
`;

export const Price = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  /* width: 100%; */
  height: 100%;
  padding: 0 15px;

  p {
    white-space: nowrap;
    font-weight: 400;
  };

  ${({ theme }) => css`
    p {
      font-size: ${theme.font.size.light};
    };
  `};

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      display: none;
    };
  `};
`;

export const AddQuantity = styled.div`
  display: flex;

  ${({ theme }) => css`
    svg {
      stroke: ${theme.colors.primary};
    };

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      font-size: ${theme.font.size.light};
    };

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      position: absolute;
      width: 100%;
      bottom: 10px;
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

export const Result = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  border-top: 1px dashed #ddd;

  margin-top: 10px;

  padding: 10px;

  ${({ theme }) => css`
    #price {
      font-size: ${theme.font.size.normal};
      font-weight: ${theme.font.weight[600]};
    };
  `};
`;