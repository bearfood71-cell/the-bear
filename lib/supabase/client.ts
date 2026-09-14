import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase para usar en Client Components (navegador).
// Solo puede leer datos públicos gracias a las políticas RLS.
export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createClient(url, anonKey);
}
