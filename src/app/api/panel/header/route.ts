import { NextRequest, NextResponse } from "next/server";
import { Header } from "@prisma/client";
import { prisma } from "@services/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json() as Header[];

  const create = await prisma.header.createMany({
    data: body
  });

  if (!create) {
    return NextResponse.json([], { status: 400, statusText: 'header not received' });
  };

  return NextResponse.json(true, { status: 200, statusText: 'header received successfully' });
};

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") as string;
  const body = await request.json() as Header;

  const create = await prisma.header.update({
    where: {
      id
    },
    data: body
  });

  if (!create) {
    return NextResponse.json([], { status: 400, statusText: 'header not received' });
  };

  return NextResponse.json(true, { status: 200, statusText: 'header updated successfully' });
};

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") as string;

  const deleted = await prisma.header.delete({
    where: {
      id
    },
  });

  if (!deleted) {
    return NextResponse.json([], { status: 400, statusText: 'header not received' });
  };

  return NextResponse.json(true, { status: 200, statusText: 'header updated successfully' });
};