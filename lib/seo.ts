import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import type { Property } from "@/lib/types";

export function buildMetadata({
  title,
  description,
  path = "",
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image || `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** JSON-LD Hotel schema for a property detail page (schema.org/Hotel). */
export function buildHotelSchema(property: Property) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: property.name,
    description: property.description,
    image: property.gallery_images?.map((g) => g.url) ?? [],
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.state,
      addressCountry: "IN",
    },
    ...(property.latitude && property.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: property.latitude,
            longitude: property.longitude,
          },
        }
      : {}),
    telephone: property.phone,
    priceRange: property.starting_price ? `From ₹${property.starting_price}` : undefined,
    aggregateRating: property.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: property.rating,
          reviewCount: property.review_count || 1,
        }
      : undefined,
    amenityFeature: property.amenities?.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
    })),
  };
}

/** JSON-LD Organization schema for the site-wide brand. */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    sameAs: ["https://instagram.com/heritageheavenhotels", "https://facebook.com/heritageheavenhotels"],
  };
}
