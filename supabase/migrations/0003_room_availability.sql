-- ============================================================================
-- Adds a simple "available for booking" toggle per room type, so admins can
-- mark a room as sold out without deleting it. This is a manual on/off flag,
-- not a date-based calendar/inventory system (that's a Phase 2+ feature).
-- Run this after 0001_init.sql and 0002_storage.sql.
-- ============================================================================

alter table public.rooms
  add column if not exists is_available boolean not null default true;
