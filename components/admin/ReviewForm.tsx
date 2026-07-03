"use client";

import { useState, useTransition } from "react";
import { Loader2, Save } from "lucide-react";
import { upsertReview } from "@/lib/actions/admin-reviews";
import type { Property, Review } from "@/lib/types";

const SOURCES = [
  { value: "google", label: "Google" },
  { value: "direct", label: "Direct / Front Desk" },
  { value: "makemytrip", label: "MakeMyTrip" },
  { value: "booking", label: "Booking.com" },
];

export default function ReviewForm({
  review,
  properties,
}: {
  review?: Review | null;
  properties: Pick<Property, "id" | "name">[];
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await upsertReview(review?.id || null, formData);
      if (result && !result.ok) setError(result.error || "Something went wrong.");
    });
  }

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-6 rounded-md bg-white p-6 shadow-card">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Property</label>
        <select
          name="property_id"
          required
          defaultValue={review?.property_id || properties[0]?.id || ""}
          className="w-full rounded-sm border border-charcoal/15 bg-cream-50 px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400"
        >
          <option value="" disabled>
            Select a property
          </option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Guest Name</label>
          <input
            name="guest_name"
            required
            defaultValue={review?.guest_name || ""}
            placeholder="e.g. Mohit Sharma"
            className="w-full rounded-sm border border-charcoal/15 bg-cream-50 px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Guest Location (optional)</label>
          <input
            name="guest_location"
            defaultValue={review?.guest_location || ""}
            placeholder="e.g. Delhi"
            className="w-full rounded-sm border border-charcoal/15 bg-cream-50 px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Rating (0-5)</label>
          <input
            name="rating"
            type="number"
            min={0}
            max={5}
            step={0.5}
            defaultValue={review?.rating ?? 5}
            className="w-full rounded-sm border border-charcoal/15 bg-cream-50 px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Source</label>
          <select
            name="source"
            defaultValue={review?.source || "google"}
            className="w-full rounded-sm border border-charcoal/15 bg-cream-50 px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400"
          >
            {SOURCES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Review Date</label>
          <input
            name="review_date"
            type="date"
            defaultValue={review?.review_date || ""}
            className="w-full rounded-sm border border-charcoal/15 bg-cream-50 px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Review Text</label>
        <textarea
          name="review_text"
          required
          rows={5}
          defaultValue={review?.review_text || ""}
          placeholder="Paste the guest's review here..."
          className="w-full rounded-sm border border-charcoal/15 bg-cream-50 px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-charcoal/75">
        <input type="checkbox" name="is_featured" defaultChecked={review?.is_featured ?? true} className="h-4 w-4" />
        Featured (shown in the Guest Reviews section on the site)
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={isPending} className="btn-primary">
        {isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
        {isPending ? "Saving..." : "Save Review"}
      </button>
    </form>
  );
}
