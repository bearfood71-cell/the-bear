import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

// Placeholder: perfil/datos del cliente se construye más adelante.
export default function PerfilPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-lg uppercase tracking-wide text-white">
          Tu perfil
        </p>
        <p className="mt-2 text-sm text-bear-muted">
          Próximamente vas a poder guardar tus datos aquí.
        </p>
      </main>
      <BottomNav active="perfil" />
    </div>
  );
}
