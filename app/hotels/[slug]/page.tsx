import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Star, CheckCircle2 } from "lucide-react";
import Hero from "@/components/shared/Hero";
import SectionHeading from "@/components/shared/SectionHeading";
import RoomCard from "@/components/shared/RoomCard";
import Gallery from "@/components/shared/Gallery";
import GoogleMap from "@/components/shared/GoogleMap";
import Testimonial from "@/components/shared/Testimonial";
import FAQ from "@/components/shared/FAQ";
import EnquireButtons from "@/components/shared/EnquireButtons";
import { getProperties, getPropertyBySlug } from "@/lib/data/properties";
import { buildHotelSchema, buildMetadata } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";
import { FALLBACK_REVIEWS } from "@/lib/data/fallback";
import type { Review } from "@/lib/types";

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};

  return buildMetadata({
    title: property.name,
    description: property.description || `${property.name} in ${property.city}`,
    path: `/hotels/${property.slug}`,
    image: property.hero_image_url || undefined,
  });
}

async function getReviewsForProperty(propertyId: string): Promise<Review[]> {
  const supabase = createPublicClient();
  if (!supabase) return FALLBACK_REVIEWS.filter((r) => r.property_id === propertyId || r.property_id?.startsWith("demo"));

  const { data } = await supabase.from("reviews").select("*").eq("property_id", propertyId).limit(6);
  return (data as Review[]) || [];
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const reviews = await getReviewsForProperty(property.id);
  const schema = buildHotelSchema(property);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Hero
        image={property.hero_image_url || property.gallery_images[0]?.url || ""}
        eyebrow={property.city}
        title={property.name}
        subtitle={property.tagline || undefined}
        showButtons={false}
      />

      {/* Overview + quick facts */}
      <section className="section-padding">
        <div className="container-site grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm text-charcoal/70">
                <MapPin size={16} className="text-heritage-500" /> {property.address || property.city}
              </span>
              {property.rating > 0 && (
                <span className="flex items-center gap-1 rounded-full bg-heritage-100 px-2.5 py-1 text-xs font-semibold text-heritage-600">
                  <Star size={12} className="fill-heritage-500 text-heritage-500" /> {property.rating} ({property.review_count} reviews)
                </span>
              )}
            </div>
            <h2 className="mt-6 text-2xl text-charcoal">Property Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{property.description}</p>
          </div>

          <div className="rounded-md bg-cream-100 p-6">
            <p className="text-sm text-charcoal/60">Starting from</p>
            <p className="font-serif text-3xl text-charcoal">
              {property.starting_price ? `₹${property.starting_price.toLocaleString("en-IN")}` : "Enquire"}
              <span className="text-sm font-normal text-charcoal/50"> /night</span>
            </p>
            <div className="mt-5">
              <EnquireButtons propertyId={property.id} propertyName={property.name} phone={property.phone} whatsappNumber={property.whatsapp_number} />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {property.gallery_images.length > 0 && (
        <section className="section-padding bg-cream-100">
          <div className="container-site">
            <SectionHeading eyebrow="Gallery" title="A Look Inside" />
            <div className="mt-10">
              <Gallery images={property.gallery_images} />
            </div>
          </div>
        </section>
      )}

      {/* Room Categories */}
      {property.rooms && property.rooms.length > 0 && (
        <section className="section-padding">
          <div className="container-site">
            <SectionHeading eyebrow="Room Categories" title="Choose Your Room" />
            <div className="mt-10 space-y-6">
              {property.rooms
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((room) => (
                  <RoomCard key={room.id} room={room} propertyId={property.id} propertyName={property.name} />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Amenities */}
      {property.amenities.length > 0 && (
        <section className="section-padding bg-cream-100">
          <div className="container-site">
            <SectionHeading eyebrow="Amenities" title="What This Property Offers" />
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
              {property.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 text-sm text-charcoal/75">
                  <CheckCircle2 size={16} className="shrink-0 text-heritage-500" /> {a}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby Attractions */}
      {property.nearby_attractions.length > 0 && (
        <section className="section-padding">
          <div className="container-site">
            <SectionHeading eyebrow="Nearby Attractions" title="Explore the Area" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {property.nearby_attractions.map((a) => (
                <div key={a.name} className="rounded-md bg-white p-6 shadow-card">
                  <h3 className="text-base text-charcoal">{a.name}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-heritage-500">{a.distance}</p>
                  <p className="mt-2 text-sm text-charcoal/65">{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map */}
      {property.google_maps_embed_url && (
        <section className="section-padding bg-cream-100">
          <div className="container-site">
            <SectionHeading eyebrow="Location" title="How to Reach Us" />
            <div className="mt-10">
              <GoogleMap embedUrl={property.google_maps_embed_url} title={property.name} />
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="section-padding">
          <div className="container-site">
            <SectionHeading eyebrow="Guest Reviews" title="What Guests Are Saying" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <Testimonial key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {property.faqs.length > 0 && (
        <section className="section-padding bg-cream-100">
          <div className="container-site max-w-3xl">
            <SectionHeading eyebrow="FAQs" title="Good to Know" align="center" />
            <div className="mt-10">
              <FAQ items={property.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Policies */}
      <section className="section-padding">
        <div className="container-site max-w-3xl">
          <SectionHeading eyebrow="Policies" title="Property Rules" align="center" />
          <dl className="mt-10 grid gap-6 sm:grid-cols-2 text-sm">
            {property.policies.checkIn && (
              <div>
                <dt className="font-medium text-charcoal">Check-in</dt>
                <dd className="mt-1 text-charcoal/65">{property.policies.checkIn}</dd>
              </div>
            )}
            {property.policies.checkOut && (
              <div>
                <dt className="font-medium text-charcoal">Check-out</dt>
                <dd className="mt-1 text-charcoal/65">{property.policies.checkOut}</dd>
              </div>
            )}
            {property.policies.idProof && property.policies.idProof.length > 0 && (
              <div>
                <dt className="font-medium text-charcoal">Accepted ID Proof</dt>
                <dd className="mt-1 text-charcoal/65">{property.policies.idProof.join(", ")}</dd>
              </div>
            )}
            {property.policies.couples && (
              <div>
                <dt className="font-medium text-charcoal">Couple/Bachelor Policy</dt>
                <dd className="mt-1 text-charcoal/65">{property.policies.couples}</dd>
              </div>
            )}
            {property.policies.pets && (
              <div>
                <dt className="font-medium text-charcoal">Pets</dt>
                <dd className="mt-1 text-charcoal/65">{property.policies.pets}</dd>
              </div>
            )}
            {property.policies.smoking && (
              <div>
                <dt className="font-medium text-charcoal">Smoking</dt>
                <dd className="mt-1 text-charcoal/65">{property.policies.smoking}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>
    </>
  );
}
