import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase para usar en Server Components / server actions.
// Por ahora usa la misma anon key (solo lectura pública vía RLS).
// Cuando construyamos el panel de admin con autenticación, agregaremos
// aquí el manejo de sesión/cookies.
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
    },
  });
}
