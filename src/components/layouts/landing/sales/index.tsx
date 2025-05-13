import Image from 'next/image';

import { DotLottiePlayer } from '@dotlottie/react-player';

import { ProductProps } from '@global/interfaces';

import { Container, ProductEmpty, ProductList } from "./styles";

type ProductsProps = {
  width: number;
  products: ProductProps[];
};

export default function Sales({ products, width }: ProductsProps) {
  const test = {
    width: width <= 500 ? (width / 2) - 20 : (width / 4) - 30
  };

  const lottie_styles = {
    display: 'flex',
    maxWidth: "300px"
  };


  return (
    <Container>
      <h3>Top Vendidos</h3>

      {products.length === 0 && (
        <ProductEmpty>
          <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
          <p>Nenhum Produto Encontrado</p>
        </ProductEmpty>
      )}

      {products.length > 0 && (
        <ProductList>
          {products.map((el, index) => (
            <Image
              key={el.title + index}
              src={el.thumbnail}
              width={test.width}
              height={test.width}
              alt={el.title}
            />
          ))}
        </ProductList>
      )}
    </Container>
  )
}