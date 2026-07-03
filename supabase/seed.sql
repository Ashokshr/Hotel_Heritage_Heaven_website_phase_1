-- ============================================================================
-- Seed data — Heritage Heaven Hotels V2 demo content
-- Two properties: Hotel Rosewood Inn (McLeod Ganj) and Hotel Raja's Palace
-- (McLeod Ganj / Bhagsunag) — proving the schema supports multiple hotels.
-- Facts (location, room types, sizes, policies) drawn from each property's
-- public MakeMyTrip listing. Descriptions, amenities copy and FAQs are draft
-- brand copy — replace with the owner's final wording via the admin CMS.
-- Run after 0001_init.sql, 0002_storage.sql, 0003_room_availability.sql,
-- and 0004_v2_schema.sql.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Property 1: Hotel Rosewood Inn
-- ---------------------------------------------------------------------------
insert into public.properties (
  slug, name, city, state, tagline, short_description, description, address,
  latitude, longitude, google_maps_embed_url, phone, whatsapp_number, email,
  starting_price, featured_image_url, hero_image_url, gallery_categories, gallery_images,
  amenities, nearby_attractions, faqs, policies, rating, review_count, is_published, sort_order
) values (
  'rosewood-inn-mcleod-ganj',
  'Hotel Rosewood Inn by Heritage Heaven',
  'McLeod Ganj, Dharamshala',
  'Himachal Pradesh',
  'A quiet mountain retreat, minutes from Triund',
  'A quiet mountain retreat with balcony rooms and Dhauladhar views, five minutes from Triund.',
  'Set among the pine-covered slopes of McLeod Ganj, Hotel Rosewood Inn by Heritage Heaven pairs unhurried mountain calm with warm, attentive hospitality. Balcony rooms open onto sweeping Dhauladhar views, the Triund trekking point is a five-minute walk away, and the McLeod Ganj bus stand is just a kilometre down the road — making it an easy base for both first-time visitors and seasoned mountain travellers.',
  'Near Triund Trek Route, McLeod Ganj, Dharamshala, Himachal Pradesh 176219',
  32.2432, 76.3212,
  'https://www.google.com/maps?q=McLeod+Ganj+Dharamshala&output=embed',
  '+91-98760-74252',
  '919876074252',
  'hotelrosewoodin@gmail.com',
  2800,
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1920&auto=format&fit=crop',
  '[
    {"id": "cat-facade", "name": "Facade", "sortOrder": 1},
    {"id": "cat-rooms", "name": "Rooms", "sortOrder": 2},
    {"id": "cat-views", "name": "Views", "sortOrder": 3},
    {"id": "cat-restaurant", "name": "Restaurant", "sortOrder": 4}
  ]'::jsonb,
  '[
    {"id": "img-1", "url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1600&auto=format&fit=crop", "alt": "Rosewood Inn exterior with mountain backdrop", "categoryId": "cat-facade", "isFeatured": true, "sortOrder": 1},
    {"id": "img-2", "url": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1600&auto=format&fit=crop", "alt": "Balcony room with mountain view", "categoryId": "cat-rooms", "isFeatured": false, "sortOrder": 2},
    {"id": "img-3", "url": "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop", "alt": "Family room interior", "categoryId": "cat-rooms", "isFeatured": false, "sortOrder": 3},
    {"id": "img-4", "url": "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1600&auto=format&fit=crop", "alt": "Dhauladhar mountain range view", "categoryId": "cat-views", "isFeatured": false, "sortOrder": 4},
    {"id": "img-5", "url": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop", "alt": "Hotel restaurant seating", "categoryId": "cat-restaurant", "isFeatured": false, "sortOrder": 5},
    {"id": "img-6", "url": "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1600&auto=format&fit=crop", "alt": "Triund trekking trail near the property", "categoryId": "cat-views", "isFeatured": false, "sortOrder": 6}
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

insert into public.rooms (property_id, name, description, size_sqft, occupancy, bed_type, room_view, price_per_night, weekend_price, seasonal_price, seasonal_label, amenities, images, sort_order, is_available)
select p.id, r.name, r.description, r.size_sqft, r.occupancy, r.bed_type, r.room_view, r.price_per_night, r.weekend_price, r.seasonal_price, r.seasonal_label, r.amenities::jsonb, r.images::jsonb, r.sort_order, true
from public.properties p
cross join (
  values
    (
      'Super Deluxe Room with Independent Balcony & Mountain View',
      'A cosy, sunlit room with a private balcony framing the Dhauladhar range — ideal for couples and solo travellers.',
      180, 2, '1 King Bed', 'Mountain / Hill View', 2800.00, 3200.00, 3800.00, 'Peak Season (Apr - Jun, Oct)',
      '["Private balcony", "Work desk & chair", "Mineral water", "Iron & ironing board", "Wardrobe/closet", "Attached bathroom"]',
      '[{"url": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200&auto=format&fit=crop", "alt": "Super Deluxe Room balcony view"}]',
      1
    ),
    (
      'Family Room with Independent Balcony and Mountain View',
      'A spacious room built for families and small groups, with two king beds and the same postcard mountain views.',
      480, 4, '2 King Beds', 'Mountain / Hill View', 7400.00, 8200.00, null, null,
      '["Private balcony", "Work desk & chair", "Mineral water", "Iron & ironing board", "Wardrobe/closet", "Attached bathroom"]',
      '[{"url": "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop", "alt": "Family Room interior"}]',
      2
    )
) as r(name, description, size_sqft, occupancy, bed_type, room_view, price_per_night, weekend_price, seasonal_price, seasonal_label, amenities, images, sort_order)
where p.slug = 'rosewood-inn-mcleod-ganj'
on conflict do nothing;

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

insert into public.group_rates (property_id, meal_plan, price_per_room, price_per_person, min_group_size, notes, sort_order)
select p.id, g.meal_plan, g.price_per_room, g.price_per_person, g.min_group_size, g.notes, g.sort_order
from public.properties p
cross join (
  values
    ('EP', 2500.00, null::numeric, 8, 'Room only. Ideal for budget-conscious groups.', 1),
    ('CP', 2900.00, null::numeric, 8, 'Room + breakfast.', 2),
    ('MAP', 3600.00, null::numeric, 10, 'Room + breakfast + dinner.', 3),
    ('AP', 4200.00, null::numeric, 10, 'Room + all meals. Best for school/college groups.', 4)
) as g(meal_plan, price_per_room, price_per_person, min_group_size, notes, sort_order)
where p.slug = 'rosewood-inn-mcleod-ganj'
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Property 2: Hotel Raja's Palace
-- ---------------------------------------------------------------------------
insert into public.properties (
  slug, name, city, state, tagline, short_description, description, address,
  latitude, longitude, google_maps_embed_url, phone, whatsapp_number, email,
  starting_price, featured_image_url, hero_image_url, gallery_categories, gallery_images,
  amenities, nearby_attractions, faqs, policies, rating, review_count, is_published, sort_order
) values (
  'rajas-palace-mcleod-ganj',
  'Hotel Raja''s Palace by Heritage Heaven',
  'McLeod Ganj, Dharamshala',
  'Himachal Pradesh',
  'Heritage charm beside the Bhagsunag Temple',
  'A homely mountain stay steps from Bhagsunag Temple, with valley-view balcony rooms.',
  'Hotel Raja''s Palace by Heritage Heaven sits in the hillside hamlet around Bhagsunag, a seven-minute walk from Bhagsunag Temple and close to the Bhagsunag waterfall. Balcony rooms open onto mountain and valley views, an in-house restaurant serves Indian and continental favourites, and the team''s homely, attentive service has made it a repeat favourite for families and small groups exploring McLeod Ganj.',
  'VPO Bhagsunag, McLeod Ganj, Tehsil Dharamshala, District Kangra, Himachal Pradesh',
  32.2458, 76.3275,
  'https://www.google.com/maps?q=Bhagsunag+McLeod+Ganj+Dharamshala&output=embed',
  '+91-98760-74252',
  '919876074252',
  'rajaspalace@heritageheavenhotels.com',
  2550,
  'https://images.unsplash.com/photo-1601565415267-724f1a6c1e6f?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1601565415267-724f1a6c1e6f?q=80&w=1920&auto=format&fit=crop',
  '[
    {"id": "rp-cat-facade", "name": "Facade", "sortOrder": 1},
    {"id": "rp-cat-rooms", "name": "Rooms", "sortOrder": 2},
    {"id": "rp-cat-views", "name": "Views", "sortOrder": 3}
  ]'::jsonb,
  '[
    {"id": "rp-img-1", "url": "https://images.unsplash.com/photo-1601565415267-724f1a6c1e6f?q=80&w=1600&auto=format&fit=crop", "alt": "Raja''s Palace exterior", "categoryId": "rp-cat-facade", "isFeatured": true, "sortOrder": 1},
    {"id": "rp-img-2", "url": "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1600&auto=format&fit=crop", "alt": "Balcony room with valley view", "categoryId": "rp-cat-rooms", "isFeatured": false, "sortOrder": 2},
    {"id": "rp-img-3", "url": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1600&auto=format&fit=crop", "alt": "Valley view near Bhagsunag", "categoryId": "rp-cat-views", "isFeatured": false, "sortOrder": 3}
  ]'::jsonb,
  '["In-house multi-cuisine restaurant", "24-hour security patrol", "Power backup", "Luggage storage & assistance", "Caretaker & housekeeping", "Free parking", "Free Wi-Fi", "Seating area"]'::jsonb,
  '[
    {"name": "Bhagsunag Temple", "distance": "0.5 km / 7 min walk", "description": "The hillside temple the neighbourhood is named for."},
    {"name": "Bhagsunag Waterfall", "distance": "650 m", "description": "A short, popular hike to a scenic waterfall."},
    {"name": "Tibet Museum", "distance": "2.2 km", "description": "Exhibits on Tibetan history and culture in exile."},
    {"name": "Hanuman ka Tibba", "distance": "6.2 km", "description": "A high-altitude peak popular with experienced trekkers."},
    {"name": "McLeod Ganj Bus Stand", "distance": "1.6 km", "description": "Main transit point connecting to Dharamshala and beyond."}
  ]'::jsonb,
  '[
    {"question": "What time is check-in and check-out?", "answer": "Check-in is from 2:00 PM and check-out is until 12:00 PM. Early check-in and late check-out are offered subject to availability."},
    {"question": "Is breakfast included?", "answer": "Room-with-breakfast rates are available alongside room-only rates. Meal inclusions are shown at the time of enquiry."},
    {"question": "What ID proof is required?", "answer": "A valid Passport, Aadhaar Card, Driving Licence or other government-issued photo ID is accepted for all guests at check-in."},
    {"question": "Are unmarried couples allowed?", "answer": "Yes, unmarried couples are welcome with valid government-issued local ID."},
    {"question": "Is the property pet-friendly?", "answer": "Pets are not permitted at this property."},
    {"question": "Is outside food allowed?", "answer": "No, outside food is not permitted on the property; the in-house restaurant serves Indian and continental cuisine."}
  ]'::jsonb,
  '{"checkIn": "2:00 PM", "checkOut": "12:00 PM", "idProof": ["Passport", "Aadhaar Card", "Driving Licence", "Government Photo ID"], "smoking": "Permitted in designated rooms only", "pets": "Not allowed", "couples": "Unmarried couples allowed with valid local ID", "minAge": 18}'::jsonb,
  3.9,
  84,
  true,
  2
)
on conflict (slug) do nothing;

