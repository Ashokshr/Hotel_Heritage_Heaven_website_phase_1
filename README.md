# Heritage Heaven Hotels — Website (Phase 1)

A premium, mobile-first hotel website for Heritage Heaven Hotels, built with Next.js (App Router),
TypeScript, Tailwind CSS, and Supabase. Phase 1 covers Home, About, Hotels, Property Detail, Gallery,
Travel Agents, Contact, a WhatsApp enquiry flow, and an admin dashboard/CMS.

## Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage-ready)
- **Hosting:** Vercel
- **Email:** Resend (admin enquiry notifications)
- **Analytics:** Google Analytics 4

## Project Structure

```
app/                      Routes (App Router)
  admin/                  Admin dashboard (login-gated)
    (protected)/          Dashboard + Properties CMS, wrapped in sidebar layout
    login/                Admin login
  hotels/[slug]/           Dynamic property detail pages
  sitemap.ts, robots.ts    Auto-generated SEO files
components/
  layout/                 Navbar, Footer, SiteChrome (hides nav/footer on /admin)
  shared/                 Hero, PropertyCard, RoomCard, Gallery, FAQ, CTA, forms, etc.
  admin/                  Admin-only components (tables, forms, sidebar)
  providers/              EnquiryModalProvider (global WhatsApp enquiry popup)
lib/
  actions/                Server actions (enquiries, admin auth, property CMS)
  data/                   Data-fetching layer + static fallback content
  supabase/               Browser/server/admin Supabase clients + auth middleware
  seo.ts, constants.ts, whatsapp.ts, email.ts, utils.ts, types.ts
supabase/
  migrations/0001_init.sql  Full schema (properties, rooms, reviews, enquiries, RLS)
  seed.sql                  Seed data for Hotel Rosewood Inn
```

## Getting Started

