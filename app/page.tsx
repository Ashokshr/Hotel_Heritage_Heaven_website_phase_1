import Image from "next/image";
import Link from "next/link";
import { Mountain, HeartHandshake, ShieldCheck, Wallet, ArrowUpRight } from "lucide-react";
import Hero from "@/components/shared/Hero";
import SectionHeading from "@/components/shared/SectionHeading";
import PropertyCard from "@/components/shared/PropertyCard";
import Testimonial from "@/components/shared/Testimonial";
import GoogleMap from "@/components/shared/GoogleMap";
import CTA from "@/components/shared/CTA";
import { getProperties, getFeaturedReviews } from "@/lib/data/properties";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Heritage Heaven Hotels | Premium Mountain Stays in Himachal Pradesh",
  description:
    "Book direct with Heritage Heaven Hotels for premium, family-run stays in McLeod Ganj, Dharamshala and beyond. Best rates guaranteed, no OTA commissions.",
  path: "/",
});

const WHY_CHOOSE_US = [
  { icon: Wallet, title: "Best Direct Rates", description: "Book with us directly and skip OTA commissions and hidden charges." },
  { icon: Mountain, title: "Prime Mountain Locations", description: "Handpicked properties minutes from the region's best trails and viewpoints." },
  { icon: HeartHandshake, title: "Personal Hospitality", description: "Family-run service with attention that big chains can't match." },
  { icon: ShieldCheck, title: "Trusted & Transparent", description: "Clear policies, real reviews, and a team that responds fast." },
];

export default async function HomePage() {
  const [properties, reviews] = await Promise.all([getProperties(), getFeaturedReviews()]);
  const featured = properties.slice(0, 3);
  const flagship = properties[0];

  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1920&auto=format&fit=crop"
        eyebrow="Heritage Heaven Hotels"
        title="Premium Mountain Stays, Rooted in Himachal Hospitality"
        subtitle="From McLeod Ganj's pine-covered slopes to the Dhauladhar skyline — book direct for the best rates and a warmer welcome."
      />

      {/* About */}
      <section className="section-padding">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div className="relative h-[420px] overflow-hidden rounded-md sm:h-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1200&auto=format&fit=crop"
              alt="Dhauladhar mountain range near Heritage Heaven properties"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="About Heritage Heaven"
              title="A brand built on mountain hospitality"
              description="Heritage Heaven Hotels brings together characterful, independently-run properties across Himachal Pradesh — each chosen for its location, warmth, and attention to detail. We believe a great stay starts with honest service, not a chain-hotel checklist."
            />
            <Link href="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-heritage-500 hover:underline">
              Our Story <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-padding bg-cream-100">
        <div className="container-site">
          <SectionHeading eyebrow="Our Properties" title="Featured Stays" align="center" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/hotels" className="btn-secondary">
              View All Hotels
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-site">
          <SectionHeading eyebrow="Why Choose Us" title="The Heritage Heaven Difference" align="center" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_US.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-heritage-100 text-heritage-500">
                  <Icon size={26} />
                </div>
                <h3 className="mt-4 text-lg text-charcoal">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Reviews */}
      {reviews.length > 0 && (
        <section className="section-padding bg-cream-100">
          <div className="container-site">
            <SectionHeading eyebrow="Guest Reviews" title="What Our Guests Say" align="center" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <Testimonial key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Preview */}
      {flagship && (
        <section className="section-padding">
          <div className="container-site">
            <SectionHeading eyebrow="Gallery" title="A Glimpse of Heritage Heaven" align="center" />
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {flagship.gallery_images.slice(0, 8).map((img, idx) => (
                <div key={img.url + idx} className={`relative h-48 overflow-hidden rounded-md ${idx === 0 ? "col-span-2 row-span-2 h-full" : ""}`}>
                  <Image src={img.url} alt={img.alt} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(min-width: 768px) 25vw, 50vw" />
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/gallery" className="btn-secondary">
                View Full Gallery
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Map */}
      {flagship?.google_maps_embed_url && (
        <section className="section-padding bg-cream-100">
          <div className="container-site">
            <SectionHeading eyebrow="Find Us" title="Our Location" align="center" />
            <div className="mx-auto mt-10 max-w-4xl">
              <GoogleMap embedUrl={flagship.google_maps_embed_url} title={flagship.name} />
            </div>
          </div>
        </section>
      )}

      <CTA
        eyebrow="Ready When You Are"
        title="Let's plan your mountain escape"
        description="Reach out directly and our team will help you pick the right property, room, and dates."
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
