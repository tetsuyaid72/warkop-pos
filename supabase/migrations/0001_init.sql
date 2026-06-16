-- =====================================================
-- E-Catalog QR Ordering: schema, RLS, seed
-- =====================================================

-- Outlets (warung that owns a QR)
create table if not exists public.outlets (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  qr_token text unique not null,
  tax_percentage numeric default 10,
  service_charge_percentage numeric default 5,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Orders: queue of customer orders coming via QR
do $$ begin
  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type order_status as enum ('pending', 'accepted', 'preparing', 'served', 'rejected');
  end if;
end $$;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  outlet_id uuid not null references public.outlets(id) on delete cascade,
  order_number text not null,
  table_number text,
  customer_name text,
  customer_phone text,
  items jsonb not null,
  subtotal numeric not null,
  status order_status not null default 'pending',
  customer_note text,
  rejection_reason text,
  estimated_minutes int,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists orders_outlet_status_idx
  on public.orders(outlet_id, status, created_at desc);

create unique index if not exists orders_outlet_number_unique
  on public.orders(outlet_id, order_number);

-- Audit trail
create table if not exists public.order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  event_type text not null,
  payload jsonb,
  created_at timestamptz default now()
);

create index if not exists order_events_order_idx
  on public.order_events(order_id, created_at desc);

-- =====================================================
-- RLS: public read + write (MVP tanpa auth kasir)
-- =====================================================
alter table public.outlets enable row level security;
alter table public.orders enable row level security;
alter table public.order_events enable row level security;

drop policy if exists "public_read_outlets" on public.outlets;
create policy "public_read_outlets" on public.outlets
  for select to anon using (is_active = true);

drop policy if exists "public_read_orders" on public.orders;
create policy "public_read_orders" on public.orders
  for select to anon using (true);

drop policy if exists "public_insert_orders" on public.orders;
create policy "public_insert_orders" on public.orders
  for insert to anon with check (true);

drop policy if exists "public_update_orders" on public.orders;
create policy "public_update_orders" on public.orders
  for update to anon using (true) with check (true);

drop policy if exists "public_read_events" on public.order_events;
create policy "public_read_events" on public.order_events
  for select to anon using (true);

drop policy if exists "public_insert_events" on public.order_events;
create policy "public_insert_events" on public.order_events
  for insert to anon with check (true);

-- =====================================================
-- Realtime publication (Supabase)
-- =====================================================
do $$ begin
  if not exists (
    select 1 from pg_publication where pubname = 'supabase_realtime'
  ) then
    create publication supabase_realtime;
  end if;
end $$;

alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.order_events;

-- =====================================================
-- Seed default outlet
-- =====================================================
insert into public.outlets (slug, name, qr_token, tax_percentage, service_charge_percentage)
values (
  'warkop',
  'Warung Kopi',
  'wkwk-2024-default-token',
  10,
  5
)
on conflict (slug) do nothing;
