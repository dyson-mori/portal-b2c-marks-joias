import styled, { css } from 'styled-components';

export const Container = styled.form`
  display: flex;
  position: relative;

  align-items: center;
  flex-direction: column;

  padding: 30px 10px 10px 10px;
  margin-left: 5px;

  min-width: calc(100vw / 4);

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};

    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      width: 100%;
      margin-left: 0px;
    }
  `};
`;
