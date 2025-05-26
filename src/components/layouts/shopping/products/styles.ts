import styled, { css } from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;

  padding: 10px;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      padding: 10px 0;
    }
  `};
`;

export const CartEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Products = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;

  padding: 10px;

  div:last-child {
    border: 0px;
  };

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      padding: 0;
      flex-direction: row;
      justify-content: start;

      width: 100%;
      height: auto;

      gap: 10px;

      overflow-x: scroll;
      overflow-y: hidden;

      scroll-snap-type: x mandatory;

      aspect-ratio: 1 / 1;

      scrollbar-width: none;
      -ms-overflow-style: none;
    }
  `};
`;

export const Product = styled.div`
  position: relative;
  display: flex;

  padding: 10px;

  width: 100%;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
    aspect-ratio: 1/1;
    object-fit: cover;
  };

  border-bottom: 1px solid #f4f4f4;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      width: 100%;
      height: 100%;

      padding: 0px;
      /* margin: 2px; */
      aspect-ratio: 1/1;
      scroll-snap-align: start;
      border-bottom: 0px;


      img {
        width: 100%;
        height: 100%;
      };
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
      height: auto;

      bottom: 60px;

      a {
        color: #fff;
        font-weight: 400;
        width: 100%;
        text-align: center;
      };

      p {
        display: none;
      }
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

  button {
    border: 0px;
    background-color: transparent;
    width: 50px;
    height: 50px;
    cursor: pointer;
  };

  ${({ theme }) => css`
    svg {
      stroke: ${theme.colors.primary};
    };

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      color: #000;
      font-size: ${theme.font.size.light};
    };

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      position: absolute;
      width: 100%;
      bottom: 0px;
      justify-content: center;

      /* background: linear-gradient(180deg, rgba(48,48,48,0) 0%, rgba(48,48,48,1) 100%, rgba(0,212,255,1) 100%); */
      svg {
        width: 50px;
        height: 50px;
        stroke: ${theme.colors.primary};
      };

      P {
        width: 50px;
        font-size: ${theme.font.size.normal};
        font-weight: 600;
      };
    };
  `};
`;

export const Delete = styled.button`
  border: 0;

  min-width: 50px;
  height: 50px;
  background-color: transparent;

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
        width: 25px;
        height: 25px;
        stroke-width: 1.5;
      };
    };
  `};
`;