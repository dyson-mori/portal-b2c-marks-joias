import styled, { css } from 'styled-components';

export const Container = styled.form`
  display: flex;
  position: relative;

  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  padding: 30px 10px 10px 10px;
  margin-left: 5px;

  max-width: calc(100% / 3.5);

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.simple};
    background-color: ${theme.colors.white};

    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      max-width: 100%;
      min-width: 100%;
      border-radius: 0;
      margin-left: 0px;
    }
  `};
`;
