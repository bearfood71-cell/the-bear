import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminProductRow } from "@/components/admin/AdminProductRow";
import type { Category, Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const supabase = createClient();

  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, slug, sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("products")
      .select(
        "id, category_id, name, slug, description, price, image_url, is_active, sort_order"
      )
      .order("sort_order", { ascending: true }),
  ]);

  const safeCategories = (categories ?? []) as Category[];
  const safeProducts = (products ?? []) as Product[];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl uppercase tracking-wide">
          Productos
        </h1>
        <Link
          href="/admin/nuevo"
          className="rounded-full bg-bear-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
        >
          + Nuevo producto
        </Link>
      </div>

      {safeCategories.map((category) => {
        const categoryProducts = safeProducts.filter(
          (p) => p.category_id === category.id
        );
        return (
          <section key={category.id} className="mb-8">
            <h2 className="mb-3 text-sm uppercase tracking-widest text-bear-muted">
              {category.name}
            </h2>
            {categoryProducts.length === 0 ? (
              <p className="text-sm text-bear-muted">
                Sin productos todavía en esta categoría.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {categoryProducts.map((product) => (
                  <AdminProductRow key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
