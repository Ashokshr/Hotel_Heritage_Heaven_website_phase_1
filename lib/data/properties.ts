import { createPublicClient } from "@/lib/supabase/public";
import { FALLBACK_PROPERTIES, FALLBACK_REVIEWS } from "@/lib/data/fallback";
import type { Property, Review } from "@/lib/types";

/**
 * All reads go through these functions so pages never talk to Supabase
 * directly.
 *
 * The static demo content in lib/data/fallback.ts is ONLY used when
 * Supabase isn't configured at all (no env vars) — this keeps `next build`
 * and local preview working before a Supabase project is wired up.
 *
 * Once Supabase IS configured, these functions never fall back to demo
 * data, even on a query error or an empty/not-found result. Earlier this
 * fell back to fallback.ts on any error or missing row, which meant old
 * demo slugs (e.g. /hotels/rajas-palace-mcleod-ganj) kept rendering fully
 * realistic-looking placeholder pages — wrong stock photos, fake reviews —
 * indefinitely on the live, public site, indexable and shareable, even
 * though no such property exists in the real database. A property that
 * genuinely doesn't exist (or an empty result) now correctly returns
 * null/[] so the page 404s or the section hides, instead of rendering
 * placeholder content under the real brand's name.
 */

export async function getProperties(): Promise<Property[]> {
  const supabase = createPublicClient();
  if (!supabase) return FALLBACK_PROPERTIES;

  const { data, error } = await supabase
    .from("properties")
    .select("*, rooms(*)")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getProperties: Supabase query failed", error.message);
    return [];
  }
  return (data as unknown as Property[]) || [];
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

  if (error) {
    console.error(`getPropertyBySlug(${slug}): Supabase query failed`, error.message);
    return null;
  }
  return (data as unknown as Property) || null;
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

  if (error) {
    console.error("getFeaturedReviews: Supabase query failed", error.message);
    return [];
  }
  return (data as unknown as Review[]) || [];
}
