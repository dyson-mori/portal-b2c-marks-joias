import { DotLottiePlayer } from '@dotlottie/react-player';

import { ProductProps } from '@global/interfaces';

import { Container, ProductEmpty, ProductList } from "./styles";
import { Product } from '../../../product';

type ProductsProps = {
  products: ProductProps[];
};

export default function Sales({ products }: ProductsProps) {
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
            <Product
              key={index.toString()}
              href={`/product?product_id=${el.id}`}
              product={el}
            />
          ))}
        </ProductList>
      )}
    </Container>
  )
}