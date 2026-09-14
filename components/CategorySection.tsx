import { ProductCard } from "@/components/ProductCard";
import type { CategoryWithProducts } from "@/lib/types";

export function CategorySection({
  category,
}: {
  category: CategoryWithProducts;
}) {
  if (category.products.length === 0) {
    return null;
  }

  return (
    <section className="mb-6">
      <h2 className="mb-3 font-display text-sm uppercase tracking-widest text-bear-muted">
        {category.name}
      </h2>
      <div className="flex flex-col gap-3">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
