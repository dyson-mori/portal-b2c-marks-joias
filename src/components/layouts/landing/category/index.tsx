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
              <img src="https://jouomoizalhobjxhlmkc.supabase.co/storage/v1/object/sign/marks-joias-files/IMG_7033.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2I2ZGIwMjQ4LTkyYzgtNDZkOS05NmE5LWUzNzJlZjUzMGNkZiJ9.eyJ1cmwiOiJtYXJrcy1qb2lhcy1maWxlcy9JTUdfNzAzMy5qcGciLCJpYXQiOjE3NDY1NTQzODIsImV4cCI6MTc3ODA5MDM4Mn0.Xd6pRyBF2nQGR9AkkNb_smH28w2k7-YICaLXmB6N_6A" alt="Argolas" />
            )}
            <p>{el.title}</p>
          </button>
        ))}
      </div>
    </Container>
  )
}