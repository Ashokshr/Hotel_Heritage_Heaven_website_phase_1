"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client (anon key only — safe to expose).
 * Returns null if env vars aren't configured yet, so the UI can fall back
 * to static demo content instead of crashing during initial setup.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createBrowserClient(url, key);
}
