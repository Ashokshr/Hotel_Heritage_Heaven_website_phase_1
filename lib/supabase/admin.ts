import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. NEVER import this into a Client Component —
 * the `server-only` import above will throw a build error if you try.
 *
 * Used for:
 *  - Reliably inserting public enquiries even before RLS/anon policies are
 *    finalised on a fresh project.
 *  - Admin dashboard reads/writes (enquiries, property CMS) after the
 *    session has been verified server-side.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  return createSupabaseClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
