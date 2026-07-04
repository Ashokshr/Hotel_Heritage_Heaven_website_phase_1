import Hero from "@/components/shared/Hero";
import SectionHeading from "@/components/shared/SectionHeading";
import PropertyCard from "@/components/shared/PropertyCard";
import Testimonial from "@/components/shared/Testimonial";
import CTA from "@/components/shared/CTA";
import { getProperties, getFeaturedReviews } from "@/lib/data/properties";
import { getHomeContent } from "@/lib/data/content-blocks";
import { buildMetadata } from "@/lib/seo";
import { ICON_MAP, DEFAULT_ICON, type IconKey } from "@/lib/content-icons";
import type { HomeInfoCard } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Heritage Heaven Hotels | Premium Mountain Stays in Himachal Pradesh",
  description:
    "Book direct with Heritage Heaven Hotels for premium, family-run stays in McLeod Ganj, Dharamshala and beyond. Best rates guaranteed, no OTA commissions.",
  path: "/",
});

function resolveIcon(key: string) {
  return ICON_MAP[key as IconKey] || ICON_MAP[DEFAULT_ICON];
}

export default async function HomePage() {
  const [properties, reviews, content] = await Promise.all([getProperties(), getFeaturedReviews(), getHomeContent()]);

  return (
    <>
      <Hero image="/images/mcleodganj-monastery-hero.png" eyebrow={content.hero.eyebrow} title={content.hero.title} subtitle={content.hero.subtitle} />

      {/* About Us */}
      <section id="about" className="section-padding scroll-mt-20">
        <div className="container-site max-w-2xl text-center mx-auto">
          <SectionHeading
            eyebrow={content.about.eyebrow}
            title={content.about.title}
            description={content.about.description}
            align="center"
          />
        </div>

        <div className="container-site mt-16 grid gap-8 md:grid-cols-3">
          {content.about.values.map((card: HomeInfoCard) => {
            const Icon = resolveIcon(card.icon);
            return (
              <div key={card.title} className="rounded-md bg-white p-8 shadow-card">
                <Icon className="text-gold-500" size={28} />
                <h3 className="mt-4 text-xl text-heritage-700">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{card.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Properties */}
      <section id="properties" className="section-padding bg-cream-100 scroll-mt-20">
        <div className="container-site">
          <SectionHeading eyebrow="Heritage Heaven Hotels" title="Our Properties" align="center" />
          {properties.length > 0 ? (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-sm text-charcoal/60">More properties coming soon.</p>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="section-padding scroll-mt-20">
        <div className="container-site">
          <SectionHeading eyebrow={content.whyChooseUs.eyebrow} title={content.whyChooseUs.title} align="center" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.whyChooseUs.items.map((card: HomeInfoCard) => {
              const Icon = resolveIcon(card.icon);
              return (
                <div key={card.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-100 text-gold-500">
                    <Icon size={26} />
                  </div>
                  <h3 className="mt-4 text-lg text-heritage-700">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{card.description}</p>
                </div>
              );
            })}
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

      <CTA
        eyebrow={content.closingCta.eyebrow}
        title={content.closingCta.title}
        description={content.closingCta.description}
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
