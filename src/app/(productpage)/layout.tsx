"use client";

import "./globals.css";
import { Provider } from "@/lib/reactQuery-provider";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";


export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body>
        
        <Provider>
          <Toaster />
          <CartProvider>
            {children}
          </CartProvider>
        </Provider>
      </body>
    </html>
  )
}
