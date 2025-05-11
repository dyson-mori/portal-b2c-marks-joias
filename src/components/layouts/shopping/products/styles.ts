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

    /* @media (max-width: ${theme.settings.responsive.maxWidth}){ }; */
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
    width: 100%;
    padding: 0 20px;
  };

  .price {
    width: 20%;
    margin: 0 25px;
  };

  img {
    aspect-ratio: 1/1;
  }

  ${({ theme }) => css`
    h4 {
      font-size: ${theme.font.size.light};
      text-wrap: nowrap;
    };

    p {
      font-size: ${theme.font.size.light};
    };

    /* @media (max-width: ${theme.settings.responsive.maxWidth}){ }; */
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

  margin: 15px;

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