"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ProductImage } from "@/components/ProductImage";
import { TrashIcon } from "@/components/icons";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function AdminProductRow({ product }: { product: Product }) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  async function toggleActive() {
    setUpdating(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("products")
      .update({ is_active: !product.is_active })
      .eq("id", product.id);
    setUpdating(false);
    if (error) {
      alert(`No se pudo actualizar: ${error.message}`);
      return;
    }
    router.refresh();
  }

  async function handleDelete() {
    if (
      !confirm(
        `¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }
    const supabase = createClient();
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);
    if (error) {
      alert(`No se pudo eliminar: ${error.message}`);
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-bear-border bg-bear-surface p-3">
      <ProductImage
        src={product.image_url}
        alt={product.name}
        className="h-14 w-14 shrink-0 rounded-lg"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm uppercase tracking-wide text-white">
          {product.name}
        </p>
        <p className="text-xs text-bear-muted">{formatPrice(product.price)}</p>
      </div>

      <button
        type="button"
        onClick={toggleActive}
        disabled={updating}
        className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${
          product.is_active
            ? "bg-green-600/20 text-green-400"
            : "bg-bear-surface-alt text-bear-muted"
        }`}
      >
        {product.is_active ? "Activo" : "Inactivo"}
      </button>

      <Link
        href={`/admin/${product.id}`}
        className="shrink-0 text-xs font-semibold uppercase text-bear-primary"
      >
        Editar
      </Link>

      <button
        type="button"
        onClick={handleDelete}
        aria-label={`Eliminar ${product.name}`}
        className="shrink-0 text-bear-muted"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
