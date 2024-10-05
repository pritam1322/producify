import { Provider } from "@/lib/reactQuery-provider";
import type { Metadata } from "next";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import SessionWrapper from "../components/SessionWrapper";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper >
          <Toaster />
          <Header />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
