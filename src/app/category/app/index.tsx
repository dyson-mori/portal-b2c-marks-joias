"use client"

import { Category } from "@prisma/client";
import { Container } from "./styles";

type CategoryAppProps = {
  categories: Category[]
};

export default function CategoryApp({ categories }: CategoryAppProps) {
  console.log(categories);

  return (
    <Container>

    </Container>
  )
}