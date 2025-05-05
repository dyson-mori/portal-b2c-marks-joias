import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;

  align-items: center;

  width: 100%;
  min-height: 45px;

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};
    border-radius: ${theme.settings.radius.small};
  `};

  svg {
    margin: 0 10px;
  };
`;

export const Input = styled.input`
  border: 0;
  outline: 0;

  width: 100%;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    font-size: ${theme.font.size.medium};
    border-radius: ${theme.settings.radius.small};
  `};
`;

export const TextArea = styled.textarea`
  border: 0;
  outline: 0;

  width: 100%;
  min-height: 180px;

  white-space: pre-line;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    font-size: ${theme.font.size.medium};
    border-radius: ${theme.settings.radius.small};
  `};
`;

