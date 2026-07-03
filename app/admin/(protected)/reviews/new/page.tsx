import ReviewForm from "@/components/admin/ReviewForm";
import { getPropertyOptions } from "@/lib/actions/admin-reviews";

export default async function NewReviewPage() {
  const properties = await getPropertyOptions();

  return (
    <div>
      <h1 className="text-2xl text-charcoal">Add Review</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        Add a real guest review — copy the text from Google, MakeMyTrip, Booking.com, or your own records.
      </p>
      <div className="mt-8">
        <ReviewForm properties={properties} />
      </div>
    </div>
  );
}