insert into public.rooms (property_id, name, description, size_sqft, occupancy, bed_type, room_view, price_per_night, weekend_price, seasonal_price, seasonal_label, amenities, images, sort_order, is_available)
select p.id, r.name, r.description, r.size_sqft, r.occupancy, r.bed_type, r.room_view, r.price_per_night, r.weekend_price, r.seasonal_price, r.seasonal_label, r.amenities::jsonb, r.images::jsonb, r.sort_order, true
from public.properties p
cross join (
  values
    (
      'Semi Deluxe Room',
      'A cosy, well-appointed room with mountain views — a comfortable base for couples and solo travellers.',
      144, 2, '1 Double Bed', 'Mountain / Hill View', 2550.00, 2950.00, null::numeric, null::text,
      '["Free Wi-Fi", "Daily housekeeping", "In-room dining", "Laundry service", "Attached bathroom"]',
      '[{"url": "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1200&auto=format&fit=crop", "alt": "Semi Deluxe Room"}]',
      1
    ),
    (
      'Deluxe Room With Balcony',
      'A spacious room with a private balcony framing the surrounding hills.',
      225, 2, '1 Double Bed', 'Mountain / Hill View', 2950.00, 3400.00, null::numeric, null::text,
      '["Free Wi-Fi", "Private balcony", "Iron & ironing board", "Attached bathroom", "In-room dining"]',
      '[{"url": "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1200&auto=format&fit=crop", "alt": "Deluxe Room with balcony"}]',
      2
    ),
    (
      'Super Deluxe Room With Balcony',
      'The property''s valley-facing room, with a queen bed and private balcony.',
      168, 2, '1 Queen Bed', 'Valley View', 3950.00, 4500.00, null::numeric, null::text,
      '["Free Wi-Fi", "Private balcony", "Iron & ironing board", "Attached bathroom", "In-room dining"]',
      '[{"url": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop", "alt": "Super Deluxe Room with balcony, valley view"}]',
      3
    ),
    (
      'Family Suite With Balcony',
      'The largest room type, built for families, with a private balcony and mountain views.',
      270, 4, '1 Double Bed', 'Mountain / Hill View', 4750.00, 5400.00, null::numeric, null::text,
      '["Free Wi-Fi", "Private balcony", "Iron & ironing board", "Daily housekeeping", "Attached bathroom", "In-room dining"]',
      '[{"url": "https://images.unsplash.com/photo-1601565415267-724f1a6c1e6f?q=80&w=1200&auto=format&fit=crop", "alt": "Family Suite with balcony"}]',
      4
    )
) as r(name, description, size_sqft, occupancy, bed_type, room_view, price_per_night, weekend_price, seasonal_price, seasonal_label, amenities, images, sort_order)
where p.slug = 'rajas-palace-mcleod-ganj'
on conflict do nothing;

