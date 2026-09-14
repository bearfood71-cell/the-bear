-- THE BEAR — esquema inicial: categorías y productos
-- Ejecutar completo en el SQL Editor de Supabase (Project > SQL Editor > New query)

-- 1. Tabla de categorías -----------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 2. Tabla de productos --------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  name text not null,
  slug text not null unique,
  description text,
  price integer not null check (price >= 0), -- precio en pesos colombianos, sin decimales
  image_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on public.products(category_id);

-- 3. Seguridad a nivel de fila (RLS) -------------------------------------
alter table public.categories enable row level security;
alter table public.products enable row level security;

-- Cualquiera puede leer las categorías (son solo la estructura del menú)
drop policy if exists "categories_public_read" on public.categories;
create policy "categories_public_read"
  on public.categories for select
  using (true);

-- El público solo puede leer productos activos
drop policy if exists "products_public_read_active" on public.products;
create policy "products_public_read_active"
  on public.products for select
  using (is_active = true);

-- Por ahora NO hay políticas de escritura para el público ni para usuarios
-- autenticados: las inserciones/ediciones se harán con la service_role key
-- desde el panel de administración (paso siguiente), que se salta RLS.

-- 4. Categorías iniciales --------------------------------------------------
insert into public.categories (name, slug, sort_order) values
  ('Sándwiches', 'sandwiches', 1),
  ('Acompañamientos', 'acompanamientos', 2),
  ('Bebidas', 'bebidas', 3)
on conflict (slug) do nothing;

-- 5. Productos iniciales: los 2 sándwiches ---------------------------------
-- Ajusta precio/descripción cuando quieras: es solo un UPDATE en esta tabla.
insert into public.products (category_id, name, slug, description, price, sort_order)
select id, 'Pulled Pork', 'pulled-pork',
  'Cerdo cocinado lentamente, coleslaw, salsa BBQ de la casa.',
  20000, 1
from public.categories where slug = 'sandwiches'
on conflict (slug) do nothing;

insert into public.products (category_id, name, slug, description, price, sort_order)
select id, 'Nashville Hot Chicken', 'nashville',
  'Pollo crujiente estilo Nashville, pepinillos y salsa de la casa.',
  20000, 2
from public.categories where slug = 'sandwiches'
on conflict (slug) do nothing;

-- Los productos de "Acompañamientos" y "Bebidas" quedan pendientes:
-- me dices qué items van (ej. Papas $5.000, Gaseosas/Agua $4.000, etc.)
-- y te paso el INSERT correspondiente.
