"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { Enquiry, EnquiryStatus } from "@/lib/types";

async function getClient() {
  return createAdminClient() ?? (await createClient());
}

export async function getEnquiries(): Promise<Enquiry[]> {
  const supabase = await getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as Enquiry[];
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  const supabase = await getClient();
  if (!supabase) return { ok: false };

  const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
  revalidatePath("/admin/dashboard");
  return { ok: !error };
}

export async function getPartnerEnquiries() {
  const supabase = await getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("partner_enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
}

export async function updatePartnerEnquiryStatus(id: string, status: EnquiryStatus) {
  const supabase = await getClient();
  if (!supabase) return { ok: false };

  const { error } = await supabase.from("partner_enquiries").update({ status }).eq("id", id);
  revalidatePath("/admin/dashboard");
  return { ok: !error };
}
