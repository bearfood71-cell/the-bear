"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeftIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const PAYMENT_METHODS = ["Efectivo", "Transferencia", "Nequi", "Daviplata"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [reference, setReference] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);
  const [error, setError] = useState<string | null>(null);

  // Si alguien llega aquí con el carrito vacío (o ya hizo el pedido),
  // lo mandamos de vuelta al menú.
  useEffect(() => {
    if (items.length === 0) {
      router.replace("/menu");
    }
  }, [items.length, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !address.trim()) {
      setError("Por favor completa al menos el nombre y la dirección.");
      return;
    }
    setError(null);

    const message = buildOrderMessage(
      items,
      {
        name: name.trim(),
        address: address.trim(),
        neighborhood: neighborhood.trim(),
        reference: reference.trim(),
        paymentMethod,
      },
      totalPrice
    );

    window.open(buildWhatsAppUrl(message), "_blank");
    clearCart();
    router.push("/menu");
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-5">
        <div className="mb-5 flex items-center gap-2">
          <Link href="/carrito" className="text-bear-muted">
            <ChevronLeftIcon />
          </Link>
          <h1 className="font-display text-xl uppercase tracking-wide text-white">
            Datos del pedido
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Nombre completo" required>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Juan Pérez"
              className="w-full rounded-lg border border-bear-border bg-bear-surface px-3 py-2 text-sm text-white placeholder:text-bear-muted focus:border-bear-primary focus:outline-none"
            />
          </Field>

          <Field label="Dirección" required>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ej. Calle 10 # 5-32"
              className="w-full rounded-lg border border-bear-border bg-bear-surface px-3 py-2 text-sm text-white placeholder:text-bear-muted focus:border-bear-primary focus:outline-none"
            />
          </Field>

          <Field label="Barrio">
            <input
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder="Ej. Centro"
              className="w-full rounded-lg border border-bear-border bg-bear-surface px-3 py-2 text-sm text-white placeholder:text-bear-muted focus:border-bear-primary focus:outline-none"
            />
          </Field>

          <Field label="Referencia">
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Ej. Casa blanca, cerca al parque"
              className="w-full rounded-lg border border-bear-border bg-bear-surface px-3 py-2 text-sm text-white placeholder:text-bear-muted focus:border-bear-primary focus:outline-none"
            />
          </Field>

          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-bear-muted">
              Método de pago
            </span>
            <div className="flex flex-col gap-2">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 rounded-lg border border-bear-border bg-bear-surface px-3 py-2 text-sm text-white"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="accent-bear-primary"
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-bear-primary py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-bear-primary-dark"
          >
            Pedir por WhatsApp
          </button>
          <p className="text-center text-xs text-bear-muted">
            Tu información solo se usa para procesar este pedido.
          </p>
        </form>
      </main>
    </div>
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
