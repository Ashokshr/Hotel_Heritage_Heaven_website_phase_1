import { createPublicClient } from "@/lib/supabase/public";
import { FALLBACK_PROPERTIES, FALLBACK_REVIEWS } from "@/lib/data/fallback";
import type { Property, Review } from "@/lib/types";

/**
 * All reads go through these functions so pages never talk to Supabase
 * directly. If Supabase isn't configured yet (no env vars) or a query
 * fails, we transparently fall back to the static demo content in
 * lib/data/fallback.ts — this keeps `next build` and local preview working
 * before the client's Supabase project is wired up.
 */

export async function getProperties(): Promise<Property[]> {
  const supabase = createPublicClient();
  if (!supabase) return FALLBACK_PROPERTIES;

  const { data, error } = await supabase
    .from("properties")
    .select("*, rooms(*)")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return FALLBACK_PROPERTIES;
  return data as unknown as Property[];
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const supabase = createPublicClient();
  if (!supabase) {
    return FALLBACK_PROPERTIES.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("properties")
    .select("*, rooms(*)")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error || !data) {
    return FALLBACK_PROPERTIES.find((p) => p.slug === slug) ?? null;
  }
  return data as unknown as Property;
}

export async function getFeaturedReviews(): Promise<Review[]> {
  const supabase = createPublicClient();
  if (!supabase) return FALLBACK_REVIEWS;

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_featured", true)
    .order("review_date", { ascending: false })
    .limit(6);

  if (error || !data || data.length === 0) return FALLBACK_REVIEWS;
  return data as unknown as Review[];
}
