import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@services/prisma";

export async function GET(request: NextRequest) {
  const data = await prisma.banner.findMany({
    where: {
      public: true
    }
  });

  return NextResponse.json(data, { status: 200, statusText: 'products received successfully' });
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  const data = await prisma.banner.create({
    data: body
  });

  return NextResponse.json(data, { status: 200, statusText: 'products received successfully' });
};
