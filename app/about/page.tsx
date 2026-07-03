import Image from "next/image";
import { Compass, Leaf, Users } from "lucide-react";
import Hero from "@/components/shared/Hero";
import SectionHeading from "@/components/shared/SectionHeading";
import CTA from "@/components/shared/CTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Heritage Heaven Hotels — our brand story, vision, mission, and philosophy behind every mountain property we run.",
  path: "/about",
});

const TIMELINE = [
  { year: "Our Beginning", text: "Heritage Heaven started with a simple idea: mountain hospitality should feel personal, not transactional." },
  { year: "Rosewood Inn", text: "Hotel Rosewood Inn opened in McLeod Ganj, steps from the Triund trailhead, as our flagship property." },
  { year: "Building Direct Relationships", text: "We launched heritageheavenhotels.com to connect guests and travel partners with us directly — better rates, better service, no middlemen." },
  { year: "What's Next", text: "We're building toward a growing family of properties across Himachal Pradesh, without ever losing the personal touch." },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1626621331169-5f34be280ed9?q=80&w=1920&auto=format&fit=crop"
        eyebrow="About Us"
        title="Hospitality, Rooted in the Mountains"
        showButtons={false}
        height="tall"
      />

      <section className="section-padding">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our Story" title="Built by people who love these mountains" />
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-charcoal/70">
              <p>
                Heritage Heaven Hotels began with a single property — Hotel Rosewood Inn in McLeod Ganj — and a
                belief that a stay in the hills should feel unhurried, warm, and honest. Our founders grew up in
                the shadow of the Dhauladhar range and wanted to share that sense of place with travellers, without
                the impersonal feel of big hotel chains.
              </p>
              <p>
                Today, that same philosophy guides every decision we make: from how we welcome guests at the door
                to how we work with travel agents and group organisers who trust us with their clients.
              </p>
            </div>
          </div>
          <div className="relative h-[420px] overflow-hidden rounded-md">
            <Image
              src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200&auto=format&fit=crop"
              alt="Heritage Heaven property nestled in the mountains"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream-100">
        <div className="container-site grid gap-8 md:grid-cols-3">
          <div className="rounded-md bg-white p-8 shadow-card">
            <Compass className="text-heritage-500" size={28} />
            <h3 className="mt-4 text-xl text-charcoal">Our Vision</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
              To become Himachal Pradesh's most trusted independent hotel brand — known for genuine hospitality in
              every property we operate.
            </p>
          </div>
          <div className="rounded-md bg-white p-8 shadow-card">
            <Leaf className="text-heritage-500" size={28} />
            <h3 className="mt-4 text-xl text-charcoal">Our Mission</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
              To deliver comfortable, well-located stays with attentive service, fair direct pricing, and respect
              for the mountain communities we operate in.
            </p>
          </div>
          <div className="rounded-md bg-white p-8 shadow-card">
            <Users className="text-heritage-500" size={28} />
            <h3 className="mt-4 text-xl text-charcoal">Our Philosophy</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
              Hospitality is personal. We keep our properties small enough to know our guests by name and
              responsive enough to solve problems before they become complaints.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <SectionHeading eyebrow="Our Journey" title="Timeline" align="center" />
          <div className="mx-auto mt-12 max-w-2xl space-y-8 border-l border-charcoal/15 pl-8">
            {TIMELINE.map((item) => (
              <div key={item.year} className="relative">
                <span className="absolute -left-[38px] top-1 h-3 w-3 rounded-full bg-heritage-500" />
                <p className="eyebrow">{item.year}</p>
                <p className="mt-1 text-sm leading-relaxed text-charcoal/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Come experience it for yourself"
        description="Explore our properties or reach out and let us help plan your stay."
        secondaryLabel="View Our Hotels"
        secondaryHref="/hotels"
      />
    </>
  );
}
