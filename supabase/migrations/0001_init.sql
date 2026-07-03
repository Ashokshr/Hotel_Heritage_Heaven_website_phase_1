-- ============================================================================
-- Heritage Heaven Hotels — Phase 1 schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) on a fresh
-- project. Designed to scale to multiple properties/cities without redesign.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- properties
-- ---------------------------------------------------------------------------
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  city text not null,
  state text not null default 'Himachal Pradesh',
  tagline text,
  description text,
  address text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  google_maps_embed_url text,
  phone text,
  whatsapp_number text,
  email text,
  starting_price numeric(10,2),
  hero_image_url text,
  gallery_images jsonb not null default '[]'::jsonb, -- [{url, alt, category}]
  amenities jsonb not null default '[]'::jsonb,       -- ["Free Wi-Fi", ...]
  nearby_attractions jsonb not null default '[]'::jsonb, -- [{name, distance, description}]
  faqs jsonb not null default '[]'::jsonb,            -- [{question, answer}]
  policies jsonb not null default '{}'::jsonb,        -- {checkIn, checkOut, idProof, ...}
  rating numeric(2,1) default 0,
  review_count int default 0,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.properties is 'Hotel properties. One row = one hotel/resort under the Heritage Heaven brand.';

-- ---------------------------------------------------------------------------
-- rooms
-- ---------------------------------------------------------------------------
create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  name text not null,
  description text,
  size_sqft int,
  occupancy int not null default 2,
  bed_type text,
  room_view text,
  price_per_night numeric(10,2),
  amenities jsonb not null default '[]'::jsonb,
  images jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- reviews (curated / synced guest reviews shown on site)
-- ---------------------------------------------------------------------------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties(id) on delete cascade,
  guest_name text not null,
  guest_location text,
  rating numeric(2,1) not null check (rating >= 0 and rating <= 5),
  review_text text not null,
  source text not null default 'direct', -- direct | google | makemytrip | booking
  review_date date default now(),
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- enquiries (leisure / direct WhatsApp + contact-form enquiries)
-- ---------------------------------------------------------------------------
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  property_id uuid references public.properties(id) on delete set null,
  property_name text,
  check_in date,
  check_out date,
  rooms int default 1,
  guests int default 2,
  special_request text,
  source text not null default 'website', -- website | whatsapp | contact_form
  status text not null default 'new' check (status in ('new','contacted','confirmed','closed')),
  notes text
);

create index if not exists enquiries_status_idx on public.enquiries(status);
create index if not exists enquiries_created_at_idx on public.enquiries(created_at desc);

-- ---------------------------------------------------------------------------
-- partner_enquiries (Travel Agents / Meetings & Groups CTA submissions)
-- ---------------------------------------------------------------------------
create table if not exists public.partner_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  enquiry_type text not null default 'travel_agent', -- travel_agent | group | wedding | corporate
  company_name text,
  contact_name text not null,
  phone text not null,
  email text,
  city text,
  message text,
  status text not null default 'new' check (status in ('new','contacted','confirmed','closed'))
);

-- ---------------------------------------------------------------------------
-- admin_profiles (extends auth.users for RBAC; created on first admin login)
-- ---------------------------------------------------------------------------
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin', -- admin | manager
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on public.properties;
create trigger set_updated_at before update on public.properties
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_updated_at on public.rooms;
create trigger set_updated_at before update on public.rooms
  for each row execute procedure public.set_updated_at();

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.properties enable row level security;
alter table public.rooms enable row level security;
alter table public.reviews enable row level security;
alter table public.enquiries enable row level security;
alter table public.partner_enquiries enable row level security;
alter table public.admin_profiles enable row level security;

-- Public (anon) can read published content
create policy "Public read published properties" on public.properties
  for select using (is_published = true);

create policy "Public read rooms of published properties" on public.rooms
  for select using (
    exists (select 1 from public.properties p where p.id = rooms.property_id and p.is_published = true)
  );

create policy "Public read reviews" on public.reviews
  for select using (true);

-- Public (anon) can INSERT enquiries only — never read/update/delete
create policy "Public can submit enquiries" on public.enquiries
  for insert with check (true);

create policy "Public can submit partner enquiries" on public.partner_enquiries
  for insert with check (true);

-- Authenticated admins (logged in via Supabase Auth) get full access.
-- Admin dashboard reads/writes should generally go through the service-role
-- key on the server (lib/supabase/admin.ts) so these policies are a defense
-- in depth layer, not the only gate.
create policy "Admins full access properties" on public.properties
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admins full access rooms" on public.rooms
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admins full access reviews" on public.reviews
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admins read/update enquiries" on public.enquiries
  for select using (auth.role() = 'authenticated');
create policy "Admins update enquiries" on public.enquiries
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins delete enquiries" on public.enquiries
  for delete using (auth.role() = 'authenticated');

create policy "Admins read/update partner enquiries" on public.partner_enquiries
  for select using (auth.role() = 'authenticated');
create policy "Admins update partner enquiries" on public.partner_enquiries
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admins manage own profile" on public.admin_profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);
