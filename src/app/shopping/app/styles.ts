import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: flex;
  justify-content: space-between;

  width: 100%;
  min-height: 85vh;
  padding: 10px 50px;

  ${({ theme }) => css`
    color: ${theme.colors.dark_charcoal};

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      padding: 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: auto;
    };
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