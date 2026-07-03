import { notFound } from "next/navigation";
import ReviewForm from "@/components/admin/ReviewForm";
import { getAdminReviewById, getPropertyOptions } from "@/lib/actions/admin-reviews";

export default async function EditReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [review, properties] = await Promise.all([getAdminReviewById(id), getPropertyOptions()]);
  if (!review) notFound();

  return (
    <div>
      <h1 className="text-2xl text-charcoal">Edit Review</h1>
      <p className="mt-1 text-sm text-charcoal/60">{review.guest_name}</p>
      <div className="mt-8">
        <ReviewForm review={review} properties={properties} />
      </div>
    </div>
  );
}
