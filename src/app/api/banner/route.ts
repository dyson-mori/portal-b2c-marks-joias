import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@services/prisma";

export async function GET() {
  const data = await prisma.banner.findMany({
    where: {
      public: true
    }
  });

  return NextResponse.json(data, { status: 200, statusText: 'banner received successfully' });
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  const data = await prisma.banner.create({
    data: body
  });

  if (!data) {
    return NextResponse.json(false, { status: 400, statusText: 'banner server error' });
  };

  return NextResponse.json(true, { status: 200, statusText: 'banner received successfully' });
};

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const banner_id = url.searchParams.get("banner_id") as string;

  const body = await request.json();

  const data = await prisma.banner.update({
    where: {
      id: banner_id
    },
    data: body
  });

  if (!data) {
    return NextResponse.json(false, { status: 400, statusText: 'banner server error' });
  };

  return NextResponse.json(true, { status: 200, statusText: 'banner received successfully' });
};

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const banner_id = url.searchParams.get("banner_id") as string;

  const data = await prisma.banner.delete({
    where: {
      id: banner_id
    }
  });

  if (!data) {
    return NextResponse.json(false, { status: 400, statusText: 'banner server error' });
  };

  return NextResponse.json(true, { status: 200, statusText: 'banner received successfully' });
};