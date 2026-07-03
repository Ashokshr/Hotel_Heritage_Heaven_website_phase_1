import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowUpRight } from "lucide-react";
import { HIGHLIGHT_ICONS, DEFAULT_HIGHLIGHT_ICON, type HighlightIconKey } from "@/lib/highlight-icons";
import type { Property } from "@/lib/types";

export default function PropertyCard({ property }: { property: Property }) {
  const highlight = property.property_highlight;
  const showHighlight = !!highlight?.text && highlight.isActive !== false;
  const HighlightIcon = HIGHLIGHT_ICONS[(highlight?.icon as HighlightIconKey) || DEFAULT_HIGHLIGHT_ICON] || HIGHLIGHT_ICONS[DEFAULT_HIGHLIGHT_ICON];

  return (
    <Link
      href={`/hotels/${property.slug}`}
      className="group block overflow-hidden rounded-md bg-white shadow-card transition-shadow duration-300 hover:shadow-elevated"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={property.hero_image_url || "/images/placeholder-hotel.jpg"}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
        {property.rating > 0 && (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-charcoal">
            <Star size={12} className="fill-gold-500 text-gold-500" />
            {property.rating}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-heritage-500">
          <MapPin size={13} />
          {property.city}
        </div>
        <h3 className="mt-2 text-xl text-heritage-700">{property.name}</h3>
        {property.tagline && <p className="mt-1.5 text-sm text-charcoal/60">{property.tagline}</p>}

        {property.amenities?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-charcoal/55">
            {property.amenities.slice(0, 3).map((a) => (
              <li key={a} className="before:mr-1 before:content-['·'] first:before:content-none">
                {a}
              </li>
            ))}
          </ul>
        )}

        {showHighlight && (
          <div className="mt-4 flex items-center gap-2 rounded-sm bg-gold-50 px-3 py-2 text-xs font-medium text-heritage-700">
            <HighlightIcon size={14} className="shrink-0 text-gold-500" />
            <span className="truncate">{highlight!.text}</span>
            {highlight?.seasonalLabel && (
              <span className="ml-auto shrink-0 rounded-full bg-heritage-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                {highlight.seasonalLabel}
              </span>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center justify-end border-t border-charcoal/10 pt-4">
          <span className="flex items-center gap-1 text-sm font-medium text-heritage-500 group-hover:underline">
            Explore Property <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
