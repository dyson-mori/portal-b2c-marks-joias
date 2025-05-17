import styled from 'styled-components';

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

  margin-bottom: 10px;

  img {
    object-fit: cover;
    height: 100%;
  };
`;

export const SubCategories = styled.section`
  display: flex;

  padding: 10px 0;

  width: 100%;

  button {
    margin: 0 5px;
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