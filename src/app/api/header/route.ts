// console.log(process.env.VITE_SERGIO_ENVIRONMENT_VARIABLE);
import { NextResponse } from "next/server";

export async function GET() {
  const header = [
    {
      href: '/',
      label: 'Produtos',
      public: true
    },
    {
      href: '/panel',
      label: 'Panel',
      public: false
    },
    {
      href: '/tracking',
      label: 'Rastreamento',
      public: true
    }
  ];

  if (!header) {
    throw new Error('Category Server Error')
  };

  return NextResponse.json(header);
};