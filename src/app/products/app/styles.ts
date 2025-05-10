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
  height: 50vh;

  margin-bottom: 10px;

  img {
    object-fit: cover;
    height: 100%;
  }
`;

export const SubCategories = styled.section`
  display: flex;

  margin: 10px 0;

  /* ${({ theme }) => css`
    button {
      font-family: ${theme.font.family.montserrat_alternates};
      font-size: ${theme.font.size.light};
      color: ${theme.colors.philippine_gray};
      box-shadow: ${theme.settings.box.simple};
      background-color: ${theme.colors.background};
    }
  `};

  button {
    border: 0;
    margin-right: 10px;

    width: 100px;
    height: 45px;
    letter-spacing: 1.5px;
    font-weight: 600;
    cursor: pointer;
  } */
`;

export const SectionProducts = styled.section`
  display: flex;

  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;

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