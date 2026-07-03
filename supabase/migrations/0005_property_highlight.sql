-- ============================================================================
-- Heritage Heaven Hotels — Property Highlight
-- Replaces the OTA-style "Starting from ₹X/night" price line on property
-- cards with an admin-configurable marketing highlight (USP), unique per
-- property. Purely additive/nullable — safe to run on top of 0001-0004.
-- ============================================================================

alter table public.properties
  add column if not exists property_highlight jsonb;

comment on column public.properties.property_highlight is
  'Optional admin-configured card highlight shown instead of price, e.g.
   {"text": "Mountain View Rooms", "icon": "mountain", "badgeColor": "gold",
   "seasonalLabel": "Winter Special", "isActive": true}.
   text is the only field required today; icon/badgeColor/seasonalLabel/isActive
   are future-proofing for seasonal + limited-time promo styling. Null/absent
   hides the highlight section on the property card entirely.';
