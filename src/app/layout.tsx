import { Montserrat } from "next/font/google";

import { api } from "@services/api";

import Tempalte from "../template";

const font = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  style: ['italic', 'normal'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const header = await api.header.list();

  return (
    <html lang="pt" className={font.variable}>
      <body>
        <Tempalte header={header}>
          {children}
        </Tempalte>
      </body>
    </html>
  );
}
