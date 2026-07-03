import Hero from "@/components/shared/Hero";
import Gallery from "@/components/shared/Gallery";
import { getProperties } from "@/lib/data/properties";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery",
  description: "Browse photos of Heritage Heaven Hotels' properties, rooms, restaurants, and mountain views.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const properties = await getProperties();
  const allImages = properties.flatMap((p) => p.gallery_images);

  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1920&auto=format&fit=crop"
        eyebrow="Gallery"
        title="Every Detail, In View"
        showButtons={false}
        height="tall"
      />

      <section className="section-padding">
        <div className="container-site">
          {allImages.length === 0 ? (
            <p className="text-center text-charcoal/60">Gallery coming soon.</p>
          ) : (
            <Gallery images={allImages} />
          )}
        </div>
      </section>
    </>
  );
}
