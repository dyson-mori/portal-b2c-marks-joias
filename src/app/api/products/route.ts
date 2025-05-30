import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

import { prisma } from "@services/prisma";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const cookie = await cookies();
  const sessionId = cookie.get('@marks:session_id')?.value;

  if (!sessionId || url.origin !== process.env.NEXT_PUBLIC_MARKS_URL.replace('/api', '')) {
    return NextResponse.json("user session not found!", { status: 400, statusText: "user session not found!" });
  };

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
