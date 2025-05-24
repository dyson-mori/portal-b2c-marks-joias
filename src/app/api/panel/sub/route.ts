import { NextRequest, NextResponse } from "next/server";
import { Category, Sub } from "@prisma/client";

import { prisma } from "@services/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json() as Sub;

  const data = await prisma.sub.create({
    data: {
      category_id: body.category_id,
      title: body.title
    }
  });

  return NextResponse.json(data, { status: 201, statusText: 'successfully created product!' });
};

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") as string;
  const body = await request.json() as Category;

  const find_category = await prisma.category.findFirst({
    where: {
      id: Number(id)
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
  const id = url.searchParams.get("id");

  const category = await prisma.category.delete({
    where: {
      id: Number(id)
    },
  });

  if (!category) {
    throw new Error('Category Server Error')
  };

  return NextResponse.json(true);
};