import styled, { css } from 'styled-components';

export const Container = styled.section`
  display: grid;
  align-items: center;

  width: 100%;

  padding: 0 2.5px;
  margin-right: 5px;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      margin-bottom: 10px;
      margin-right: 0px;

      padding: 0;
      background-color: transparent;
      box-shadow: 0 0 0 0 transparent;

      display: flex;

      overflow-x: scroll;

      scroll-snap-type: x mandatory;
      aspect-ratio: 1 / 1;
    };
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

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      width: 100%;
      height: 100%;

      aspect-ratio: 1 / 1;

      img {
        width: 100%;
        height: 100%;
      };
    };
  `};
`;

export const Delete = styled.button`
  position: absolute;

  top: 0;
  right: 0;
  border: 0;

  width: 50px;
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
`;