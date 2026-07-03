"use client";

import { useState, useTransition } from "react";
import { Loader2, Save } from "lucide-react";
import { upsertProperty } from "@/lib/actions/admin-properties";
import type { Property } from "@/lib/types";

export default function PropertyForm({ property }: { property?: Property | null }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const amenitiesText = property?.amenities?.join("\n") || "";
  const galleryText = property?.gallery_images?.map((g) => `${g.url} | ${g.alt} | ${g.category}`).join("\n") || "";
  const attractionsText = property?.nearby_attractions?.map((a) => `${a.name} | ${a.distance} | ${a.description}`).join("\n") || "";
  const faqsText = property?.faqs?.map((f) => `${f.question} :: ${f.answer}`).join("\n") || "";

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await upsertProperty(property?.id || null, formData);
      if (result && !result.ok) setError(result.error || "Something went wrong.");
    });
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <Section title="Basics">
        <Grid>
          <Field label="Property Name" name="name" defaultValue={property?.name} required />
          <Field label="Slug (URL)" name="slug" defaultValue={property?.slug} required placeholder="rosewood-inn-mcleod-ganj" />
          <Field label="City" name="city" defaultValue={property?.city} required />
          <Field label="State" name="state" defaultValue={property?.state || "Himachal Pradesh"} />
          <Field label="Tagline" name="tagline" defaultValue={property?.tagline || ""} className="sm:col-span-2" />
        </Grid>
        <TextArea label="Description" name="description" defaultValue={property?.description || ""} rows={4} />
      </Section>

      <Section title="Contact & Location">
        <Grid>
          <Field label="Address" name="address" defaultValue={property?.address || ""} className="sm:col-span-2" />
          <Field label="Latitude" name="latitude" type="number" step="0.0001" defaultValue={property?.latitude ?? ""} />
          <Field label="Longitude" name="longitude" type="number" step="0.0001" defaultValue={property?.longitude ?? ""} />
          <Field label="Phone" name="phone" defaultValue={property?.phone || ""} />
          <Field label="WhatsApp Number (E.164, no +)" name="whatsapp_number" defaultValue={property?.whatsapp_number || ""} />
          <Field label="Email" name="email" defaultValue={property?.email || ""} />
        </Grid>
        <Field label="Google Maps Embed URL" name="google_maps_embed_url" defaultValue={property?.google_maps_embed_url || ""} />
      </Section>

      <Section title="Pricing & Rating">
        <Grid>
          <Field label="Starting Price (₹/night)" name="starting_price" type="number" defaultValue={property?.starting_price ?? ""} />
          <Field label="Rating (0-5)" name="rating" type="number" step="0.1" defaultValue={property?.rating ?? 0} />
          <Field label="Review Count" name="review_count" type="number" defaultValue={property?.review_count ?? 0} />
          <Field label="Sort Order" name="sort_order" type="number" defaultValue={property?.sort_order ?? 0} />
        </Grid>
        <label className="mt-2 flex items-center gap-2 text-sm text-charcoal/75">
          <input type="checkbox" name="is_published" defaultChecked={property?.is_published ?? true} className="h-4 w-4" />
          Published (visible on the live site)
        </label>
      </Section>

      <Section title="Images">
        <Field label="Hero Image URL" name="hero_image_url" defaultValue={property?.hero_image_url || ""} />
        <TextArea
          label="Gallery Images — one per line: url | alt text | category (property/rooms/restaurant/views)"
          name="gallery_images"
          defaultValue={galleryText}
          rows={5}
        />
      </Section>

      <Section title="Amenities">
        <TextArea label="One amenity per line" name="amenities" defaultValue={amenitiesText} rows={5} />
      </Section>

      <Section title="Nearby Attractions">
        <TextArea
          label="One per line: name | distance | description"
          name="nearby_attractions"
          defaultValue={attractionsText}
          rows={5}
        />
      </Section>

      <Section title="FAQs">
        <TextArea label="One per line: question :: answer" name="faqs" defaultValue={faqsText} rows={5} />
      </Section>

      <Section title="Policies">
        <Grid>
          <Field label="Check-in" name="checkIn" defaultValue={property?.policies?.checkIn || "12:00 PM"} />
          <Field label="Check-out" name="checkOut" defaultValue={property?.policies?.checkOut || "12:00 PM"} />
          <Field label="ID Proof accepted (comma separated)" name="idProof" defaultValue={property?.policies?.idProof?.join(", ") || ""} className="sm:col-span-2" />
          <Field label="Smoking Policy" name="smoking" defaultValue={property?.policies?.smoking || ""} />
          <Field label="Pets Policy" name="pets" defaultValue={property?.policies?.pets || ""} />
          <Field label="Couples Policy" name="couples" defaultValue={property?.policies?.couples || ""} className="sm:col-span-2" />
          <Field label="Minimum Age" name="minAge" type="number" defaultValue={property?.policies?.minAge ?? 18} />
        </Grid>
      </Section>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={isPending} className="btn-primary">
        {isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
        {isPending ? "Saving..." : "Save Property"}
      </button>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md bg-white p-6 shadow-card">
      <h2 className="mb-4 text-base font-semibold text-charcoal">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
  step,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
  step?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-charcoal/80">{label}</label>
      <input
        name={name}
        type={type}
        step={step}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-sm border border-charcoal/15 bg-cream-50 px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-charcoal/80">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="w-full rounded-sm border border-charcoal/15 bg-cream-50 px-3.5 py-2.5 font-mono text-xs outline-none focus:border-heritage-400"
      />
    </div>
  );
}
