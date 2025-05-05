import styled, { css } from 'styled-components';

export const Container = styled.section`
  display: grid;
  align-items: center;

  width: 100%;

  padding: 0 2.5px;
  margin-right: 5px;

  ${({ theme }) => css`
    border-radius: 4px;
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      min-height: 40vh;
      margin-bottom: 10px;
      justify-content: space-evenly;

      padding: 1.5px 0;

      a {
        margin: 1.5px 0;
        width: calc(100% / 2);
        height: calc(100% / 2);
      };

      img {
        width: 100%;
        height: 100%;
      }
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