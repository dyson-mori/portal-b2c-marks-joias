import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@services/prisma";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  const product = await prisma.product.findFirst({
    where: {
      code: Number(code)
    },
    select: {
      title: true,
      price: true,
      files: true,
      description: true,
      code: true
    }
  });

  const format = {
    ...product,
    price: Number(product!.price),
    files: JSON.parse(product!.files)
  }

  if (!product) {
    return NextResponse.json({}, { status: 400, statusText: 'products not received' });
  };

  return NextResponse.json(format, { status: 200, statusText: 'products received successfully' });
};
