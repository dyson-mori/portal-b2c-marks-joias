import Image from 'next/image';

import { ProductProps } from '@global/interfaces';

import { Container, ProductList } from "./styles";

type ProductsProps = {
  width: number;
  products: ProductProps[];
};

export default function Sales({ products, width }: ProductsProps) {
  const test = {
    width: width <= 500 ? (width / 2) - 20 : (width / 4) - 30
  };

  return (
    <Container>
      <h3>Top Vendidos</h3>
      <ProductList>
        {products.map((el, index) => (
          <Image
            key={el.name + index}
            src={`${el.images[0]}`}
            width={test.width}
            height={test.width}
            alt={el.name}
          />
        ))}
      </ProductList>
    </Container>
  )
}