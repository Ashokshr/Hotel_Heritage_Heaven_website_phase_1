"use server";

import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "property-images";

/**
 * Mints a short-lived signed upload URL so the browser can upload the file
 * bytes directly to Supabase Storage — they never pass through the Next.js
 * server/Vercel function, so there's no request-body size limit to worry
 * about. Requires the `property-images` bucket from
 * supabase/migrations/0002_storage.sql to exist.
 */
export async function createUploadUrl(fileName: string) {
  const admin = createAdminClient();
  if (!admin) {
    return { ok: false as const, error: "Supabase is not configured yet." };
  }

  const extension = fileName.includes(".") ? fileName.split(".").pop() : "jpg";
  const path = `${crypto.randomUUID()}.${(extension || "jpg").toLowerCase()}`;

  const { data, error } = await admin.storage.from(BUCKET).createSignedUploadUrl(path);

  if (error || !data) {
    return {
      ok: false as const,
      error:
        error?.message ||
        "Could not start the upload. Make sure the 'property-images' storage bucket exists (run supabase/migrations/0002_storage.sql).",
    };
  }

  const { data: publicUrlData } = admin.storage.from(BUCKET).getPublicUrl(path);

  return {
    ok: true as const,
    path,
    token: data.token,
    publicUrl: publicUrlData.publicUrl,
  };
}
