import styled, { css } from "styled-components";

export const Container = styled.section`
  display: none;

  width: 100%;
  overflow-x: scroll;

  scroll-snap-type: x mandatory;

  aspect-ratio: 1 / 1;

  scrollbar-width: none;

  img {
    width: 100%;
    height: 100%;
  };

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}) {
      display: flex;
    };
  `};
`;