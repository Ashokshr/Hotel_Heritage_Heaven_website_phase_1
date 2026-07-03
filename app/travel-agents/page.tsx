import { Percent, Users2, PhoneCall, Handshake, School, Building2, HeartHandshake, UsersRound } from "lucide-react";
import Hero from "@/components/shared/Hero";
import SectionHeading from "@/components/shared/SectionHeading";
import PartnerEnquiryForm from "@/components/shared/PartnerEnquiryForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Travel Agents & Meetings",
  description: "Partner with Heritage Heaven Hotels for corporate rates, group bookings, and dedicated support for travel agents, schools, and event organisers.",
  path: "/travel-agents",
});

const BENEFITS = [
  { icon: Percent, title: "Corporate & Group Rates", description: "Preferential pricing tiers for volume and repeat bookings." },
  { icon: PhoneCall, title: "Dedicated Contact", description: "A single point of contact for quotes, availability, and support." },
  { icon: Handshake, title: "Flexible Terms", description: "Commission structures and payment terms built for agency workflows." },
  { icon: Users2, title: "Priority Support", description: "Fast turnaround on availability checks and last-minute requests." },
];

const GROUP_TYPES = [
  { icon: School, title: "School Groups", description: "Safe, supervised stays with group-friendly meal plans and common areas." },
  { icon: Building2, title: "Corporate Offsites", description: "Quiet mountain settings for team retreats and offsite meetings." },
  { icon: HeartHandshake, title: "Destination Weddings", description: "Scenic backdrops and flexible spaces for intimate mountain weddings." },
  { icon: UsersRound, title: "Family Groups", description: "Adjoining and family rooms for multi-generational trips." },
];

export default function TravelAgentsPage() {
  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop"
        eyebrow="Partnerships"
        title="Travel Agents & Group Partners"
        subtitle="Grow your business with a hospitality partner who's easy to work with."
        showButtons={false}
        height="tall"
      />

      <section className="section-padding">
        <div className="container-site">
          <SectionHeading eyebrow="Why Partner With Us" title="Built for Agents Who Move Fast" align="center" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-md bg-white p-6 text-center shadow-card">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-500">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-base text-heritage-700">{title}</h3>
                <p className="mt-2 text-sm text-charcoal/65">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="groups" className="section-padding bg-cream-100">
        <div className="container-site">
          <SectionHeading eyebrow="Meetings & Groups" title="Suitable For" align="center" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {GROUP_TYPES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-heritage-500/10 text-heritage-500">
                  <Icon size={26} />
                </div>
                <h3 className="mt-4 text-lg text-charcoal">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site max-w-2xl">
          <SectionHeading eyebrow="Become Our Partner" title="Tell Us About Your Requirement" align="center" />
          <div className="mt-10 rounded-md bg-white p-8 shadow-card">
            <PartnerEnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
