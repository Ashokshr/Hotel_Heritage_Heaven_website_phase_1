-- ============================================================================
-- Seed data — Hotel Rosewood Inn by Heritage Heaven (McLeod Ganj, Dharamshala)
-- Facts (location, room types, sizes, policies) drawn from the property's
-- public MakeMyTrip listing. Descriptions, amenities copy and FAQs are draft
-- brand copy — replace with the owner's final wording via the admin CMS.
-- Run after 0001_init.sql.
-- ============================================================================

insert into public.properties (
  slug, name, city, state, tagline, description, address,
  latitude, longitude, google_maps_embed_url, phone, whatsapp_number, email,
  starting_price, hero_image_url, gallery_images, amenities, nearby_attractions,
  faqs, policies, rating, review_count, is_published, sort_order
) values (
  'rosewood-inn-mcleod-ganj',
  'Hotel Rosewood Inn by Heritage Heaven',
  'McLeod Ganj, Dharamshala',
  'Himachal Pradesh',
  'A quiet mountain retreat, minutes from Triund',
  'Set among the pine-covered slopes of McLeod Ganj, Hotel Rosewood Inn by Heritage Heaven pairs unhurried mountain calm with warm, attentive hospitality. Balcony rooms open onto sweeping Dhauladhar views, the Triund trekking point is a five-minute walk away, and the McLeod Ganj bus stand is just a kilometre down the road — making it an easy base for both first-time visitors and seasoned mountain travellers.',
  'Near Triund Trek Route, McLeod Ganj, Dharamshala, Himachal Pradesh 176219',
  32.2432, 76.3212,
  'https://www.google.com/maps?q=McLeod+Ganj+Dharamshala&output=embed',
  '+91-98765-43210',
  '919876543210',
  'reservations@heritageheavenhotels.com',
  2800,
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1920&auto=format&fit=crop',
  '[
    {"url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1600&auto=format&fit=crop", "alt": "Rosewood Inn exterior with mountain backdrop", "category": "property"},
    {"url": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1600&auto=format&fit=crop", "alt": "Balcony room with mountain view", "category": "rooms"},
    {"url": "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop", "alt": "Family room interior", "category": "rooms"},
    {"url": "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1600&auto=format&fit=crop", "alt": "Dhauladhar mountain range view", "category": "views"},
    {"url": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop", "alt": "Hotel restaurant seating", "category": "restaurant"},
    {"url": "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1600&auto=format&fit=crop", "alt": "Triund trekking trail near the property", "category": "views"}
  ]'::jsonb,
  '["Mountain-view balconies", "Complimentary Wi-Fi", "24/7 front desk", "In-house multi-cuisine restaurant", "Room heaters & warm bedding", "Travel & trek desk", "Free parking", "Daily housekeeping", "Airport/bus stand pickup on request", "Power backup"]'::jsonb,
  '[
    {"name": "Triund Trekking Point", "distance": "0.4 km / 5 min walk", "description": "Starting point of the popular Triund ridge trek."},
    {"name": "McLeod Ganj Bus Stand", "distance": "1 km", "description": "Main transit point connecting to Dharamshala and beyond."},
    {"name": "Tsuglagkhang Complex (Dalai Lama Temple)", "distance": "1.5 km", "description": "The spiritual heart of McLeod Ganj."},
    {"name": "Bhagsu Waterfall", "distance": "2.5 km", "description": "A popular short hike and picnic spot."},
    {"name": "Dharamkot", "distance": "3 km", "description": "Laid-back village known for cafés and yoga studios."},
    {"name": "Naddi Viewpoint", "distance": "5 km", "description": "Sweeping sunset views of the Kangra Valley."}
  ]'::jsonb,
  '[
    {"question": "What time is check-in and check-out?", "answer": "Check-in is from 12:00 PM and check-out is until 12:00 PM. Early check-in and late check-out are offered subject to availability."},
    {"question": "Is breakfast included?", "answer": "Select room rates include complimentary breakfast; room-only rates are also available. Meal inclusions are shown at the time of enquiry."},
    {"question": "What ID proof is required?", "answer": "A valid Passport, Aadhaar Card, Driving Licence or other government-issued photo ID is accepted for all guests at check-in."},
    {"question": "Are unmarried couples allowed?", "answer": "Yes, unmarried couples are welcome with valid government-issued local ID."},
    {"question": "Is the property pet-friendly?", "answer": "Pets are not permitted at this property."},
    {"question": "Do you offer airport or bus stand pickup?", "answer": "Yes, pickup from Gaggal Airport or McLeod Ganj/Dharamshala bus stand can be arranged on request for an additional fee."}
  ]'::jsonb,
  '{"checkIn": "12:00 PM", "checkOut": "12:00 PM", "idProof": ["Passport", "Aadhaar Card", "Driving Licence", "Government Photo ID"], "smoking": "Not permitted indoors", "pets": "Not allowed", "couples": "Unmarried couples allowed with valid local ID", "minAge": 18}'::jsonb,
  4.3,
  3,
  true,
  1
)
on conflict (slug) do nothing;

-- Rooms for Rosewood Inn
insert into public.rooms (property_id, name, description, size_sqft, occupancy, bed_type, room_view, price_per_night, amenities, images, sort_order)
select p.id, r.name, r.description, r.size_sqft, r.occupancy, r.bed_type, r.room_view, r.price_per_night, r.amenities::jsonb, r.images::jsonb, r.sort_order
from public.properties p
cross join (
  values
    (
      'Super Deluxe Room with Independent Balcony & Mountain View',
      'A cosy, sunlit room with a private balcony framing the Dhauladhar range — ideal for couples and solo travellers.',
      180, 2, '1 King Bed', 'Mountain / Hill View', 2800.00,
      '["Private balcony", "Work desk & chair", "Mineral water", "Iron & ironing board", "Wardrobe/closet", "Attached bathroom"]',
      '[{"url": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200&auto=format&fit=crop", "alt": "Super Deluxe Room balcony view"}]',
      1
    ),
    (
      'Family Room with Independent Balcony and Mountain View',
      'A spacious room built for families and small groups, with two king beds and the same postcard mountain views.',
      480, 4, '2 King Beds', 'Mountain / Hill View', 7400.00,
      '["Private balcony", "Work desk & chair", "Mineral water", "Iron & ironing board", "Wardrobe/closet", "Attached bathroom"]',
      '[{"url": "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop", "alt": "Family Room interior"}]',
      2
    )
) as r(name, description, size_sqft, occupancy, bed_type, room_view, price_per_night, amenities, images, sort_order)
where p.slug = 'rosewood-inn-mcleod-ganj'
on conflict do nothing;

-- Sample guest reviews
insert into public.reviews (property_id, guest_name, guest_location, rating, review_text, source, is_featured)
select p.id, r.guest_name, r.guest_location, r.rating, r.review_text, r.source, r.is_featured
from public.properties p
cross join (
  values
    ('Ananya R.', 'Delhi', 4.5, 'Woke up to the mountains right outside the balcony. Five minutes to the Triund trailhead made our trek mornings so easy.', 'direct', true),
    ('Karan M.', 'Chandigarh', 4.0, 'Clean, comfortable, and the staff arranged a last-minute bonfire for us. Great value for the location.', 'google', true),
    ('Priya S.', 'Mumbai', 4.5, 'Quiet, well-located, and the family room easily fit our group of four with space to spare.', 'makemytrip', true)
) as r(guest_name, guest_location, rating, review_text, source, is_featured)
where p.slug = 'rosewood-inn-mcleod-ganj'
on conflict do nothing;
