import { Montserrat, Montserrat_Alternates } from "next/font/google";

import { api } from "@services/api";

import Tempalte from "../template";

const font = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  style: ['italic', 'normal'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const montserrat_alternates = Montserrat_Alternates({
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  style: ['italic', 'normal'],
  subsets: ['latin'],
  variable: '--font-montserrat-alternates',
});

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const header = await api.header.list();

  return (
    <html lang="pt" className={`${font.variable} ${montserrat_alternates.variable}`}>
      <body>
        <Tempalte data={header}>
          {children}
        </Tempalte>
      </body>
    </html>
  );
}
