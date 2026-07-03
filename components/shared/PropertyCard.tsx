import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowUpRight } from "lucide-react";
import { formatINR } from "@/lib/utils";
import type { Property } from "@/lib/types";

export default function PropertyCard({ property }: { property: Property }) {
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
            <Star size={12} className="fill-heritage-500 text-heritage-500" />
            {property.rating}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-heritage-500">
          <MapPin size={13} />
          {property.city}
        </div>
        <h3 className="mt-2 text-xl text-charcoal">{property.name}</h3>
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

        <div className="mt-5 flex items-center justify-between border-t border-charcoal/10 pt-4">
          <div>
            {property.starting_price ? (
              <>
                <span className="text-xs text-charcoal/50">Starting from</span>
                <p className="font-serif text-lg text-charcoal">{formatINR(property.starting_price)}/night</p>
              </>
            ) : (
              <span className="text-sm text-charcoal/60">Enquire for rates</span>
            )}
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-heritage-500 group-hover:underline">
            Explore Property <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
