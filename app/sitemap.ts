import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getProperties } from "@/lib/data/properties";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getProperties();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_CONFIG.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_CONFIG.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_CONFIG.url}/hotels`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_CONFIG.url}/gallery`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_CONFIG.url}/travel-agents`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_CONFIG.url}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_CONFIG.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_CONFIG.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${SITE_CONFIG.url}/hotels/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
