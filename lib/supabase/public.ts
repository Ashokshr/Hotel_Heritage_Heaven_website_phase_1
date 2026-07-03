import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Plain (non-cookie-bound) Supabase client using only the public anon key.
 * Use this for reading public content (properties, rooms, reviews) — it has
 * no dependency on next/headers, so it's safe to call from
 * generateStaticParams / generateMetadata at build time as well as from
 * Server Components at request time, and it doesn't force pages into
 * dynamic rendering the way a cookies()-bound client would.
 *
 * For anything that needs the visitor's auth session (admin pages), use
 * lib/supabase/server.ts instead.
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
