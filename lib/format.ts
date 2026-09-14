// Formatea un precio en pesos colombianos, ej: 20000 -> "$ 20.000"
export function formatPrice(value: number): string {
  const formatted = new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 0,
  }).format(value);
  return `$ ${formatted}`;
}
