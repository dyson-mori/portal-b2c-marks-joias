import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@services/prisma";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const order_id = url.searchParams.get("order_id") as string;

  const data = await prisma.order.findFirst({
    where: {
      id: order_id
    }
  });

  return NextResponse.json(data, { status: 200, statusText: 'products received successfully' });
};
