"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { ProductImage } from "@/components/ProductImage";
import { ChevronLeftIcon, MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export default function CarritoPage() {
  const { items, increment, decrement, removeItem, clearCart, totalPrice } =
    useCart();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-5">
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/menu"
            className="flex items-center gap-1 text-sm text-bear-muted"
          >
            <ChevronLeftIcon />
            Volver
          </Link>
          <h1 className="font-display text-xl uppercase tracking-wide text-white">
            Tu pedido
          </h1>
          {items.length > 0 ? (
            <button
              type="button"
              onClick={clearCart}
              aria-label="Vaciar carrito"
              className="text-bear-muted"
            >
              <TrashIcon />
            </button>
          ) : (
            <span className="w-5" />
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 pt-16 text-center">
            <p className="text-sm text-bear-muted">
              Todavía no has agregado nada a tu pedido.
            </p>
            <Link
              href="/menu"
              className="rounded-full bg-bear-primary px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white"
            >
              Ver menú
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-3 rounded-xl border border-bear-border bg-bear-surface p-3"
              >
                <ProductImage
                  src={item.image_url}
                  alt={item.name}
                  className="h-16 w-16 shrink-0 rounded-lg"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-sm uppercase tracking-wide text-white">
                        {item.name}
                      </h3>
                      <p className="text-xs text-bear-muted">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      aria-label={`Quitar ${item.name}`}
                      className="text-bear-muted"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-full border border-bear-border px-2 py-1">
                      <button
                        type="button"
                        onClick={() => decrement(item.productId)}
                        aria-label="Restar"
                        className="text-white"
                      >
                        <MinusIcon className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-4 text-center text-sm text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => increment(item.productId)}
                        aria-label="Sumar"
                        className="text-white"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-semibold text-bear-primary">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {items.length > 0 && (
        <div className="sticky bottom-0 border-t border-bear-border bg-bear-bg px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm uppercase tracking-wide text-bear-muted">
              Total
            </span>
            <span className="font-display text-xl text-white">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="block w-full rounded-full bg-bear-primary py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-bear-primary-dark"
          >
            Continuar
          </Link>
        </div>
      )}
    </div>
  );
}
