import { NextResponse } from "next/server";

import { prisma } from "@services/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: {
      created_at: 'desc'
    },
    // take: 6,
    select: {
      id: true,
      title: true,
      price: true,
      thumbnail: true,
    }
  });

  const categories = await prisma.category.findMany({
    where: {
      show_on_landing: true
    },
    orderBy: {
      title: 'asc'
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      show_on_landing: true
    }
  });

  const feedbacks = await prisma.feedbacks.findMany({
    orderBy: {
      created_at: 'asc'
    },
  });

  if (!products) {
    return NextResponse.json([], { status: 400, statusText: 'database does not return data' });
  };

  return NextResponse.json({ products, categories, feedbacks }, { status: 201, statusText: 'products received successfully' });
};
