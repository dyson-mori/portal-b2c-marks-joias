import { NextRequest, NextResponse } from "next/server";
import { Header } from "@prisma/client";

import { prisma } from "@services/prisma";

export async function GET() {
  const header = await prisma.header.findMany();

  if (!header) {
    return NextResponse.json([], { status: 400, statusText: 'header not received' });
  };

  return NextResponse.json(header, { status: 200, statusText: 'header received successfully' });
};

export async function POST(request: NextRequest) {
  const { title, param, public: isPublic } = await request.json() as Header;

  const create = await prisma.header.create({
    data: {
      title,
      param,
      public: isPublic,
    }
  });

  if (!create) {
    return NextResponse.json([], { status: 400, statusText: 'header not received' });
  };

  return NextResponse.json(true, { status: 200, statusText: 'header received successfully' });
};