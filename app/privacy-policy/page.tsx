import { buildMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Heritage Heaven Hotels collects, uses, and protects your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="section-padding">
      <div className="container-site max-w-3xl">
        <h1 className="text-3xl text-charcoal">Privacy Policy</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-charcoal/70">
          <p>
            Heritage Heaven Hotels (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects the information you submit through our enquiry forms —
            name, phone number, email, and stay details — solely to respond to your booking enquiry and improve
            our service.
          </p>
          <p>
            We do not sell your personal information. Data is stored securely in our database (Supabase) and is
            accessible only to authorised Heritage Heaven staff. We may use anonymised, aggregated data (via
            Google Analytics) to understand how visitors use our website.
          </p>
          <p>
            You may request access to, correction of, or deletion of your data at any time by writing to{" "}
            <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-heritage-500 underline">
              {SITE_CONFIG.supportEmail}
            </a>
            .
          </p>
          <p className="text-charcoal/50">
            This is placeholder policy text. Please have it reviewed by a legal professional before publishing.
          </p>
        </div>
      </div>
    </section>
  );
}
