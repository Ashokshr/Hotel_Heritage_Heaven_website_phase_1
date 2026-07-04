import { createPublicClient } from "@/lib/supabase/public";
import { DEFAULT_HOME_CONTENT } from "@/lib/data/content-defaults";
import type { HomeContentBlock } from "@/lib/types";

/**
 * Merge a partial/possibly-empty row from content_blocks("home") with the
 * defaults, section by section. This means an admin can customise just the
 * hero, say, and leave "Why Choose Us" untouched — it keeps rendering the
 * default copy for anything not yet saved, rather than showing blank
 * sections when a field is missing.
 */
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

/** Public read used by the Home page. Always returns a complete, renderable object. */
export async function getHomeContent(): Promise<HomeContentBlock> {
  const supabase = createPublicClient();
  if (!supabase) return DEFAULT_HOME_CONTENT;

  const { data, error } = await supabase.from("content_blocks").select("data").eq("key", "home").maybeSingle();
  if (error || !data) return DEFAULT_HOME_CONTENT;

  return mergeHomeContent(data.data as Partial<HomeContentBlock>);
}
