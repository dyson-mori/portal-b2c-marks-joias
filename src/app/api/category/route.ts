import { NextResponse } from "next/server";

import { prisma } from "@services/prisma";

export async function GET() {
  const category = await prisma.category.findMany({
    where: {
      show_on_landing: true
    },
    orderBy: {
      title: 'asc'
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      show_on_landing: true
    }
  });

  if (!category) {
    return NextResponse.json(category, { status: 400, statusText: 'category server error' });
  };

  return NextResponse.json(category, { status: 200, statusText: 'category received successfully' });
};
