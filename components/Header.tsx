import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CartIcon, MenuIconGlyph } from "@/components/icons";

export function Header({ showMenuIcon = false }: { showMenuIcon?: boolean }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-bear-border bg-bear-bg/95 px-4 py-3 backdrop-blur">
      {showMenuIcon ? (
        <button
          type="button"
          aria-label="Abrir menú"
          className="text-white"
        >
          <MenuIconGlyph />
        </button>
      ) : (
        <span className="w-6" />
      )}

      <Link href="/" className="flex items-center">
        <Logo size="sm" />
      </Link>

      <Link href="/carrito" aria-label="Ver carrito" className="relative text-white">
        <CartIcon />
      </Link>
    </header>
  );
}
