import Image from 'next/image';

import { Category } from '@prisma/client';

import { DotLottiePlayer } from '@dotlottie/react-player';

import { CategoryEmpty, Container, List } from "./styles";

type CategoryProps = {
  categories: Category[];
  onSelectCategory(title: string): void;
};

export default function Categories({ categories, onSelectCategory }: CategoryProps) {
  const lottie_styles = {
    display: 'flex',
    maxWidth: "150px"
  };

  if (categories.length === 0) {
    return (
      <Container>
        <h3>Selecione uma Categoria</h3>
        <CategoryEmpty>
          <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
          <p>Nenhuma Categoria Encontrada!</p>
        </CategoryEmpty>
      </Container>
    )
  };

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