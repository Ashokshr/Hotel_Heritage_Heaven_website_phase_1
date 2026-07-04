-- ============================================================================
-- Heritage Heaven Hotels — Room Rate Disclaimer
-- Small fine-print line shown under each room's price on the property page
-- (e.g. "*Final rates may vary based on season, occupancy and meal plan."),
-- editable independently per room category from Admin. Purely additive with
-- a sensible default — safe to run on top of 0001-0006.
-- ============================================================================

alter table public.rooms
  add column if not exists rate_disclaimer text not null
    default '*Final rates may vary based on season, occupancy and meal plan.';

comment on column public.rooms.rate_disclaimer is
  'Small disclaimer shown directly below the room price on the property page. Editable per room from Admin → Properties → Rooms.';
