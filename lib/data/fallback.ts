import type { Property, Review } from "@/lib/types";

/**
 * Static demo content mirroring supabase/seed.sql. Used as a fallback so the
 * site renders correctly before a Supabase project is connected, and as a
 * reference for what the CMS-managed content should look like.
 */
export const FALLBACK_PROPERTIES: Property[] = [
  {
    id: "demo-rosewood-inn",
    slug: "rosewood-inn-mcleod-ganj",
    name: "Hotel Rosewood Inn by Heritage Heaven",
    city: "McLeod Ganj, Dharamshala",
    state: "Himachal Pradesh",
    tagline: "A quiet mountain retreat, minutes from Triund",
    description:
      "Set among the pine-covered slopes of McLeod Ganj, Hotel Rosewood Inn by Heritage Heaven pairs unhurried mountain calm with warm, attentive hospitality. Balcony rooms open onto sweeping Dhauladhar views, the Triund trekking point is a five-minute walk away, and the McLeod Ganj bus stand is just a kilometre down the road — making it an easy base for both first-time visitors and seasoned mountain travellers.",
    address: "Near Triund Trek Route, McLeod Ganj, Dharamshala, Himachal Pradesh 176219",
    latitude: 32.2432,
    longitude: 76.3212,
    google_maps_embed_url: "https://www.google.com/maps?q=McLeod+Ganj+Dharamshala&output=embed",
    phone: "+91-98765-43210",
    whatsapp_number: "919876543210",
    email: "reservations@heritageheavenhotels.com",
    starting_price: 2800,
    hero_image_url:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1920&auto=format&fit=crop",
    gallery_images: [
      { url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1600&auto=format&fit=crop", alt: "Rosewood Inn exterior with mountain backdrop", category: "property" },
      { url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1600&auto=format&fit=crop", alt: "Balcony room with mountain view", category: "rooms" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop", alt: "Family room interior", category: "rooms" },
      { url: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1600&auto=format&fit=crop", alt: "Dhauladhar mountain range view", category: "views" },
      { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop", alt: "Hotel restaurant seating", category: "restaurant" },
      { url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1600&auto=format&fit=crop", alt: "Triund trekking trail near the property", category: "views" },
    ],
    amenities: [
      "Mountain-view balconies",
      "Complimentary Wi-Fi",
      "24/7 front desk",
      "In-house multi-cuisine restaurant",
      "Room heaters & warm bedding",
      "Travel & trek desk",
      "Free parking",
      "Daily housekeeping",
      "Airport/bus stand pickup on request",
      "Power backup",
    ],
    nearby_attractions: [
      { name: "Triund Trekking Point", distance: "0.4 km / 5 min walk", description: "Starting point of the popular Triund ridge trek." },
      { name: "McLeod Ganj Bus Stand", distance: "1 km", description: "Main transit point connecting to Dharamshala and beyond." },
      { name: "Tsuglagkhang Complex (Dalai Lama Temple)", distance: "1.5 km", description: "The spiritual heart of McLeod Ganj." },
      { name: "Bhagsu Waterfall", distance: "2.5 km", description: "A popular short hike and picnic spot." },
      { name: "Dharamkot", distance: "3 km", description: "Laid-back village known for cafés and yoga studios." },
      { name: "Naddi Viewpoint", distance: "5 km", description: "Sweeping sunset views of the Kangra Valley." },
    ],
    faqs: [
      { question: "What time is check-in and check-out?", answer: "Check-in is from 12:00 PM and check-out is until 12:00 PM. Early check-in and late check-out are offered subject to availability." },
      { question: "Is breakfast included?", answer: "Select room rates include complimentary breakfast; room-only rates are also available. Meal inclusions are shown at the time of enquiry." },
      { question: "What ID proof is required?", answer: "A valid Passport, Aadhaar Card, Driving Licence or other government-issued photo ID is accepted for all guests at check-in." },
      { question: "Are unmarried couples allowed?", answer: "Yes, unmarried couples are welcome with valid government-issued local ID." },
      { question: "Is the property pet-friendly?", answer: "Pets are not permitted at this property." },
      { question: "Do you offer airport or bus stand pickup?", answer: "Yes, pickup from Gaggal Airport or McLeod Ganj/Dharamshala bus stand can be arranged on request for an additional fee." },
    ],
    policies: {
      checkIn: "12:00 PM",
      checkOut: "12:00 PM",
      idProof: ["Passport", "Aadhaar Card", "Driving Licence", "Government Photo ID"],
      smoking: "Not permitted indoors",
      pets: "Not allowed",
      couples: "Unmarried couples allowed with valid local ID",
      minAge: 18,
    },
    rating: 4.3,
    review_count: 3,
    is_published: true,
    sort_order: 1,
    rooms: [
      {
        id: "demo-room-super-deluxe",
        property_id: "demo-rosewood-inn",
        name: "Super Deluxe Room with Independent Balcony & Mountain View",
        description: "A cosy, sunlit room with a private balcony framing the Dhauladhar range — ideal for couples and solo travellers.",
        size_sqft: 180,
        occupancy: 2,
        bed_type: "1 King Bed",
        room_view: "Mountain / Hill View",
        price_per_night: 2800,
        amenities: ["Private balcony", "Work desk & chair", "Mineral water", "Iron & ironing board", "Wardrobe/closet", "Attached bathroom"],
        images: [{ url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200&auto=format&fit=crop", alt: "Super Deluxe Room balcony view" }],
        sort_order: 1,
        is_available: true,
      },
      {
        id: "demo-room-family",
        property_id: "demo-rosewood-inn",
        name: "Family Room with Independent Balcony and Mountain View",
        description: "A spacious room built for families and small groups, with two king beds and the same postcard mountain views.",
        size_sqft: 480,
        occupancy: 4,
        bed_type: "2 King Beds",
        room_view: "Mountain / Hill View",
        price_per_night: 7400,
        amenities: ["Private balcony", "Work desk & chair", "Mineral water", "Iron & ironing board", "Wardrobe/closet", "Attached bathroom"],
        images: [{ url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop", alt: "Family Room interior" }],
        sort_order: 2,
        is_available: true,
      },
    ],
  },
];

export const FALLBACK_REVIEWS: Review[] = [
  { id: "demo-review-1", property_id: "demo-rosewood-inn", guest_name: "Ananya R.", guest_location: "Delhi", rating: 4.5, review_text: "Woke up to the mountains right outside the balcony. Five minutes to the Triund trailhead made our trek mornings so easy.", source: "direct", review_date: null, is_featured: true },
  { id: "demo-review-2", property_id: "demo-rosewood-inn", guest_name: "Karan M.", guest_location: "Chandigarh", rating: 4.0, review_text: "Clean, comfortable, and the staff arranged a last-minute bonfire for us. Great value for the location.", source: "google", review_date: null, is_featured: true },
  { id: "demo-review-3", property_id: "demo-rosewood-inn", guest_name: "Priya S.", guest_location: "Mumbai", rating: 4.5, review_text: "Quiet, well-located, and the family room easily fit our group of four with space to spare.", source: "makemytrip", review_date: null, is_featured: true },
];
