import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { Product } from "@prisma/client";

import { stripe } from "@services/stripe";
import { prisma } from "@services/prisma";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const product = await stripe.products.retrieve(id!, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  const filter = {
    id: product.id,
    name: product.name,
    description: product.description,
    // unit_amount: formats.formatDecimal(String(price.unit_amount)),
    // price: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price.unit_amount! / 100),
    unit_amount: price.unit_amount,
    price: price.unit_amount,
    defaultPriceId: price.id,
    // melhorar isso, não deixar o maximo de produto exposto para o cliente no storage
    quantity: 1,
    maxQuantity: product.metadata.quantity,
    images: product.images
  };

  if (!product) {
    return NextResponse.json({}, { status: 400, statusText: 'products not received' });
  };

  return NextResponse.json(filter, { status: 200, statusText: 'products received successfully' });
};

// criar a parte a quantidade já que o stripe não existe um lugar para colocar a quantidade

type Props = Product & {
  images: string[];
  price: number;
};

export async function POST(request: NextRequest) {
  const { title, description, code, images, price, quantity } = await request.json() as Props;

  const category = await prisma.category.findFirst({
    where: {
      code: code!,
    }
  });

  if (!category) {
    return NextResponse.json(null, { status: 400, statusText: 'category not found!' });
  };

  const product = await stripe.products.create({
    name: title,
    description,
    images,
    metadata: {
      category: category!.code,
      // mudar isso, salvar a quantidade no meu banco de dados
      quantity
    },
    default_price_data: {
      currency: 'brl',
      unit_amount: price,
      // unit_amount_decimal: String(price).replace('.', '')
    },
  });

  if (!product) {
    return NextResponse.json(product, { status: 400, statusText: 'database does not return data' });
  };

  return NextResponse.json(product, { status: 201, statusText: 'products received successfully' });
};