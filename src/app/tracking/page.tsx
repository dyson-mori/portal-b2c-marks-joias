import type { Metadata } from "next";

import App from "./app";

export const metadata: Metadata = {
  title: "Mark's Jóias | Rastreamento",
  description: "Rastreie o seus produtos",
};

export default function Page() {
  return <App />
};