import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 10px 50px;

  min-height: 82vh;

  ${({ theme }) => css`
    color: ${theme.colors.dark_charcoal};

    @media (max-width: ${theme.settings.responsive.maxWidth}){
      padding: 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    };
  `};
`;

export const Content = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

export const MethodPayment = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-evenly;

  width: 100%;
`;

export const Methods = styled.button<{ $selected: boolean }>`
  border: 0;
  cursor: pointer;
  
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 40%;
  padding: 35px;
  margin: 5px;

  transition: .5s;

  p {
    position: absolute;
    bottom: 10px;
    /* transition: .5s; */
  };

  svg {
    margin: 0 10px;
  };

  ${({ theme, disabled, $selected }) => css`
    border-radius: ${theme.settings.radius.small};
    background-color: ${theme.colors.white};

    p {
      color: ${theme.colors.philippine_gray};
      font-size: ${theme.font.size.light};
      font-weight: 400;
    };

    #discount {
      text-align: center;
      font-size: ${theme.font.size.light};
    };

    ${disabled && css`
      cursor: default;
      opacity: .5;
    `};
    
    ${!disabled && css`
      &:hover {
        background-color: ${theme.colors.success}1a;
      };
    `};

    ${$selected && css`
      background-color: ${theme.colors.success}1a;

      svg {
        stroke: ${theme.colors.success};
        stroke-width: 2;
      };

      p {
        color: ${theme.colors.success};
        font-weight: 600;
      }
    `};
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