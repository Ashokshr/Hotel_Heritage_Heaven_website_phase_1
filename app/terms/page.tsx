import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions for booking enquiries and using the Heritage Heaven Hotels website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="section-padding">
      <div className="container-site max-w-3xl">
        <h1 className="text-3xl text-charcoal">Terms & Conditions</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-charcoal/70">
          <p>
            By submitting an enquiry through this website, you agree to be contacted by Heritage Heaven Hotels via
            phone, WhatsApp, or email regarding your stay. This website is for enquiry generation only — bookings
            are confirmed directly with our reservations team, not through online payment on this site.
          </p>
          <p>
            Room rates displayed are indicative starting prices and are subject to change based on season,
            availability, and inclusions confirmed at the time of booking.
          </p>
          <p>
            Cancellation and property-specific policies (check-in/out times, ID requirements, pet policy) are
            listed on each property's page and apply to all bookings at that property.
          </p>
          <p className="text-charcoal/50">
            This is placeholder terms text. Please have it reviewed by a legal professional before publishing.
          </p>
        </div>
      </div>
    </section>
  );
}
