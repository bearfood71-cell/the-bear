import { WHATSAPP_NUMBER, STORE_NAME } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/lib/cart-context";

export type CustomerInfo = {
  name: string;
  address: string;
  neighborhood: string;
  reference: string;
  paymentMethod: string;
};

export function buildOrderMessage(
  items: CartItem[],
  customer: CustomerInfo,
  total: number
): string {
  const lines: string[] = [];

  lines.push(`Hola ${STORE_NAME}, quiero hacer un pedido:`);
  lines.push("");

  for (const item of items) {
    lines.push(`- ${item.name} x${item.quantity}`);
  }

  lines.push("");
  lines.push(`Total: ${formatPrice(total)}`);
  lines.push("");
  lines.push(`Nombre: ${customer.name}`);
  lines.push(`Dirección: ${customer.address}`);
  if (customer.neighborhood) lines.push(`Barrio: ${customer.neighborhood}`);
  if (customer.reference) lines.push(`Referencia: ${customer.reference}`);
  lines.push(`Pago: ${customer.paymentMethod}`);
  lines.push("");
  lines.push("¡Gracias!");

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
