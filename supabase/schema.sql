-- ==============================================================================
-- SCHEMA SUPABASE: TABLA DE PROSPECTOS CON LEAD SCORING Y TEMPERATURA
-- Copia y pega este script en el SQL Editor de tu proyecto en Supabase
-- ==============================================================================

create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  business_name text not null,
  whatsapp text not null,
  email text,
  services text[] default '{}',
  urgency text not null,
  budget_range text not null,
  business_type text not null,
  score integer default 0 not null,
  temperature text not null, -- 'HOT', 'WARM', 'COLD'
  status text default 'Nuevo' not null, -- 'Nuevo', 'Contactado', 'En Negociación', 'No Contesta', 'Cerrado Ganado', 'Perdido'
  notes text default '',
  assigned_to text default 'Agente de Ventas'
);

-- Índices para ordenar a máxima velocidad por temperatura y fecha
create index if not exists leads_score_idx on public.leads (score desc);
create index if not exists leads_temperature_idx on public.leads (temperature);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Habilitar Row Level Security (RLS)
alter table public.leads enable row level security;

-- Política 1: Permitir que cualquier visitante de la landing page envíe su formulario
drop policy if exists "Permitir insercion publica de leads" on public.leads;
create policy "Permitir insercion publica de leads"
on public.leads
for insert
to anon, authenticated
with check (true);

-- Política 2: Permitir lectura para el panel administrativo
drop policy if exists "Permitir lectura de leads" on public.leads;
create policy "Permitir lectura de leads"
on public.leads
for select
to anon, authenticated
using (true);

-- Política 3: Permitir actualizar estado y notas por el agente de ventas
drop policy if exists "Permitir actualizacion de leads" on public.leads;
create policy "Permitir actualizacion de leads"
on public.leads
for update
to anon, authenticated
using (true);
