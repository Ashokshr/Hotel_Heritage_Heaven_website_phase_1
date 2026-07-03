"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { Property } from "@/lib/types";

async function getClient() {
  return createAdminClient() ?? (await createClient());
}

export async function getAdminProperties(): Promise<Property[]> {
  const supabase = await getClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from("properties").select("*, rooms(*)").order("sort_order");
  if (error || !data) return [];
  return data as unknown as Property[];
}

export async function getAdminPropertyById(id: string): Promise<Property | null> {
  const supabase = await getClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from("properties").select("*, rooms(*)").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return data as unknown as Property;
}

// --- small text-format parsers so non-technical admins can edit list/object
// fields as plain text instead of raw JSON --------------------------------

const lines = (value: FormDataEntryValue | null) =>
  String(value || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

function parseAmenities(formData: FormData) {
  return lines(formData.get("amenities"));
}

function parseJsonField<T>(formData: FormData, field: string, fallback: T): T {
  const raw = formData.get(field);
  if (!raw) return fallback;
  try {
    return JSON.parse(String(raw)) as T;
  } catch {
    return fallback;
  }
}

function parseGalleryCategories(formData: FormData) {
  return parseJsonField(formData, "gallery_categories", [] as { id: string; name: string; sortOrder: number }[]);
}

function parseGalleryImages(formData: FormData) {
  return parseJsonField(
    formData,
    "gallery_images",
    [] as { id: string; url: string; alt: string; categoryId?: string; isFeatured?: boolean; sortOrder?: number }[]
  );
}

function parseNearbyAttractions(formData: FormData) {
  // one per line: name | distance | description
  return lines(formData.get("nearby_attractions")).map((line) => {
    const [name, distance, description] = line.split("|").map((s) => s?.trim());
    return { name: name || "", distance: distance || "", description: description || "" };
  });
}

function parseFaqs(formData: FormData) {
  // one per line: question :: answer
  return lines(formData.get("faqs")).map((line) => {
    const [question, answer] = line.split("::").map((s) => s?.trim());
    return { question: question || "", answer: answer || "" };
  });
}

function parsePropertyHighlight(formData: FormData) {
  const text = String(formData.get("highlight_text") || "").trim();
  if (!text) return null;
  return {
    text,
    icon: String(formData.get("highlight_icon") || "sparkles"),
    seasonalLabel: String(formData.get("highlight_seasonal_label") || "").trim() || undefined,
    isActive: formData.get("highlight_is_active") === "on",
  };
}

function parsePolicies(formData: FormData) {
  return {
    checkIn: String(formData.get("checkIn") || ""),
    checkOut: String(formData.get("checkOut") || ""),
    idProof: String(formData.get("idProof") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    smoking: String(formData.get("smoking") || ""),
    pets: String(formData.get("pets") || ""),
    couples: String(formData.get("couples") || ""),
    minAge: Number(formData.get("minAge") || 18),
  };
}

export async function upsertProperty(propertyId: string | null, formData: FormData) {
  const supabase = await getClient();
  if (!supabase) {
    return { ok: false, error: "Supabase is not configured." };
  }

  const payload = {
    slug: String(formData.get("slug") || "").trim(),
    name: String(formData.get("name") || "").trim(),
    city: String(formData.get("city") || "").trim(),
    state: String(formData.get("state") || "Himachal Pradesh").trim(),
    tagline: String(formData.get("tagline") || ""),
    description: String(formData.get("description") || ""),
    address: String(formData.get("address") || ""),
    latitude: formData.get("latitude") ? Number(formData.get("latitude")) : null,
    longitude: formData.get("longitude") ? Number(formData.get("longitude")) : null,
    google_maps_embed_url: String(formData.get("google_maps_embed_url") || ""),
    phone: String(formData.get("phone") || ""),
    whatsapp_number: String(formData.get("whatsapp_number") || ""),
    email: String(formData.get("email") || ""),
    starting_price: formData.get("starting_price") ? Number(formData.get("starting_price")) : null,
    property_highlight: parsePropertyHighlight(formData),
    hero_image_url: String(formData.get("hero_image_url") || ""),
    gallery_categories: parseGalleryCategories(formData),
    gallery_images: parseGalleryImages(formData),
    amenities: parseAmenities(formData),
    nearby_attractions: parseNearbyAttractions(formData),
    faqs: parseFaqs(formData),
    policies: parsePolicies(formData),
    rating: formData.get("rating") ? Number(formData.get("rating")) : 0,
    review_count: formData.get("review_count") ? Number(formData.get("review_count")) : 0,
    is_published: formData.get("is_published") === "on",
    sort_order: formData.get("sort_order") ? Number(formData.get("sort_order")) : 0,
  };

  if (!payload.slug || !payload.name) {
    return { ok: false, error: "Name and slug are required." };
  }

  const query = propertyId
    ? supabase.from("properties").update(payload).eq("id", propertyId)
    : supabase.from("properties").insert(payload);

  const { error } = await query;
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/properties");
  revalidatePath("/");
  revalidatePath(`/hotels/${payload.slug}`);
  redirect("/admin/properties");
}

export async function deleteProperty(id: string) {
  const supabase = await getClient();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/properties");
  revalidatePath("/");
  return { ok: true };
}

export async function upsertRoom(propertyId: string, roomId: string | null, formData: FormData) {
  const supabase = await getClient();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const payload = {
    property_id: propertyId,
    name: String(formData.get("name") || "").trim(),
    description: String(formData.get("description") || ""),
    size_sqft: formData.get("size_sqft") ? Number(formData.get("size_sqft")) : null,
    occupancy: Number(formData.get("occupancy") || 2),
    bed_type: String(formData.get("bed_type") || ""),
    room_view: String(formData.get("room_view") || ""),
    price_per_night: formData.get("price_per_night") ? Number(formData.get("price_per_night")) : null,
    amenities: lines(formData.get("amenities")),
    images: lines(formData.get("images")).map((line) => {
      const [url, alt] = line.split("|").map((s) => s?.trim());
      return { url: url || "", alt: alt || "" };
    }),
    sort_order: formData.get("sort_order") ? Number(formData.get("sort_order")) : 0,
    is_available: formData.get("is_available") === "on",
  };

  const query = roomId
    ? supabase.from("rooms").update(payload).eq("id", roomId)
    : supabase.from("rooms").insert(payload);

  const { error } = await query;
  revalidatePath(`/admin/properties/${propertyId}`);
  return { ok: !error, error: error?.message };
}

export async function deleteRoom(propertyId: string, roomId: string) {
  const supabase = await getClient();
  if (!supabase) return { ok: false };
  const { error } = await supabase.from("rooms").delete().eq("id", roomId);
  revalidatePath(`/admin/properties/${propertyId}`);
  return { ok: !error };
}
