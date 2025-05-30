import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

import { prisma } from "@services/prisma";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const header = await headers();
  const cookie = await cookies();

  const sessionId = cookie.get('@marks:session_id')?.value;
  const order_id = url.searchParams.get("order_id") as string;

  if (!sessionId || header.get('origin') !== process.env.NEXT_PUBLIC_MARKS_URL.replace('api', '')) {
    return NextResponse.json("user session not found!", { status: 400, statusText: "user session not found!" });
  };

  const data = await prisma.order.findFirst({
    where: {
      external_reference: order_id
    }
  });

  return NextResponse.json(data, { status: 200, statusText: 'products received successfully' });
};
