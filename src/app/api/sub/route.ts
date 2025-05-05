// console.log(process.env.VITE_SERGIO_ENVIRONMENT_VARIABLE);
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@services/prisma";
import { SubCategory } from "@prisma/client";

export async function GET() {
  const aside = await prisma.category.findMany({
    include: {
      sub: true,
    }
  });

  if (!aside) {
    throw new Error('Aside Server Error')
  };

  return NextResponse.json(aside);
};

export async function POST(request: NextRequest) {
  const { title, category_id } = await request.json() as SubCategory;

  const category = await prisma.subCategory.create({
    data: {
      title,
      category_id,
    },
  });

  if (!category) {
    throw new Error('Category Server Error')
  };

  return NextResponse.json(true);
};

// export async function PUT(request: NextRequest) {
//   const url = new URL(request.url);
//   const id = url.searchParams.get("id") as string;

//   const body = await request.json() as { title: string, categories: Category[] };

//   const aside = await prisma.aside.update({
//     where: {
//       id
//     },
//     data: {
//       title: body.title,
//       categories: {
//         disconnect: body.categories.map(({ id }) => ({ id })),
//         connect: body.categories.map(({ id }) => ({ id }))
//       }
//     }
//   });

//   if (!aside) {
//     throw new Error('Category Server Error')
//   };

//   return NextResponse.json(true);
// };

// export async function DELETE(request: NextRequest) {
//   const url = new URL(request.url);
//   const id = url.searchParams.get("id") as string;

//   const category = await prisma.aside.delete({
//     where: {
//       id
//     },
//   });

//   if (!category) {
//     throw new Error('Category Server Error')
//   };

//   return NextResponse.json(true);
// };

// const category = [
//   {
//     "name": "Conjunto",
//     "maxHeight": 50 + 40 * 5,
//     "sub": [
//       {
//         "id": "clyp5g9v30000y4iwb6dw4wfn",
//         "name": "cosplay"
//       },
//       {
//         "id": "clyp5wne60009y4iwjkfeobj5",
//         "name": "huge breasts"
//       },
//       {
//         "id": "clyp6mut5000ay4iw0rcg2vve",
//         "name": "huge ass"
//       },
//       {
//         "id": "clyrlct24000ka4h0qjmxm39i",
//         "name": "goth"
//       },
//       {
//         "id": "clyilsuge000197dw0ye7d91w",
//         "name": "bigtits"
//       },
//       {
//         "id": "clyilsvfc000397dwnuqvblla",
//         "name": "breast"
//       },
//       {
//         "id": "clyilswlu000597dwvmkjpfsf",
//         "name": "bust"
//       },
//       {
//         "id": "clyilsxpc000797dwforats4w",
//         "name": "dresse"
//       },
//       {
//         "id": "clyilsyv5000997dwpxqx0b95",
//         "name": "squeez"
//       },
//       {
//         "id": "clyilszrn000b97dwovl5ifjm",
//         "name": "squeeze boob"
//       },
//       {
//         "id": "clyisp8bp0002opd3oj3t3clc",
//         "name": "squeeze tit"
//       },
//       {
//         "id": "clyispa5r0004opd3jveyy2fj",
//         "name": "shak"
//       },
//       {
//         "id": "clyispbpr0006opd3rgn2gpos",
//         "name": "shake"
//       },
//       {
//         "id": "clyispdgx0008opd30w0pb1mg",
//         "name": "cleavag"
//       }
//     ]
//   },
//   {
//     "name": "Aneis",
//     "maxHeight": 50 + 40 * 3,
//     "sub": [
//       {
//         "id": "clyispn3u000iopd3m67p6s3j",
//         "name": "big"
//       },
//       {
//         "id": "clyilsxpc000797dwforats4w",
//         "name": "small"
//       },
//       {
//         "id": "clyi4fkmc0017jkddgi6j7m3s",
//         "name": "huge"
//       },
//       {
//         "id": "clyi4flry0019jkddcnw35q8h",
//         "name": "thin"
//       },
//       {
//         "id": "clyilsuge000197dw0ye7d91w",
//         "name": "big tits"
//       },
//       {
//         "id": "clyilsvfc000397dwnuqvblla",
//         "name": "breast"
//       },
//       {
//         "id": "clyilswlu000597dwvmkjpfsf",
//         "name": "bust"
//       },
//       {
//         "id": "clyilsxpc000797dwforats4w",
//         "name": "dresse"
//       }
//     ]
//   },
//   {
//     "name": "Pulseiras",
//     "maxHeight": 50 + 40 * 5,
//     "sub": [
//       {
//         "id": "clyispn3u000iopd3m67p6s3j",
//         "name": "big"
//       },
//       {
//         "id": "clyilsxpc000797dwforats4w",
//         "name": "small"
//       },
//       {
//         "id": "clyi4fkmc0017jkddgi6j7m3s",
//         "name": "huge"
//       },
//       {
//         "id": "clyi4flry0019jkddcnw35q8h",
//         "name": "thin"
//       },
//       {
//         "id": "clyilsuge000197dw0ye7d91w",
//         "name": "big tits"
//       },
//       {
//         "id": "clyilsvfc000397dwnuqvblla",
//         "name": "breast"
//       },
//       {
//         "id": "clyilswlu000597dwvmkjpfsf",
//         "name": "bust"
//       },
//       {
//         "id": "clyilsxpc000797dwforats4w",
//         "name": "dresse"
//       },
//       {
//         "id": "clyilsyv5000997dwpxqx0b95",
//         "name": "squeez"
//       },
//       {
//         "id": "clyilszrn000b97dwovl5ifjm",
//         "name": "squeeze boob"
//       },
//       {
//         "id": "clyisp8bp0002opd3oj3t3clc",
//         "name": "squeeze tit"
//       },
//       {
//         "id": "clyispa5r0004opd3jveyy2fj",
//         "name": "shak"
//       },
//       {
//         "id": "clyispbpr0006opd3rgn2gpos",
//         "name": "shake"
//       },
//       {
//         "id": "clyispdgx0008opd30w0pb1mg",
//         "name": "cleavag"
//       }
//     ]
//   },
//   {
//     "name": "Solitários",
//     "maxHeight": 50 + 40 * 3,
//     "sub": [
//       {
//         "id": "clyispn3u000iopd3m67p6s3j",
//         "name": "big"
//       },
//       {
//         "id": "clyilsxpc000797dwforats4w",
//         "name": "small"
//       },
//       {
//         "id": "clyi4fkmc0017jkddgi6j7m3s",
//         "name": "huge"
//       },
//       {
//         "id": "clyi4flry0019jkddcnw35q8h",
//         "name": "thin"
//       },
//       {
//         "id": "clyilsuge000197dw0ye7d91w",
//         "name": "big tits"
//       },
//       {
//         "id": "clyilsvfc000397dwnuqvblla",
//         "name": "breast"
//       },
//       {
//         "id": "clyilswlu000597dwvmkjpfsf",
//         "name": "bust"
//       },
//       {
//         "id": "clyilsxpc000797dwforats4w",
//         "name": "dresse"
//       }
//     ]
//   }
// ];