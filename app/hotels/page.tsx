import Hero from "@/components/shared/Hero";
import PropertyCard from "@/components/shared/PropertyCard";
import { getProperties } from "@/lib/data/properties";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Hotels",
  description: "Browse Heritage Heaven Hotels' properties across Himachal Pradesh, starting with Hotel Rosewood Inn in McLeod Ganj.",
  path: "/hotels",
});

export default async function HotelsPage() {
  const properties = await getProperties();

  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1920&auto=format&fit=crop"
        eyebrow="Our Hotels"
        title="Find Your Mountain Stay"
        showButtons={false}
        height="tall"
      />

      <section className="section-padding">
        <div className="container-site">
          {properties.length === 0 ? (
            <p className="text-center text-charcoal/60">No properties published yet — check back soon.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
