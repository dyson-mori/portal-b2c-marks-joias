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

export async function POST(request: NextRequest) {
  const { category_id, title, description, files, price, unit_amount, search } = await request.json() as Product;

  const product_amount = await prisma.product.count();
  const category = await prisma.category.findFirst({
    where: {
      id: category_id!,
    }
  });

  if (!category) {
    return NextResponse.json(null, { status: 400, statusText: 'category not found!' });
  };

  const product_stripe = await stripe.products.create({
    name: title,
    description,
    images: [files[0]],
    default_price_data: {
      currency: 'brl',
      unit_amount: unit_amount,
    },
  });

  const product = await prisma.product.create({
    data: {
      id: formatCode(category!.id, product_amount),
      category_id: category.id,

      stripe_price_id: product_stripe.default_price as string,
      stripe_product_id: product_stripe.id,

      title,
      description,
      price: Number(price),
      files: JSON.stringify(files),
      thumbnail: files[0],
      unit_amount,
      search
    }
  });

  if (!product) {
    return NextResponse.json(product, { status: 400, statusText: 'unable to create this product!' });
  };

  return NextResponse.json(product, { status: 201, statusText: 'successfully created product!' });
};