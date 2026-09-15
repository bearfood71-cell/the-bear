import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-bear-bg text-white">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-bear-border bg-bear-bg/95 px-4 py-3 backdrop-blur">
        <Link
          href="/admin"
          className="font-display text-lg uppercase tracking-wide"
        >
          THE <span className="text-bear-primary">BEAR</span> · Admin
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/menu" className="text-sm text-bear-muted">
            Ver sitio
          </Link>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-6">{children}</main>
    </div>
  );
}
