-- ============================================================================
-- Heritage Heaven Hotels — V2 schema additions
-- Purely additive: every change here is a new table or a new nullable/defaulted
-- column, so it's safe to run on top of 0001-0003 without touching existing
-- data. Run in the Supabase SQL editor, in order, after 0001/0002/0003.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- properties: new CMS-managed fields
-- ---------------------------------------------------------------------------
alter table public.properties
  add column if not exists short_description text,          -- shown on property cards / listings
  add column if not exists featured_image_url text,          -- property-card image (hero_image_url stays the detail-page banner)
  add column if not exists gallery_categories jsonb not null default '[]'::jsonb; -- [{id, name, sortOrder}]

comment on column public.properties.gallery_categories is
  'Admin-managed category list for this property''s gallery (e.g. Facade, Lobby, Deluxe Room). Referenced by categoryId on items in gallery_images.';
comment on column public.properties.gallery_images is
  'Now shaped as [{id, url, alt, categoryId, isFeatured, sortOrder}] — categoryId references an entry in gallery_categories.';

-- ---------------------------------------------------------------------------
-- rooms: weekend / seasonal pricing
-- ---------------------------------------------------------------------------
alter table public.rooms
  add column if not exists weekend_price numeric(10,2),
  add column if not exists seasonal_price numeric(10,2),
  add column if not exists seasonal_label text;              -- e.g. "Peak Season (Dec 20 - Jan 5)"

comment on column public.rooms.weekend_price is 'Optional override rate for Friday/Saturday nights. Falls back to price_per_night when null.';
comment on column public.rooms.seasonal_price is 'Optional override rate for a single peak/off-peak season, labeled by seasonal_label.';

-- ---------------------------------------------------------------------------
-- amenities: shared master list (used for both property + room amenity pickers)
-- ---------------------------------------------------------------------------
create table if not exists public.amenities (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  icon text,              -- lucide-react icon name, e.g. 'Wifi', 'ParkingCircle', 'Utensils'
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.amenities is
  'Canonical amenity list with icons, managed from Admin → Amenities. Property/room amenity arrays store names from this list.';

-- ---------------------------------------------------------------------------
-- group_rates: meal-plan-based group pricing per property
-- ---------------------------------------------------------------------------
create table if not exists public.group_rates (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  meal_plan text not null,          -- 'EP' | 'CP' | 'MAP' | 'AP' | custom label
  price_per_room numeric(10,2),
  price_per_person numeric(10,2),
  min_group_size int,
  valid_from date,
  valid_till date,
  notes text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_updated_at on public.group_rates;
create trigger set_updated_at before update on public.group_rates
  for each row execute procedure public.set_updated_at();

create index if not exists group_rates_property_idx on public.group_rates(property_id);

-- ---------------------------------------------------------------------------
-- seo_metadata: per-property (and optionally per site page) SEO overrides.
-- Falls back to lib/seo.ts defaults when no row / null field exists.
-- ---------------------------------------------------------------------------
create table if not exists public.seo_metadata (
  id uuid primary key default gen_random_uuid(),
  page_key text not null unique,   -- 'home' | 'about' | 'contact' | 'property:<slug>'
  property_id uuid references public.properties(id) on delete cascade,
  title text,
  description text,
  og_image_url text,
  canonical_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_updated_at on public.seo_metadata;
create trigger set_updated_at before update on public.seo_metadata
  for each row execute procedure public.set_updated_at();

-- ---------------------------------------------------------------------------
-- content_blocks: singleton, admin-editable content for non-property pages
-- (Home intro/hero, About Us, Travel Partners, Contact Details, Social Links,
-- site-wide CTAs). One row per "key"; shape of `data` is defined in code
-- (lib/types.ts) per key, not enforced at the DB level.
-- ---------------------------------------------------------------------------
create table if not exists public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,        -- 'home' | 'about_us' | 'travel_partners' | 'contact_details' | 'social_links' | 'site_ctas'
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

drop trigger if exists set_updated_at on public.content_blocks;
create trigger set_updated_at before update on public.content_blocks
  for each row execute procedure public.set_updated_at();

-- ============================================================================
-- Row Level Security for new tables
-- ============================================================================
alter table public.amenities enable row level security;
alter table public.group_rates enable row level security;
alter table public.seo_metadata enable row level security;
alter table public.content_blocks enable row level security;

create policy "Public read amenities" on public.amenities for select using (true);
create policy "Admins full access amenities" on public.amenities
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public read group rates" on public.group_rates
  for select using (
    exists (select 1 from public.properties p where p.id = group_rates.property_id and p.is_published = true)
  );
create policy "Admins full access group rates" on public.group_rates
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public read seo metadata" on public.seo_metadata for select using (true);
create policy "Admins full access seo metadata" on public.seo_metadata
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public read content blocks" on public.content_blocks for select using (true);
create policy "Admins full access content blocks" on public.content_blocks
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Seed the default meal plan amenities/content_block rows so the CMS has
-- sensible starting points (safe to re-run — on conflict do nothing).
-- ---------------------------------------------------------------------------
insert into public.content_blocks (key, data) values
  ('home', '{}'::jsonb),
  ('about_us', '{}'::jsonb),
  ('travel_partners', '{}'::jsonb),
  ('contact_details', '{}'::jsonb),
  ('social_links', '{}'::jsonb),
  ('site_ctas', '{}'::jsonb)
on conflict (key) do nothing;
