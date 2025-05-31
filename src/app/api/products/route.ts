import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

import { prisma } from "@services/prisma";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const header = await headers();
  const cookie = await cookies();

  const sessionId = cookie.get('@marks:session_id')?.value;
  const title = url.searchParams.get("title");

  if (!sessionId || header.get('origin') !== process.env.NEXT_PUBLIC_MARKS_URL.replace('/api', '')) {
    return NextResponse.json("user session not found!", { status: 400, statusText: "user session not found!" });
  };

  if (!!title) {
    const category = await prisma.category.findFirst({
      where: { title }
    });

    if (!category) {
      return NextResponse.json([], { status: 400, statusText: 'database does not return data' });
    };

    const products = await prisma.product.findMany({
      orderBy: {
        created_at: 'desc'
      },
      where: {
        category_id: title ? category?.id : undefined
      },
      select: {
        id: true,
        title: true,
        price: true,
        thumbnail: true,
      }
    });

    return NextResponse.json(products, { status: 200, statusText: 'products received successfully' });
  };

  const products = await prisma.product.findMany({
    orderBy: {
      created_at: 'desc'
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

  return NextResponse.json(products, { status: 200, statusText: 'products received successfully' });
};
