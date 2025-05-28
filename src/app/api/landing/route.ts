import { NextResponse } from "next/server";
// import { cookies, headers } from "next/headers";

import { prisma } from "@services/prisma";

export async function GET(
  // request: NextRequest
) {
  // const origin = request.headers.get('origin');

  // const cookie = await cookies();
  // const sessionId = cookie.getAll();

  // const allowedOrigin = process.env.NEXT_PUBLIC_MARKS_URL.replace('api', '');

  // console.log(origin);
  // console.log(allowedOrigin);

  // if (origin !== allowedOrigin) {
  //   return new NextResponse('Forbidden', { status: 403 })
  // }

  // if (!sessionId) {
  //   return NextResponse.json("user session not found!", { status: 400, statusText: "user session not found!" });
  // };

  const products = await prisma.product.findMany({
    orderBy: {
      created_at: 'desc'
    },
    take: 8,
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

  return NextResponse.json({ products, categories, feedbacks }, { status: 200, statusText: 'products received successfully' });
};
