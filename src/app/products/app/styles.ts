import styled, { css } from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;

  padding: 10px 50px;

  width: 100%;

  @media (max-width: 710px){
    padding: 3px 0;
  };
`;

export const Banner = styled.section`
  display: flex;

  width: 100%;
  height: 60vh;

  overflow: hidden;

  img {
    object-fit: cover;
    height: 100%;
  };

  ${({ theme }) => css`
    box-shadow: ${theme.settings.box.default};
  `};
`;

export const Categories = styled.section`
  display: flex;

  padding: 10px 0;

  width: 100%;

  button {
    margin: 0 5px;
    /* width: min-content; */
  };

  button:first-child {
    margin: 0 5px 0 0;
  };

  button:last-child {
    margin: 0 0 0 5px;
  };

  @media (max-width: 710px){
    width: 100%;
    padding: 5px;
    overflow-x: auto;
    scrollbar-width: none;
  };
`;

export const SectionProducts = styled.section<{ $isLoading: boolean }>`
  display: flex;
  position: relative;

  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;

  opacity: ${({ $isLoading }) => $isLoading ? 0.5 : 1};

  @media (max-width: 710px){
    justify-content: space-evenly;
  };
`;

export const ProductEmpty = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 80vh;
`;

export const LoadingProducts = styled.div`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  z-index: 5;
`;