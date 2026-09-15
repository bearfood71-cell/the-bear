// Convierte un nombre de producto en un slug simple y único-ish,
// ej: "Nashville Hot Chicken" -> "nashville-hot-chicken"
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita tildes
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
