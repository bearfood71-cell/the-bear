"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ProductImage";
import { PlusIcon } from "@/components/icons";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <div className="flex gap-3 rounded-xl border border-bear-border bg-bear-surface p-3">
      <ProductImage
        src={product.image_url}
        alt={product.name}
        className="h-20 w-20 shrink-0 rounded-lg"
      />

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-display text-base uppercase tracking-wide text-white">
            {product.name}
          </h3>
          {product.description && (
            <p className="mt-1 text-sm text-bear-muted">
              {product.description}
            </p>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-bear-primary">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition ${
              justAdded
                ? "bg-green-600"
                : "bg-bear-primary hover:bg-bear-primary-dark"
            }`}
          >
            {justAdded ? "Agregado ✓" : "Agregar"}
            {!justAdded && <PlusIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}
