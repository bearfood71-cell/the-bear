import { createBrowserClient } from "@supabase/ssr";

// Cliente de Supabase para Client Components (navegador).
// Si hay sesión de admin iniciada, sus peticiones van autenticadas.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
