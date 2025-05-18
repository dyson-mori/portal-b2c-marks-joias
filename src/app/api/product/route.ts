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
      quantity: true
    }
  });

  const format = {
    ...product,
    files: JSON.parse(product!.files)
  }

  if (!product) {
    return NextResponse.json({}, { status: 400, statusText: 'products not received' });
  };

  return NextResponse.json(format, { status: 200, statusText: 'products received successfully' });
};
