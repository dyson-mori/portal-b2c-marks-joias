import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@services/stripe";
import { prisma } from "@services/prisma";
import { formats } from "@helpers/format";

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
    images: product.images,
    description: product.description,
    unit_amount: formats.formatDecimal(String(price.unit_amount)),
    price: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price.unit_amount! / 100),
    defaultPriceId: price.id
  };

  if (!product) {
    return NextResponse.json({}, { status: 400, statusText: 'products not received' });
  };

  return NextResponse.json(filter, { status: 200, statusText: 'products received successfully' });
};

// criar a parte a quantidade já que o stripe não existe um lugar para colocar a quantidade

export async function POST(request: NextRequest) {
  const { name, description, category_id, images, price, quantity } = await request.json();

  const category = await prisma.category.findFirst({
    where: {
      id: category_id,
    }
  });

  const product = await stripe.products.create({
    name,
    description,
    images,
    metadata: {
      category: category!.code,
      quantity
    },
    default_price_data: {
      currency: 'brl',
      unit_amount: Number(String(price).replace('.', '')),
      unit_amount_decimal: String(price).replace('.', '')
    },
  });

  if (!product) {
    return NextResponse.json(product, { status: 400, statusText: 'database does not return data' });
  };

  return NextResponse.json(product, { status: 201, statusText: 'products received successfully' });
};