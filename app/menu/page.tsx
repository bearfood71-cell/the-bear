import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { CategorySection } from "@/components/CategorySection";
import { getCatalog } from "@/lib/catalog";

// El catálogo se administra desde Supabase, así que siempre lo
// renderizamos en el servidor sin cachear una versión estática.
export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const categories = await getCatalog();
  const hasProducts = categories.some((c) => c.products.length > 0);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-5">
        <h1 className="mb-5 font-display text-2xl uppercase tracking-wide text-white">
          Menú
        </h1>

        {hasProducts ? (
          categories.map((category) => (
            <div key={category.id} id={category.slug}>
              <CategorySection category={category} />
            </div>
          ))
        ) : (
          <p className="text-sm text-bear-muted">
            Todavía no hay productos publicados. Agrégalos desde el panel de
            administración o directamente en Supabase.
          </p>
        )}
      </main>

      <BottomNav active="menu" />
    </div>
  );
}
