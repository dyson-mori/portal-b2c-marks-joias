import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;

  flex-direction: column;

  width: 100%;
  height: 40px;

  margin-bottom: 5px;

  transition: .5s;

  overflow: hidden;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};

    @media (max-width: 710px){
      display: none;
    };
  `};
`;

export const Title = styled.button`
  display: flex;

  align-items: center;

  border: 0;
  background-color: transparent;

  width: 100%;
  min-height: 40px;

  cursor: pointer;

  p {
    margin-left: 10px;
  };

  ${({ theme }) => css`
    padding: ${theme.settings.padding.button};
    font-weight: ${theme.font.weight[500]};
    font-size: ${theme.font.size.medium};
  `};
`;

export const DropDown = styled.div`
  display: flex;

  flex-wrap: wrap;

  width: 100%;
`;

export const Button = styled.button`
  border: 0;

  cursor: pointer;

  flex-grow: 1;

  min-width: 80px;

  margin: 1px;
  padding: 2px 4px;

  height: 35px;

  ${({ theme }) => css`
    border-radius: ${theme.settings.radius.small};
    font-weight: ${theme.font.weight[400]};

    &:hover {
      background-color: ${theme.colors.hover};
    };
  `};
`;