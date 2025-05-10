"use client"

import { CategoryProps } from "@global/interfaces";

import { Container } from "./styles";

type CategoryAppProps = {
  categories: CategoryProps[]
};

export default function CategoryApp({ categories }: CategoryAppProps) {
  console.log(categories);

  return (
    <Container>

    </Container>
  )
}