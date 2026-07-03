export interface GalleryCategory {
  id: string;
  name: string;
  sortOrder: number;
}

export interface GalleryImage {
  id?: string;
  url: string;
  alt: string;
  /** Legacy free-text category (pre-V2). New images should set categoryId instead. */
  category?: "property" | "rooms" | "restaurant" | "views" | string;
  categoryId?: string;
  isFeatured?: boolean;
  sortOrder?: number;
}

export interface NearbyAttraction {
  name: string;
  distance: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PropertyPolicies {
  checkIn?: string;
  checkOut?: string;
  idProof?: string[];
  smoking?: string;
  pets?: string;
  couples?: string;
  minAge?: number;
}

export interface Room {
  id: string;
  property_id: string;
  name: string;
  description: string | null;
  size_sqft: number | null;
  occupancy: number;
  bed_type: string | null;
  room_view: string | null;
  price_per_night: number | null;
  weekend_price: number | null;
  seasonal_price: number | null;
  seasonal_label: string | null;
  amenities: string[];
  images: { url: string; alt: string }[];
  sort_order: number;
  is_available: boolean;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  tagline: string | null;
  short_description: string | null;
  description: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  google_maps_embed_url: string | null;
  phone: string | null;
  whatsapp_number: string | null;
  email: string | null;
  starting_price: number | null;
  featured_image_url: string | null;
  hero_image_url: string | null;
  gallery_categories: GalleryCategory[];
  gallery_images: GalleryImage[];
  amenities: string[];
  nearby_attractions: NearbyAttraction[];
  faqs: FAQ[];
  policies: PropertyPolicies;
  rating: number;
  review_count: number;
  is_published: boolean;
  sort_order: number;
  group_rates?: GroupRate[];
  rooms?: Room[];
}

export interface Review {
  id: string;
  property_id: string | null;
  guest_name: string;
  guest_location: string | null;
  rating: number;
  review_text: string;
  source: string;
  review_date: string | null;
  is_featured: boolean;
}

export type MealPlan = "EP" | "CP" | "MAP" | "AP" | string;

export interface GroupRate {
  id: string;
  property_id: string;
  meal_plan: MealPlan;
  price_per_room: number | null;
  price_per_person: number | null;
  min_group_size: number | null;
  valid_from: string | null;
  valid_till: string | null;
  notes: string | null;
  sort_order: number;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string | null;
  sort_order: number;
}

export interface SeoMetadata {
  id: string;
  page_key: string;
  property_id: string | null;
  title: string | null;
  description: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
}

/** content_blocks.key values and their `data` shapes. */
export interface HomeContentBlock {
  heroBanners: { url: string; alt: string; eyebrow?: string; title?: string; subtitle?: string }[];
  introTitle?: string;
  introDescription?: string;
  introImageUrl?: string;
}

export interface AboutUsContentBlock {
  bannerUrl?: string;
  images: { url: string; alt: string }[];
  story?: string;
}

export interface TravelPartnersContentBlock {
  bannerUrl?: string;
  images: { url: string; alt: string }[];
  whyPartner?: string;
  benefits: { title: string; description: string }[];
  groupBookingSupport?: string;
  dedicatedContact?: string;
}

export interface ContactDetailsContentBlock {
  phone?: string;
  whatsappNumber?: string;
  email?: string;
  address?: string;
  googleMapsEmbedUrl?: string;
}

export interface SocialLinksContentBlock {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
}

export interface SiteCtasContentBlock {
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  whatsappCtaLabel?: string;
}

export type ContentBlockKey =
  | "home"
  | "about_us"
  | "travel_partners"
  | "contact_details"
  | "social_links"
  | "site_ctas";

export interface ContentBlock<T = Record<string, unknown>> {
  id: string;
  key: ContentBlockKey;
  data: T;
}

export type EnquiryStatus = "new" | "contacted" | "confirmed" | "closed";

export interface Enquiry {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  property_id: string | null;
  property_name: string | null;
  check_in: string | null;
  check_out: string | null;
  rooms: number;
  guests: number;
  special_request: string | null;
  source: string;
  status: EnquiryStatus;
  notes: string | null;
}

export interface EnquiryFormInput {
  name: string;
  phone: string;
  email?: string;
  propertyId?: string;
  propertyName?: string;
  checkIn?: string;
  checkOut?: string;
  rooms?: number;
  guests?: number;
  specialRequest?: string;
}

export interface PartnerEnquiryFormInput {
  enquiryType?: "travel_agent" | "group" | "wedding" | "corporate";
  companyName?: string;
  contactName: string;
  phone: string;
  email?: string;
  city?: string;
  message?: string;
}
