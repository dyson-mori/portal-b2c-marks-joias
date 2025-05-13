import Image from 'next/image';

import { Category } from '@prisma/client';

import { Container } from "./styles";

type CategoryProps = {
  categories: Category[];
  onSelectCategory(title: string): void;
};

export default function Categories({ categories, onSelectCategory }: CategoryProps) {
  return (
    <Container>
      <h3>Selecione uma Categoria</h3>
      <div className='categories'>
        {categories.map(el => (
          <button key={el.title} onClick={() => onSelectCategory(el.title)}>
            {el.thumbnail ? (
              <Image src={el.thumbnail} width={150} height={150} alt={el.title} />
            ) : (
                <Image src="https://i.pinimg.com/736x/da/76/56/da76569e2d9535bb27678f95cbf220b2.jpg" width={150} height={150} alt="Argolas" />
            )}
            <p>{el.title}</p>
          </button>
        ))}
      </div>
    </Container>
  )
}