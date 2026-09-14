import { createServerClient } from "@/lib/supabase/server";
import type { CategoryWithProducts } from "@/lib/types";

// Trae todas las categorías con sus productos activos, ordenados.
// Si algo falla (ej. credenciales de Supabase aún no configuradas),
// devuelve una lista vacía en vez de romper la página.
export async function getCatalog(): Promise<CategoryWithProducts[]> {
  try {
    const supabase = createServerClient();

    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .select("id, name, slug, sort_order")
      .order("sort_order", { ascending: true });

    if (categoriesError || !categories) {
      console.error("Error cargando categorías:", categoriesError);
      return [];
    }

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select(
        "id, category_id, name, slug, description, price, image_url, is_active, sort_order"
      )
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (productsError) {
      console.error("Error cargando productos:", productsError);
    }

    return categories.map((category) => ({
      ...category,
      products: (products ?? []).filter(
        (product) => product.category_id === category.id
      ),
    }));
  } catch (err) {
    console.error("No se pudo conectar a Supabase:", err);
    return [];
  }
}
