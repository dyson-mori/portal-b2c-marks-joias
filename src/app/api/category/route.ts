import { NextRequest, NextResponse } from "next/server";
import { Category } from "@prisma/client";

import { prisma } from "@services/prisma";

export async function GET() {
  const category = await prisma.category.findMany({
    orderBy: {
      title: 'asc'
    },
    select: {
      id: true,
      title: true,
      sub: true
    }
  });

  if (!category) {
    return NextResponse.json(category, { status: 400, statusText: 'category server error' });
  };

  return NextResponse.json(category, { status: 200, statusText: 'category received successfully' });
};

export async function POST(request: NextRequest) {
  const body = await request.json() as Category[];

  const data = await prisma.category.createMany({
    data: body
  });

  // if (!category) {
  //   throw new Error('Category Server Error')
  // };

  return NextResponse.json(data);
};

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") as string;
  const body = await request.json() as Category;

  const category = await prisma.category.update({
    where: {
      id
    },
    data: {
      title: body.title,
    },
  });

  if (!category) {
    throw new Error('Category Server Error')
  };

  return NextResponse.json(true);
};

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") as string;

  const category = await prisma.category.delete({
    where: {
      id
    },
  });

  if (!category) {
    throw new Error('Category Server Error')
  };

  return NextResponse.json(true);
};