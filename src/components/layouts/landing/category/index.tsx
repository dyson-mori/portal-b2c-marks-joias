import Image from 'next/image';

import { Category } from '@prisma/client';

import { Container } from "./styles";

type CategoryProps = {
  categories: Category[];
};

export default function Categories({ categories }: CategoryProps) {
  return (
    <Container>
      <h3>Selecione uma Categoria</h3>
      <div className='categories'>
        {categories.map(el => (
          <button key={el.title}>
            {el.photo ? (
              <Image src={el.photo} width={150} height={150} alt={el.title} />
            ) : (
                <img src="https://i.pinimg.com/736x/da/76/56/da76569e2d9535bb27678f95cbf220b2.jpg" alt="Argolas" />
            )}
            <p>{el.title}</p>
          </button>
        ))}
      </div>
    </Container>
  )
}