"use client"

import Image from "next/image";

import { Container, Images, Label } from "./styles";

type Props = {
  data: {
    ip_address: "177.55.231.177",
    items: [
      {
        description: "O Colar Pavão Real Multicolor é uma peça vibrante e cheia de personalidade. Com um pingente em formato de pavão, cravejado com zircônias coloridas que remetem à beleza das penas dessa ave majestosa, ele transmite elegância e originalidade. O corpo ",
        id: "120005",
        quantity: "1",
        title: "Colar Pavão Real Multicolor",
        thumbnail: string;
        unit_price: "1"
      }
    ],
    payer: {
      first_name: "Sergio Junio Leal"
    },
    tracking_id: "platform:v1-whitelabel,so:ALL,type:N/A,security:none"
  }
};

export default function SuccessApp({ data }: Props) {
  return (
    <Container>
      <Images>
        {data.items.map((row, index) => (
          <Image
            priority
            key={index.toString()}
            width={350}
            height={350}
            src="https://res.cloudinary.com/doo9pfft1/image/upload/v1747416129/120753_vzgnde.jpg"
            // src={row.thumbnail}
            alt={row.title}
          />
        ))}
      </Images>

      <Label>
        <h3>Obrigado pela Compra</h3>
        <p>Você receberá uma mensagem no whatsapp com mais detalhes sobre a sua compra</p>
      </Label>
    </Container>
  )
}