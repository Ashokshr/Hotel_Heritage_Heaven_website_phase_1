-- ============================================================================
-- Heritage Heaven Hotels — Booking Widget copy
-- Replaces the OTA-style "Starting from ₹X/night" panel on the property
-- detail page with admin-editable direct-booking messaging, unique per
-- property. Purely additive/nullable with sensible defaults — safe to run
-- on top of 0001-0005.
-- ============================================================================

alter table public.properties
  add column if not exists booking_widget_title text not null default 'Custom Group Packages',
  add column if not exists booking_widget_description text not null default 'Tailored stays for families, corporate retreats & travel groups.';

comment on column public.properties.booking_widget_title is
  'Headline shown in the property detail page''s booking widget, in place of a price. Editable per property from Admin → Properties → Booking Widget.';
comment on column public.properties.booking_widget_description is
  'Short supporting line shown under the booking widget title. Editable per property from Admin → Properties → Booking Widget.';
