import styled from 'styled-components';

export const Container = styled.main`
  display: flex;

  padding: 10px 50px;

  width: 100%;

  @media (max-width: 710px){
    padding: 3px 0;
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