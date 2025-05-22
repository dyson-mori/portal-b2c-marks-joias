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
  const { category_id, title, description, files, price, search, total_quantity } = await request.json() as Product;

  const product_amount = await prisma.product.count({
    where: {
      category_id: category_id!,
    }
  });

  const category = await prisma.category.findFirst({
    where: {
      id: category_id!,
    }
  });

  if (!category) {
    return NextResponse.json(null, { status: 400, statusText: 'category not found!' });
  };

  const count = formatCode(category!.id, product_amount)

  const product = await prisma.product.create({
    data: {
      id: count,
      category_id: category.id,

      title,
      description,
      price: Number(price),
      files: JSON.stringify(files),
      thumbnail: files[0],
      search,
      total_quantity
    }
  });

  if (!product) {
    return NextResponse.json(undefined, { status: 400, statusText: 'unable to create this product!' });
  };

  return NextResponse.json(true, { status: 201, statusText: 'successfully created product!' });
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

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("product_id") as string;

  const deleted = await prisma.product.delete({
    where: {
      id: Number(id)
    },
  });

  if (!deleted) {
    return NextResponse.json([], { status: 400, statusText: 'header not received' });
  };

  return NextResponse.json(true, { status: 200, statusText: 'header updated successfully' });
};