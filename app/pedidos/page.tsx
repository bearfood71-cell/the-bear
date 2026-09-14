import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

// Placeholder: el historial/estado de pedidos se construye más adelante.
export default function PedidosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-lg uppercase tracking-wide text-white">
          Tus pedidos
        </p>
        <p className="mt-2 text-sm text-bear-muted">
          Próximamente vas a poder ver el estado de tus pedidos aquí.
        </p>
      </main>
      <BottomNav active="pedidos" />
    </div>
  );
}
