import styled, { css } from 'styled-components';

export const Container = styled.form`
  display: flex;
  position: relative;

  flex-direction: column;

  padding: 0px 10px 10px 10px;
  /* padding: 30px 10px 10px 10px; */
  margin-left: 5px;

  min-width: calc(100vw / 3.5);
  height: min-content;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};

    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      width: 100%;
      margin-left: 0px;
    }
  `};
`;

export const Content = styled.div`
  display: flex;

  align-items: start;
  flex-direction: column;

  width: 100%;
  height: 100%;

  .space {
    height: 10px;
  };

  h4 {
    font-weight: 600;
    text-align: start;
  }

  h5 {
    font-weight: 600;
    margin-bottom: 2px;
  };
`;

export const Result = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  border-top: 1px dashed #ddd;

  margin-top: 10px;

  padding: 10px;

  ${({ theme }) => css`
    #price {
      font-size: ${theme.font.size.normal};
      font-weight: ${theme.font.weight[600]};
    };

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      display: none;
    }
  `};
`;

export const MethodPayment = styled.div<{ $selected: string }>`
  display: flex;
  justify-content: space-evenly;

  button {
    width: 30%;
    height: 55px;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    border-radius: 3px;
  };
`;