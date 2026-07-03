import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import Hero from "@/components/shared/Hero";
import SectionHeading from "@/components/shared/SectionHeading";
import GoogleMap from "@/components/shared/GoogleMap";
import ContactForm from "@/components/shared/ContactForm";
import { SITE_CONFIG } from "@/lib/constants";
import { getProperties } from "@/lib/data/properties";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: "Get in touch with Heritage Heaven Hotels — address, phone, WhatsApp, email, and a contact form for enquiries.",
  path: "/contact",
});

export default async function ContactPage() {
  const properties = await getProperties();
  const flagship = properties[0];

  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1920&auto=format&fit=crop"
        eyebrow="Contact"
        title="We'd Love to Hear From You"
        showButtons={false}
        height="tall"
      />

      <section className="section-padding">
        <div className="container-site grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Get in Touch" title="Contact Details" />
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-heritage-500" />
                <span className="text-charcoal/75">{flagship?.address || "McLeod Ganj, Dharamshala, Himachal Pradesh"}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-heritage-500" />
                <a href={`tel:${SITE_CONFIG.supportPhone}`} className="text-charcoal/75 hover:text-heritage-500">
                  {SITE_CONFIG.supportPhone}
                </a>
              </li>
              <li className="flex gap-3">
                <MessageCircle size={18} className="mt-0.5 shrink-0 text-heritage-500" />
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/75 hover:text-heritage-500"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-heritage-500" />
                <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-charcoal/75 hover:text-heritage-500">
                  {SITE_CONFIG.supportEmail}
                </a>
              </li>
            </ul>

            {flagship?.google_maps_embed_url && (
              <div className="mt-8">
                <GoogleMap embedUrl={flagship.google_maps_embed_url} title={flagship.name} />
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-md bg-cream-100 p-8">
              <SectionHeading eyebrow="Send a Message" title="We'll Reply Within a Day" />
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
