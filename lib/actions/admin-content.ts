"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_HOME_CONTENT } from "@/lib/data/content-defaults";
import type { HomeContentBlock, HomeInfoCard } from "@/lib/types";

async function getClient() {
  return createAdminClient() ?? (await createClient());
}

/** Merge helper shared with lib/data/content-blocks.ts's public version. */
function mergeHomeContent(partial: Partial<HomeContentBlock> | null | undefined): HomeContentBlock {
  if (!partial) return DEFAULT_HOME_CONTENT;
  return {
    hero: { ...DEFAULT_HOME_CONTENT.hero, ...partial.hero },
    about: {
      ...DEFAULT_HOME_CONTENT.about,
      ...partial.about,
      values: partial.about?.values?.length ? partial.about.values : DEFAULT_HOME_CONTENT.about.values,
    },
    whyChooseUs: {
      ...DEFAULT_HOME_CONTENT.whyChooseUs,
      ...partial.whyChooseUs,
      items: partial.whyChooseUs?.items?.length
        ? partial.whyChooseUs.items
        : DEFAULT_HOME_CONTENT.whyChooseUs.items,
    },
    closingCta: { ...DEFAULT_HOME_CONTENT.closingCta, ...partial.closingCta },
  };
}

/** Used to pre-fill the admin form — always returns a complete object, falling back to defaults. */
export async function getAdminHomeContent(): Promise<HomeContentBlock> {
  const supabase = await getClient();
  if (!supabase) return DEFAULT_HOME_CONTENT;

  const { data, error } = await supabase.from("content_blocks").select("data").eq("key", "home").maybeSingle();
  if (error || !data) return DEFAULT_HOME_CONTENT;

  return mergeHomeContent(data.data as Partial<HomeContentBlock>);
}

function parseCards(formData: FormData, field: string): HomeInfoCard[] {
  const raw = formData.get(field);
  if (!raw) return [];
  try {
    return JSON.parse(String(raw)) as HomeInfoCard[];
  } catch {
    return [];
  }
}

export async function upsertHomeContent(formData: FormData) {
  const supabase = await getClient();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const payload: HomeContentBlock = {
    hero: {
      eyebrow: String(formData.get("hero_eyebrow") || "").trim(),
      title: String(formData.get("hero_title") || "").trim(),
      subtitle: String(formData.get("hero_subtitle") || "").trim(),
    },
    about: {
      eyebrow: String(formData.get("about_eyebrow") || "").trim(),
      title: String(formData.get("about_title") || "").trim(),
      description: String(formData.get("about_description") || "").trim(),
      values: parseCards(formData, "about_values"),
    },
    whyChooseUs: {
      eyebrow: String(formData.get("why_eyebrow") || "").trim(),
      title: String(formData.get("why_title") || "").trim(),
      items: parseCards(formData, "why_items"),
    },
    closingCta: {
      eyebrow: String(formData.get("cta_eyebrow") || "").trim(),
      title: String(formData.get("cta_title") || "").trim(),
      description: String(formData.get("cta_description") || "").trim(),
    },
  };

  if (!payload.hero.title) {
    return { ok: false, error: "Hero title is required." };
  }

  const { error } = await supabase
    .from("content_blocks")
    .upsert({ key: "home", data: payload }, { onConflict: "key" });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/content");
  revalidatePath("/");
  return { ok: true };
}
