import type { HomeContentBlock } from "@/lib/types";

/**
 * Default Home page copy — used when a property/db doesn't have a
 * content_blocks("home") row yet, when Supabase isn't configured, or to
 * fill in any fields an admin hasn't customised yet. This matches what was
 * previously hardcoded directly in app/page.tsx.
 */
export const DEFAULT_HOME_CONTENT: HomeContentBlock = {
  hero: {
    eyebrow: "Heritage Heaven Hotels",
    title: "Premium Mountain Stays, Rooted in Himachal Hospitality",
    subtitle:
      "From McLeod Ganj's pine-covered slopes to the Dhauladhar skyline — book direct for the best rates and a warmer welcome.",
  },
  about: {
    eyebrow: "About Us",
    title: "Built by people who love these mountains",
    description:
      "Heritage Heaven Hotels began with a single property — Hotel Rosewood Inn in McLeod Ganj — and a belief that a stay in the hills should feel unhurried, warm, and honest. Today, that same philosophy guides every property we run and every guest we welcome.",
    values: [
      {
        icon: "compass",
        title: "Our Vision",
        description:
          "To become Himachal Pradesh's most trusted independent hotel brand — known for genuine hospitality in every property we operate.",
      },
      {
        icon: "leaf",
        title: "Our Mission",
        description:
          "To deliver comfortable, well-located stays with attentive service, fair direct pricing, and respect for the mountain communities we operate in.",
      },
      {
        icon: "users",
        title: "Our Philosophy",
        description:
          "Hospitality is personal. We keep our properties small enough to know our guests by name and responsive enough to solve problems fast.",
      },
    ],
  },
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    title: "The Heritage Heaven Difference",
    items: [
      {
        icon: "wallet",
        title: "Best Direct Rates",
        description: "Book with us directly and skip OTA commissions and hidden charges.",
      },
      {
        icon: "mountain",
        title: "Prime Mountain Locations",
        description: "Handpicked properties minutes from the region's best trails and viewpoints.",
      },
      {
        icon: "heartHandshake",
        title: "Personal Hospitality",
        description: "Family-run service with attention that big chains can't match.",
      },
      {
        icon: "shieldCheck",
        title: "Trusted & Transparent",
        description: "Clear policies, real reviews, and a team that responds fast.",
      },
    ],
  },
  closingCta: {
    eyebrow: "Ready When You Are",
    title: "Let's plan your mountain escape",
    description: "Reach out directly and our team will help you pick the right property, room, and dates.",
  },
};
