import type { Metadata } from "next";
// Fuentes auto-alojadas (@fontsource) en vez de next/font/google: así el
// build no depende de poder alcanzar fonts.googleapis.com.
import "@fontsource/anton/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: "THE BEAR | Hecho para antojar",
  description:
    "Sándwiches especiales: Pulled Pork y Nashville Hot Chicken. Pide a domicilio en Mariquita, Tolima.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-bear-bg font-sans text-white antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