> **Note:** this project was generated in a sandboxed environment without access to the npm
> registry, so `npm install` has not been run here. Run the steps below on your own machine.

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a Supabase project** at [supabase.com](https://supabase.com) (free tier is enough to start).

3. **Run the database migrations and seed data** (in this order, in the Supabase SQL Editor)
   - `supabase/migrations/0001_init.sql` — core schema (properties, rooms, reviews, enquiries, RLS)
   - `supabase/migrations/0002_storage.sql` — `property-images` Storage bucket used by the admin
     photo uploader
   - `supabase/migrations/0003_room_availability.sql` — adds the room-level "available for
     booking" / "sold out" toggle
   - `supabase/seed.sql` — Hotel Rosewood Inn's details, rooms, and sample reviews

4. **Create your first admin user**
   - Supabase Dashboard → Authentication → Users → Add User (email + password)
   - This is the login you'll use at `/admin/login`

5. **Copy environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase → Settings → API
   - `SUPABASE_SERVICE_ROLE_KEY` — same page (keep secret, server-only)
   - `RESEND_API_KEY` — from [resend.com](https://resend.com) (free tier: 3,000 emails/month) for admin
     email notifications on new enquiries
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` — the WhatsApp Business number enquiries should go to
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics 4 measurement ID
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — Google Search Console verification code

6. **Run locally**
   ```bash
   npm run dev
   ```
   The site works even before Supabase is configured — it falls back to demo content for
   Hotel Rosewood Inn (`lib/data/fallback.ts`) so you can preview the design immediately.

7. **Deploy to Vercel**
   - Push this repo to GitHub
   - Import into [vercel.com/new](https://vercel.com/new)
   - Add the same environment variables in Vercel → Project → Settings → Environment Variables
   - Deploy

## Content sourced from the public listing

Location facts, room types/sizes, and property policies for Hotel Rosewood Inn were sourced from
its public MakeMyTrip listing. Descriptions, amenity copy, FAQs, and guest reviews are **draft
brand copy** — edit them via `/admin/properties` (or directly in `supabase/seed.sql`) before
launch. Gallery/hero images currently point to royalty-free Unsplash placeholders — replace with
real property photography via the admin CMS.

## Admin Dashboard (`/admin`)

- **Login:** Supabase Auth email/password (create users manually in the Supabase dashboard —
  there's no public sign-up).
- **Enquiries:** view all leisure enquiries, filter by status, update status
  (New/Contacted/Confirmed/Closed), export to CSV.
- **Properties:** add/edit hotels — images, description, amenities, room types, rates, location,
  FAQs, and policies — with no code changes or redeploys required.
- **Photos:** upload hero/gallery/room photos directly from the property/room forms (drag-and-drop
  or click to browse) — files go straight to Supabase Storage, no URLs to hunt for. Pasting a URL
  manually still works too.
- **Pricing:** editable at both levels — `Starting Price` on the property form (used on listing
  cards) and `Price / night` per room type on each room.
- **Availability:** each room has an "Available for booking" checkbox. Unchecking it shows a
  "Sold Out" badge on the property page and disables that room's Enquire button — useful when a
  room type is fully booked without deleting it. This is a manual toggle, not a date-based
  calendar (Phase 1 has no real-time booking engine — see "What's Next" below).
- **Publish/unpublish:** the `Published` checkbox on the property form hides an entire property
  from the live site (listing pages, sitemap) without deleting it — handy for properties still
  being set up.

List/object fields (amenities, gallery images, nearby attractions, FAQs) use a simple plain-text
format in the CMS forms instead of raw JSON — the format is explained in each field's label.

## WhatsApp Enquiry Flow

1. Guest clicks **Enquire Now** (navbar, hero, property page, or the floating WhatsApp button).
2. A popup collects name, phone, check-in/out, rooms, guests, and a special request.
3. The enquiry is saved to Supabase (`enquiries` table).
4. An admin notification email is sent via Resend.
5. The browser opens `wa.me` with the message prefilled — works on both mobile (WhatsApp app) and
   desktop (WhatsApp Web).

Travel agent / group / wedding enquiries from `/travel-agents` go to a separate
`partner_enquiries` table via the same pattern (DB write + email), without the WhatsApp redirect.

## SEO

- Per-page metadata (title, description, canonical, Open Graph, Twitter card) via `lib/seo.ts`
- `schema.org/Hotel` JSON-LD on every property page, `Organization` JSON-LD site-wide
- Auto-generated `sitemap.xml` (`app/sitemap.ts`) and `robots.txt` (`app/robots.ts`), which also
  disallows `/admin/`
- Google Analytics 4 loads only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set

## What's Next (Phase 2 / Phase 3 — not built yet)

Per the PRD, this repo intentionally ships **Phase 1 only**. The schema and folder structure are
built to extend without a redesign:

- **Phase 2:** agent login/portal, group rates, meetings & events page, blog, offers, multi-property
  search, online booking + payment gateway (new `bookings`/`payments` tables, Razorpay/Stripe).
- **Phase 3 (AI):** AI hotel assistant / trip planner (can be built as a new route + OpenAI/Claude
  API call reading from the same `properties` table), personalized recommendations, review
  summarization, WhatsApp AI auto-replies, Hindi + additional language support (`next-intl` or
  similar, content fields already text-based and easy to duplicate per locale).

Adding a second property is as simple as clicking **Add Property** in `/admin/properties` — no
code changes needed. Adding a second *city* works the same way since `city`/`state` are already
per-property fields, not hardcoded.

## Known limitations of this build

- This project's files were generated in an offline sandbox without npm registry access, so
  `npm install` / `npm run build` have **not** been run or verified here. Please run
  `npm install && npm run build` locally before deploying — reasonable care was taken to keep
  imports and syntax correct, but a first local build/lint pass is recommended.
- Logo, favicon, and Open Graph share image are not included — add `public/logo.png`,
  `public/favicon.ico`, and `public/og-image.jpg` with your final brand assets.
- Lighthouse targets (95+ across the board) depend heavily on final image sizes/compression and
  hosting — re-check scores after swapping in real photography.
