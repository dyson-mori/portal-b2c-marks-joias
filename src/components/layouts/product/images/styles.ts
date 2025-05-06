import styled, { css } from 'styled-components';

export const ContainerDesktop = styled.section`
  display: flex;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      display: none;
    };
  `};
`;

export const ContainerMobile = styled.section`
  display: none;

  width: 100%;
  overflow-x: scroll;

  scroll-snap-type: x mandatory;

  aspect-ratio: 1 / 1;

  img {
    width: 100%;
    height: 100%;
  }

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      display: flex;
    };
  `};
`;

export const Options = styled.div`
  display: flex;

  flex-direction: column;

  margin: 0 10px 0 0;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      display: none;
      /* flex-direction: column;
      padding: ${theme.settings.responsive.padding}; */
    };
  `};
`;

export const Button = styled.button`
  border: 0;

  margin: 0;
  padding: 0;
  background-color: transparent;

  cursor: pointer;
`;