insert into public.reviews (property_id, guest_name, guest_location, rating, review_text, source, is_featured)
select p.id, r.guest_name, r.guest_location, r.rating, r.review_text, r.source, r.is_featured
from public.properties p
cross join (
  values
    ('Sunil N.', 'Delhi', 5.0, 'Hotel situated near the Bhagsunath temple and view from the balcony is awesome. Hotel was very clean and staff was humble.', 'makemytrip', true),
    ('Neethu S.', 'Chandigarh', 4.0, 'Good valley view from the room. Facilities are good and cordial staff. Near to Bhagsunag taxi stand.', 'makemytrip', true)
) as r(guest_name, guest_location, rating, review_text, source, is_featured)
where p.slug = 'rajas-palace-mcleod-ganj'
on conflict do nothing;

insert into public.group_rates (property_id, meal_plan, price_per_room, price_per_person, min_group_size, notes, sort_order)
select p.id, g.meal_plan, g.price_per_room, g.price_per_person, g.min_group_size, g.notes, g.sort_order
from public.properties p
cross join (
  values
    ('EP', 2300.00, null::numeric, 8, 'Room only.', 1),
    ('CP', 2700.00, null::numeric, 8, 'Room + breakfast.', 2),
    ('MAP', 3300.00, null::numeric, 10, 'Room + breakfast + dinner.', 3)
) as g(meal_plan, price_per_room, price_per_person, min_group_size, notes, sort_order)
where p.slug = 'rajas-palace-mcleod-ganj'
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- Shared amenities master list (used by the admin amenity picker)
-- ---------------------------------------------------------------------------
insert into public.amenities (name, icon, sort_order) values
  ('Free Wi-Fi', 'Wifi', 1),
  ('Free Parking', 'ParkingCircle', 2),
  ('24/7 Front Desk', 'Clock', 3),
  ('In-house Restaurant', 'Utensils', 4),
  ('Power Backup', 'Zap', 5),
  ('Daily Housekeeping', 'Sparkles', 6),
  ('Mountain-view Balconies', 'Mountain', 7),
  ('Room Heaters', 'Flame', 8),
  ('Travel & Trek Desk', 'MapPin', 9),
  ('Airport/Bus Stand Pickup', 'Car', 10),
  ('Laundry Service', 'Shirt', 11),
  ('Luggage Storage', 'Briefcase', 12),
  ('24-hour Security', 'ShieldCheck', 13)
on conflict (name) do nothing;
