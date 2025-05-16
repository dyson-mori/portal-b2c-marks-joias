"use client"

// import Image from "next/image";

import { Container, Label } from "./styles";

type Props = {
  data: {
    fullname: string;
    products: {
      image: string;
    }[];
  }
};

export default function SuccessApp({ data }: Props) {
  console.log(data);
  return (
    <Container>
      {/* <Images>
        {data.products.map((row, index) => (
          <Image
            priority
            key={index.toString()}
            width={350}
            height={350}
            src={row.image}
            alt={row.image}
          />
        ))}
      </Images> */}

      <Label>
        <h3>Obrigado pela Compra</h3>
        <p>Você receberá uma mensagem no whatsapp com mais detalhes sobre a sua compra</p>
      </Label>
    </Container>
  )
}