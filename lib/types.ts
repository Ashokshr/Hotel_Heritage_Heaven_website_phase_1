export interface GalleryImage {
  url: string;
  alt: string;
  category: "property" | "rooms" | "restaurant" | "views" | string;
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
  description: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  google_maps_embed_url: string | null;
  phone: string | null;
  whatsapp_number: string | null;
  email: string | null;
  starting_price: number | null;
  hero_image_url: string | null;
  gallery_images: GalleryImage[];
  amenities: string[];
  nearby_attractions: NearbyAttraction[];
  faqs: FAQ[];
  policies: PropertyPolicies;
  rating: number;
  review_count: number;
  is_published: boolean;
  sort_order: number;
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
