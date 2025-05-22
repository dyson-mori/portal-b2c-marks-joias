import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@services/prisma";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const product_id = url.searchParams.get("product_id");

  const product = await prisma.product.findFirst({
    where: {
      id: Number(product_id)
    },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      files: true,
      total_quantity: true,
      category_id: true
    }
  });

  if (!product) {
    return NextResponse.json({}, { status: 400, statusText: 'products not received' });
  };

  const related_products = await prisma.product.findMany({
    where: {
      category_id: product.category_id,
      NOT: {
        id: product.id
      }
    }
  });

  const format = {
    ...product,
    files: JSON.parse(product.files),
    related: related_products.map(product => ({
      ...product,
      files: JSON.parse(product.files)
    }))
  }

  return NextResponse.json(format, { status: 200, statusText: 'products received successfully' });
};
