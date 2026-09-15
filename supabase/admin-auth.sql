-- THE BEAR — permisos de escritura para el panel de administración
-- Ejecutar en el SQL Editor de Supabase, DESPUÉS de schema.sql.

-- Cualquier usuario autenticado (es decir, que haya iniciado sesión con
-- el login del admin) puede crear, editar, eliminar y ver TODOS los
-- productos (activos e inactivos) y categorías.
--
-- No hay registro público de usuarios en esta app: los únicos usuarios
-- que van a existir son los que tú crees manualmente desde Supabase
-- (Authentication > Users > Add user), así que "autenticado" = admin.

drop policy if exists "products_admin_all" on public.products;
create policy "products_admin_all"
  on public.products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "categories_admin_all" on public.categories;
create policy "categories_admin_all"
  on public.categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
