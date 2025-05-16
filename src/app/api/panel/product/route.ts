import { NextRequest, NextResponse } from "next/server";

import { Product } from "@prisma/client";

import { prisma } from "@services/prisma";

function formatCode(code: number, last_product: number) {
  if (String(code).length === 2) {
    return Number(`${code}0000`) + last_product
  };

  return Number(`${code}00000`) + last_product
};

export async function POST(request: NextRequest) {
  const { category_id, title, description, files, price, unit_amount, search, quantity } = await request.json() as Product;

  const product_amount = await prisma.product.count();
  const category = await prisma.category.findFirst({
    where: {
      id: category_id!,
    }
  });

  if (!category) {
    return NextResponse.json(null, { status: 400, statusText: 'category not found!' });
  };

  const product = await prisma.product.create({
    data: {
      id: formatCode(category!.id, product_amount),
      category_id: category.id,

      stripe_price_id: '', // remove
      stripe_product_id: '', // remove

      title,
      description,
      price: Number(price),
      files: JSON.stringify(files),
      thumbnail: files[0],
      unit_amount,
      search,
      quantity
    }
  });

  if (!product) {
    return NextResponse.json(product, { status: 400, statusText: 'unable to create this product!' });
  };

  return NextResponse.json(product, { status: 201, statusText: 'successfully created product!' });
};

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const product_id = url.searchParams.get("product_id");

  const body = await request.json() as Product;

  const product = await prisma.product.update({
    where: {
      id: Number(product_id)
    },
    data: body
  });

  if (!product) {
    return NextResponse.json(product, { status: 400, statusText: 'unable to update this product!' });
  };

  return NextResponse.json(product, { status: 201, statusText: 'successfully updated product!' });
};