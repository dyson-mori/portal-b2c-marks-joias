import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@services/prisma";

export async function GET(request: NextRequest) {
  const token = request.headers.authorization?.replace('Bearer ', '');

  if (!token || token !== process.env.SECRET_TOKEN) {
    return NextResponse.json([], { status: 400, statusText: 'database does not return data' });
  };

  const url = new URL(request.url);
  // const limit = url.searchParams.get("limit");
  const category_title = url.searchParams.get("category");

  const category = await prisma.category.findFirst({
    where: {
      title: category_title ?? undefined
    }
  });

  const products = await prisma.product.findMany({
    orderBy: {
      created_at: 'desc'
    },
    where: {
      category_id: category_title ? category?.id : undefined
    },
    select: {
      id: true,
      title: true,
      price: true,
      thumbnail: true,
    }
  });

  if (!products) {
    return NextResponse.json([], { status: 400, statusText: 'database does not return data' });
  };

  return NextResponse.json(products, { status: 201, statusText: 'products received successfully' });
};
