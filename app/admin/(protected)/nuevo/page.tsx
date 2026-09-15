import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/ProductForm";
import type { Category } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function NuevoProductoPage() {
  const supabase = createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl uppercase tracking-wide">
        Nuevo producto
      </h1>
      <ProductForm mode="create" categories={(categories ?? []) as Category[]} />
    </div>
  );
}
