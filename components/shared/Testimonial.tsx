import { Star, Quote } from "lucide-react";
import type { Review } from "@/lib/types";

export default function Testimonial({ review }: { review: Review }) {
  return (
    <div className="flex h-full flex-col rounded-md bg-white p-7 shadow-card">
      <Quote className="mb-3 text-gold-400" size={28} />
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < Math.round(review.rating) ? "fill-gold-500 text-gold-500" : "text-charcoal/15"}
          />
        ))}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-charcoal/75">&ldquo;{review.review_text}&rdquo;</p>
      <div className="mt-5 border-t border-charcoal/10 pt-4">
        <p className="text-sm font-medium text-charcoal">{review.guest_name}</p>
        {review.guest_location && <p className="text-xs text-charcoal/50">{review.guest_location}</p>}
      </div>
    </div>
  );
}
