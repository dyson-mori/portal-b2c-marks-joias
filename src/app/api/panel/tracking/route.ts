import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@services/prisma";

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const external_reference = url.searchParams.get("order_id") as string;
  const body = await request.json();

  const track = await prisma.order.findFirst({
    where: {
      external_reference: external_reference
    }
  });

  if (!track) {
    return NextResponse.json({}, { status: 400, statusText: 'unable to update this track!' });
  };

  const data = await prisma.order.update({
    where: {
      id: track.id
    },
    data: {
      status: body.status
    }
  });

  return NextResponse.json(data, { status: 201, statusText: 'products received successfully' });
};