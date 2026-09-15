"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { slugify } from "@/lib/slug";
import { ProductImage } from "@/components/ProductImage";
import type { Category, Product } from "@/lib/types";

type Props = {
  mode: "create" | "edit";
  categories: Category[];
  initialProduct?: Product;
};

export function ProductForm({ mode, categories, initialProduct }: Props) {
  const router = useRouter();

  const [name, setName] = useState(initialProduct?.name ?? "");
  const [description, setDescription] = useState(
    initialProduct?.description ?? ""
  );
  const [price, setPrice] = useState(
    initialProduct ? String(initialProduct.price) : ""
  );
  const [categoryId, setCategoryId] = useState(
    initialProduct?.category_id ?? categories[0]?.id ?? ""
  );
  const [isActive, setIsActive] = useState(initialProduct?.is_active ?? true);
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialProduct?.image_url ?? null
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const url = await uploadImageToCloudinary(file);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
      setError(
        "No se pudo subir la imagen. Revisa la configuración de Cloudinary."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !price || !categoryId) {
      setError("Completa al menos nombre, precio y categoría.");
      return;
    }

    setSaving(true);
    setError(null);

    const supabase = createClient();
    const payload = {
      name: name.trim(),
      description: description.trim() || null,
      price: Math.round(Number(price)),
      category_id: categoryId,
      is_active: isActive,
      image_url: imageUrl,
    };

    if (mode === "create") {
      const { error } = await supabase.from("products").insert({
        ...payload,
        slug: `${slugify(name)}-${Date.now().toString(36)}`,
      });
      setSaving(false);
      if (error) {
        setError(`No se pudo crear: ${error.message}`);
        return;
      }
    } else if (initialProduct) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", initialProduct.id);
      setSaving(false);
      if (error) {
        setError(`No se pudo guardar: ${error.message}`);
        return;
      }
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-bear-muted">
          Imagen
        </span>
        <div className="flex items-center gap-4">
          <ProductImage
            src={imageUrl}
            alt={name || "Producto"}
            className="h-20 w-20 shrink-0 rounded-lg"
          />
          <label className="cursor-pointer rounded-full border border-bear-border px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
            {uploading ? "Subiendo..." : "Cambiar imagen"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <Field label="Nombre" required>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. Pulled Pork"
          className="w-full rounded-lg border border-bear-border bg-bear-surface px-3 py-2 text-sm text-white placeholder:text-bear-muted focus:border-bear-primary focus:outline-none"
        />
      </Field>

      <Field label="Descripción">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ej. Cerdo cocinado lentamente, coleslaw, salsa BBQ de la casa."
          rows={3}
          className="w-full rounded-lg border border-bear-border bg-bear-surface px-3 py-2 text-sm text-white placeholder:text-bear-muted focus:border-bear-primary focus:outline-none"
        />
      </Field>

      <Field label="Precio (COP)" required>
        <input
          type="number"
          min={0}
          step={500}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Ej. 20000"
          className="w-full rounded-lg border border-bear-border bg-bear-surface px-3 py-2 text-sm text-white placeholder:text-bear-muted focus:border-bear-primary focus:outline-none"
        />
      </Field>

      <Field label="Categoría" required>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded-lg border border-bear-border bg-bear-surface px-3 py-2 text-sm text-white focus:border-bear-primary focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </Field>

      <label className="flex items-center gap-2 text-sm text-white">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="accent-bear-primary"
        />
        Producto activo (visible en el menú)
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={saving || uploading}
        className="mt-2 w-full rounded-full bg-bear-primary py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-bear-primary-dark disabled:opacity-60"
      >
        {saving ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-bear-muted">
        {label}
        {required && <span className="text-bear-primary"> *</span>}
      </span>
      {children}
    </label>
  );
}
