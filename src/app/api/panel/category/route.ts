import { NextRequest, NextResponse } from "next/server";
import { Category } from "@prisma/client";

import { prisma } from "@services/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json() as Category[];

  const data = await prisma.category.createMany({
    data: body
  });

  return NextResponse.json(data);
};

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code") as string;
  const body = await request.json() as Category;

  const find_category = await prisma.category.findFirst({
    where: {
      code: Number(code)
    },
  });

  const category = await prisma.category.update({
    where: {
      id: find_category?.id
    },
    data: body
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