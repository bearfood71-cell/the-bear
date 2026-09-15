import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/ProductForm";
import type { Category, Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditarProductoPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").eq("id", params.id).single(),
    supabase
      .from("categories")
      .select("id, name, slug, sort_order")
      .order("sort_order", { ascending: true }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl uppercase tracking-wide">
        Editar producto
      </h1>
      <ProductForm
        mode="edit"
        initialProduct={product as Product}
        categories={(categories ?? []) as Category[]}
      />
    </div>
  );
}
