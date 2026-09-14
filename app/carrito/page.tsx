import { Header } from "@/components/Header";

// Placeholder: el carrito real (agregar productos, cantidades, checkout
// por WhatsApp) lo construimos en un próximo paso.
export default function CarritoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-lg uppercase tracking-wide text-white">
          Tu carrito
        </p>
        <p className="mt-2 text-sm text-bear-muted">
          Muy pronto vas a poder armar tu pedido aquí.
        </p>
      </main>
    </div>
  );
}
