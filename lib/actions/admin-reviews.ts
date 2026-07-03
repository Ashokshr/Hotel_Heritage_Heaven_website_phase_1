"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { Property, Review } from "@/lib/types";

async function getClient() {
  return createAdminClient() ?? (await createClient());
}

export type ReviewWithProperty = Review & { properties?: { name: string } | null };

export async function getAdminReviews(): Promise<ReviewWithProperty[]> {
  const supabase = await getClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("reviews")
    .select("*, properties(name)")
    .order("review_date", { ascending: false });
  if (error || !data) return [];
  return data as unknown as ReviewWithProperty[];
}

export async function getAdminReviewById(id: string): Promise<Review | null> {
  const supabase = await getClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from("reviews").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return data as unknown as Review;
}

/** Lightweight property list (id + name) for the review form's property picker. */
export async function getPropertyOptions(): Promise<Pick<Property, "id" | "name">[]> {
  const supabase = await getClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from("properties").select("id, name").order("sort_order");
  if (error || !data) return [];
  return data as unknown as Pick<Property, "id" | "name">[];
}

export async function upsertReview(reviewId: string | null, formData: FormData) {
  const supabase = await getClient();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const propertyId = String(formData.get("property_id") || "").trim();
  const guestName = String(formData.get("guest_name") || "").trim();
  const reviewText = String(formData.get("review_text") || "").trim();

  if (!propertyId || !guestName || !reviewText) {
    return { ok: false, error: "Property, guest name, and review text are required." };
  }

  const payload = {
    property_id: propertyId,
    guest_name: guestName,
    guest_location: String(formData.get("guest_location") || "").trim() || null,
    rating: formData.get("rating") ? Number(formData.get("rating")) : 5,
    review_text: reviewText,
    source: String(formData.get("source") || "google"),
    review_date: String(formData.get("review_date") || "") || null,
    is_featured: formData.get("is_featured") === "on",
  };

  const query = reviewId
    ? supabase.from("reviews").update(payload).eq("id", reviewId)
    : supabase.from("reviews").insert(payload);

  const { error } = await query;
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/reviews");
  revalidatePath("/");
  redirect("/admin/reviews");
}

export async function deleteReview(id: string) {
  const supabase = await getClient();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/reviews");
  revalidatePath("/");
  return { ok: true };
}
