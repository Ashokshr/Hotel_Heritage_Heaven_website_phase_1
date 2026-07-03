-- ============================================================================
-- Storage bucket for images uploaded via the admin CMS (property photos,
-- room photos). Run this after 0001_init.sql.
-- ============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'property-images',
  'property-images',
  true,
  10485760, -- 10 MB per file
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

-- Anyone can view images (they're shown on the public website)
create policy "Public read property images"
on storage.objects for select
using (bucket_id = 'property-images');

-- Only logged-in admins can upload/replace/delete. In practice, uploads go
-- through a signed upload URL minted server-side with the service-role key
-- (see lib/actions/admin-upload.ts), which bypasses these policies — they're
-- a defense-in-depth layer in case anything ever uploads directly.
create policy "Admins can upload property images"
on storage.objects for insert
with check (bucket_id = 'property-images' and auth.role() = 'authenticated');

create policy "Admins can update property images"
on storage.objects for update
using (bucket_id = 'property-images' and auth.role() = 'authenticated');

create policy "Admins can delete property images"
on storage.objects for delete
using (bucket_id = 'property-images' and auth.role() = 'authenticated');
