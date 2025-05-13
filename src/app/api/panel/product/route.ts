import { NextRequest, NextResponse } from "next/server";

import { Product } from "@prisma/client";

import { stripe } from "@services/stripe";
import { prisma } from "@services/prisma";

function formatCode(code: number, last_product: number) {
  if (String(code).length === 2) {
    return Number(`${code}0000`) + last_product
  };

  return Number(`${code}00000`) + last_product
};

// criar a parte a quantidade já que o stripe não existe um lugar para colocar a quantidade
type Props = Product & {
  images: string[];
  price: number;
};

export async function POST(request: NextRequest) {
  const { title, description, code, images, price, quantity } = await request.json() as Props;

  const product_amount = await prisma.product.count();
  const category = await prisma.category.findFirst({
    where: {
      code: code!,
    }
  });

  if (!category) {
    return NextResponse.json(null, { status: 400, statusText: 'category not found!' });
  };

  const product_stripe = await stripe.products.create({
    name: title,
    description,
    images: [images[0]],
    default_price_data: {
      currency: 'brl',
      unit_amount: price,
    },
  });

  const product = await prisma.product.create({
    data: {
      title,
      description,
      price: Number(price),
      files: JSON.stringify(images),
      category_id: category.id,
      quantity,
      code: formatCode(category!.code, product_amount),
      stripe_price_id: product_stripe.default_price as string,
      stripe_product_id: product_stripe.id
    }
  });

  if (!product) {
    return NextResponse.json(product, { status: 400, statusText: 'database does not return data' });
  };

  return NextResponse.json(product, { status: 201, statusText: 'products received successfully' });
};