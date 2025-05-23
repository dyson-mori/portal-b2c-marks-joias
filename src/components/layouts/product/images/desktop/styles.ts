import styled, { css } from 'styled-components';

export const Container = styled.section`
  display: flex;

  width: calc(100% / 2);
`;

export const GroupMainImage = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;

  img {
    position: absolute;

    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;

    transition: 0.5s;
  };
`;

export const Options = styled.div`
  display: flex;

  flex-direction: column;

  margin: 0 10px 0 0;

  ${({ theme }) => css`
    @media (max-width: ${theme.settings.responsive.maxWidth}){
      display: none;
    };
  `};
`;

export const Button = styled.button`
  border: 0;

  margin-bottom: 10px;
  padding: 0;
  background-color: transparent;

  width: 100px;

  cursor: pointer;
`;