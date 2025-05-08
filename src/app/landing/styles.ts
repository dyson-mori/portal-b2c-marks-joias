import styled, { css } from 'styled-components';

const prefix = {
  padding_spacing: '15px 50px'
};

export const Container = styled.main`
  font-family: sans-serif;
`;

export const Hero = styled.section`
  position: relative;
  text-align: center;

  height: 80vh;
  margin-bottom: 15px;

  img.bg {
    width: 100%;
    height: 100%;
    filter: blur(4px);
    /* border-radius: 0 0 50% 50% / 0 0 10% 10%; */
    object-fit: cover;
  };

  .car {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
  };
`;

export const InfoBar = styled.section`
  display: flex;
  justify-content: center;
  gap: 5rem;
  padding: ${prefix.padding_spacing};

  div {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    padding: 10px;
  };

  div > span {
    width: 1px;
    height: 80%;
    background-color: #ddd;
    margin: 10px;
  };

  ${({ theme }) => css`
    div > p {
      font-weight: ${theme.font.weight[500]};
      font-size: ${theme.font.size.normal};
      color: ${theme.colors.dark_charcoal};
    };
  `};
`;

export const Categories = styled.section`
  padding: ${prefix.padding_spacing};

  button {
    border: 0;
    padding: 0;
    cursor: pointer;
  }

  h3 {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #e91e63;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  };

  .categories {
    display: flex;
    justify-content: center;
    overflow-x: auto;
  };

  .categories > button {
    position: relative;

    margin: 5px;

    width: 100%;
  };

  .categories > button:nth-child(1) {
    position: relative;

    margin-left: 0px;
  };

  .categories > button:last-child {
    position: relative;

    margin-right: 0px;
  };

  .categories > button > p {
    position: absolute;

    left: 50%;

    transform: translate(-50%);

    bottom: 15px;

    color: #fff;

    text-transform: capitalize;

    font-weight: 500;
    font-family: var(--font-montserrat-alternates), sans-serif;
    letter-spacing: 1.5px;

    ${({ theme }) => css`
      font-size: ${theme.font.size.normal};
    `};
  }
`;

export const Banner = styled.div`
  padding: ${prefix.padding_spacing};
  text-align: center;
  background: rgb(250,11,91);
  background: linear-gradient(90deg, rgba(250,11,91,1) 0%, rgba(57,95,245,1) 100%, rgba(0,212,255,1) 100%);
  color: white;

  ${({ theme }) => css`
    font-size: ${theme.font.size.normal};
  `};
`;

export const TopVendas = styled.section`
  padding: ${prefix.padding_spacing};

  h3 {
    font-weight: 600;
    margin-bottom: 0.875rem;
    color: #e91e63;
  }

  img {
    object-fit: cover;
  };

  .products {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

export const Sobre = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  padding: ${prefix.padding_spacing};

  h2 {
    color: #e91e63;
  }

  .logo_and_text {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    width: 100%;
  };

  .logo_and_text > p {
    max-width: 800px;
    text-align: center;
    text-align: start;
  };

  .images {
    display: flex;

    width: 100%;

    justify-content: space-between;
  }

  .images > img {
    object-fit: cover;
  };

  .images > .middle {
    width: 100%;
    margin: 0 5px;
  };

  .images > .middle > img:nth-child(1) {
    width: 100%;
    height: 100%;

    object-fit: cover;
  };

  .images > .middle > .under {
    display: flex;
    width: 100%;
    height: 100%;
  };

  .under > img {
    width: 100%;
    height: 195px;
    object-fit: cover;
  };

  .under > span {
    width: 10px;
  };
`;