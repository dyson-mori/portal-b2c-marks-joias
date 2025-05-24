"use client"

import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";

import { usePathname } from "next/navigation";

import { HeaderProps } from "@global/interfaces";

import Global from "../global/styles";
import themes from "../global/theme";
import ShoppingProvider from '../context/shopping';

import Footer from "./footer";
import Header from "./header";
import Splash from "./splash";

type Template = {
  children: React.ReactNode;
  data: HeaderProps;
};

export default function Template({ children, data }: Readonly<Template>) {
  const param = usePathname();
  const hide = param === '/success';

  return (
    <ThemeProvider theme={themes}>
      <ShoppingProvider>
        <Suspense fallback={<Splash />}>
          <Header data={data} hide={hide} param={param} />
          {children}
          <Footer hide={hide} />
        </Suspense>
      </ShoppingProvider>
      <Global />
    </ThemeProvider>
  )
}