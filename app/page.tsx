"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CartIcon, MenuIconGlyph, PinIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";

export default function HomePage() {
  const { totalItems } = useCart();

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-bear-bg px-6 pb-10 pt-6">
      {/* Resplandor decorativo de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-bear-primary/20 blur-3xl"
      />

      <div className="relative z-10 flex items-center justify-between">
        <button type="button" aria-label="Abrir menú" className="text-white">
          <MenuIconGlyph />
        </button>
        <Link href="/carrito" aria-label="Ver carrito" className="relative text-white">
          <CartIcon />
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-bear-primary px-1 text-[10px] font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      <div className="relative z-10 mt-16 flex flex-1 flex-col items-center justify-center text-center">
        <Logo size="lg" />
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-bear-muted">
          Hecho para antojar
        </p>

        <div className="mt-14 flex gap-10">
          <Link
            href="/menu#sandwiches"
            className="flex flex-col items-center gap-2 text-white"
          >
            <span className="text-4xl">🐷</span>
            <span className="text-xs font-semibold uppercase tracking-wide">
              Pulled Pork
            </span>
          </Link>
          <Link
            href="/menu#sandwiches"
            className="flex flex-col items-center gap-2 text-white"
          >
            <span className="text-4xl">🔥</span>
            <span className="text-xs font-semibold uppercase tracking-wide">
              Nashville
            </span>
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <Link
          href="/menu"
          className="w-full max-w-sm rounded-full bg-bear-primary py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-bear-primary-dark"
        >
          Ver menú →
        </Link>
        <div className="flex items-center gap-1 text-xs text-bear-muted">
          <PinIcon />
          <span>Mariquita, Tolima</span>
        </div>
      </div>
    </main>
  );
}
