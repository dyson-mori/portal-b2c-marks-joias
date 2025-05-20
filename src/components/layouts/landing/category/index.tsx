import Image from 'next/image';

import { Category } from '@prisma/client';

import { Container, List } from "./styles";

type CategoryProps = {
  categories: Category[];
  onSelectCategory(title: string): void;
};

export default function Categories({ categories, onSelectCategory }: CategoryProps) {
  return (
    <Container>
      <h3>Selecione uma Categoria</h3>
      <List>
        {categories.map(el => (
          <button key={el.title} onClick={() => onSelectCategory(el.title)}>
            <Image src={el.thumbnail} width={150} height={150} alt={el.title} />
            <p>{el.title}</p>
          </button>
        ))}
      </List>
    </Container>
  )
}