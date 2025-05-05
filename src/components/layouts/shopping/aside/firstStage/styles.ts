import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

export const Methods = styled.button`
  border: 0;
  cursor: pointer;

  display: flex;

  align-items: center;

  width: 95%;
  min-height: 60px;

  padding: 5px;
  margin: 5px;

  transition: .5s;

  svg {
    margin: 0 10px;
  };

  ${({ theme, disabled }) => css`
    box-shadow: ${theme.settings.box.default};
    border-radius: ${theme.settings.radius.small};
    background-color: ${theme.colors.white};

    p {
      font-size: ${theme.font.size.medium};
      font-weight: ${theme.font.weight[500]};
    };

    #discount {
      text-align: center;
      font-size: ${theme.font.size.normal};
    };

    ${disabled && css`
      cursor: default;
    `};
    
    ${!disabled && css`
      &:hover {
        box-shadow: ${theme.settings.box.defaultHoverPrimary};
      };
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
      font-size: ${theme.font.size.medium};
      font-weight: ${theme.font.weight[600]};
    };
  `};
`;