import Link from "next/link";
import { HomeIcon, BagIcon, UserIcon } from "@/components/icons";

const items = [
  { href: "/menu", label: "Menú", icon: HomeIcon },
  { href: "/pedidos", label: "Pedidos", icon: BagIcon },
  { href: "/perfil", label: "Perfil", icon: UserIcon },
] as const;

export function BottomNav({ active }: { active: "menu" | "pedidos" | "perfil" }) {
  return (
    <nav className="sticky bottom-0 z-10 grid grid-cols-3 border-t border-bear-border bg-bear-bg/95 backdrop-blur">
      {items.map((item) => {
        const isActive = item.href === `/${active}`;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-3 text-xs ${
              isActive ? "text-bear-primary" : "text-bear-muted"
            }`}
          >
            <Icon className="h-6 w-6" />
            <span className="uppercase tracking-wide">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
