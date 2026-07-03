"use client";

import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { deleteReview } from "@/lib/actions/admin-reviews";

export default function DeleteReviewButton({ reviewId, guestName }: { reviewId: string; guestName: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    const confirmed = confirm(`Delete the review from "${guestName}"? This can't be undone.`);
    if (!confirmed) return;

    setError(null);
    startTransition(async () => {
      const result = await deleteReview(reviewId);
      if (!result.ok) setError(result.error || "Couldn't delete this review.");
    });
  }

  return (
    <div className="inline-flex flex-col items-end">
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:underline disabled:opacity-50"
      >
        {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        Delete
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
