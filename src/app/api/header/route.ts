import { prisma } from "@services/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const header = await prisma.header.findMany();

  if (!header) {
    return NextResponse.json([], { status: 400, statusText: 'header not received' });
  };

  return NextResponse.json(header, { status: 200, statusText: 'header received successfully' });
};