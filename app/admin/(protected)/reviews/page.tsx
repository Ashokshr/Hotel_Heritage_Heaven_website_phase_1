import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { getAdminReviews } from "@/lib/actions/admin-reviews";
import DeleteReviewButton from "@/components/admin/DeleteReviewButton";

export default async function AdminReviewsPage() {
  const reviews = await getAdminReviews();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl text-charcoal">Guest Reviews</h1>
          <p className="mt-1 text-sm text-charcoal/60">
            Add real guest reviews (e.g. from Google) and choose which ones appear in the site&apos;s Guest
            Reviews section.
          </p>
        </div>
        <Link href="/admin/reviews/new" className="btn-primary self-start sm:self-auto">
          <Plus size={16} /> Add Review
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-md bg-white shadow-card">
        {reviews.length === 0 ? (
          <p className="p-6 text-sm text-charcoal/50">
            No reviews yet. Click &ldquo;Add Review&rdquo; to add your first guest review.
          </p>
        ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-charcoal/10 bg-cream-50 text-xs uppercase tracking-wide text-charcoal/50">
              <tr>
                <th className="px-4 py-3">Guest</th>
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Review</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {reviews.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-medium text-charcoal">
                    {r.guest_name}
                    {r.guest_location && <p className="text-xs font-normal text-charcoal/50">{r.guest_location}</p>}
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">{r.properties?.name || "—"}</td>
                  <td className="px-4 py-3 text-charcoal/70">
                    <span className="flex items-center gap-1">
                      <Star size={13} className="fill-gold-500 text-gold-500" /> {r.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3 capitalize text-charcoal/70">{r.source}</td>
                  <td className="max-w-xs px-4 py-3 text-charcoal/70">
                    <p className="line-clamp-2">{r.review_text}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs ${r.is_featured ? "bg-emerald-50 text-emerald-700" : "bg-charcoal/10 text-charcoal/60"}`}>
                      {r.is_featured ? "Featured" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/reviews/${r.id}`} className="inline-flex items-center gap-1.5 text-heritage-500 hover:underline">
                        <Pencil size={14} /> Edit
                      </Link>
                      <DeleteReviewButton reviewId={r.id} guestName={r.guest_name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
