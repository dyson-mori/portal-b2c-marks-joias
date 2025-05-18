import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@services/prisma";

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const order_id = url.searchParams.get("order_id") as string;
  const body = await request.json();

  const data = await prisma.order.update({
    where: {
      id: order_id
    },
    data: {
      status: body.status
    }
  });

  return NextResponse.json(data, { status: 201, statusText: 'products received successfully' });
};