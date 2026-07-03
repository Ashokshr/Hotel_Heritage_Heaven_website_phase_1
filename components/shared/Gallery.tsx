"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryImage } from "@/lib/types";

const UNCATEGORIZED = "__uncategorized__";

export default function Gallery({
  images,
  categories = [],
  showFilters = true,
}: {
  images: GalleryImage[];
  categories?: GalleryCategory[];
  showFilters?: boolean;
}) {
  const sortedCategories = useMemo(() => [...categories].sort((a, b) => a.sortOrder - b.sortOrder), [categories]);

  const categoryName = (id: string | undefined) => {
    if (!id) return "Uncategorized";
    return sortedCategories.find((c) => c.id === id)?.name || categories.find((c) => c.id === id)?.name || id;
  };

  // Only show filter pills for categories that actually have photos.
  const usedCategoryIds = useMemo(() => new Set(images.map((i) => i.categoryId || UNCATEGORIZED)), [images]);
  const filterOptions = useMemo(() => {
    const opts = sortedCategories.filter((c) => usedCategoryIds.has(c.id)).map((c) => ({ id: c.id, label: c.name }));
    if (usedCategoryIds.has(UNCATEGORIZED)) opts.push({ id: UNCATEGORIZED, label: "Other" });
    return opts;
  }, [sortedCategories, usedCategoryIds]);

  const [filter, setFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filter === "all" ? images : images.filter((i) => (i.categoryId || UNCATEGORIZED) === filter);

  return (
    <div>
      {showFilters && filterOptions.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              filter === "all" ? "border-heritage-500 bg-heritage-500 text-white" : "border-charcoal/15 text-charcoal/70 hover:border-heritage-400"
            )}
          >
            All
          </button>
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                filter === opt.id ? "border-heritage-500 bg-heritage-500 text-white" : "border-charcoal/15 text-charcoal/70 hover:border-heritage-400"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((image, idx) => (
          <button
            key={image.id || image.url + idx}
            onClick={() => setLightboxIndex(idx)}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-md"
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent px-4 py-3">
              <p className="text-left text-sm font-medium text-white">{categoryName(image.categoryId)}</p>
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </div>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const image = images[index];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-4" role="dialog" aria-modal="true">
      <button onClick={onClose} className="absolute right-5 top-5 text-white/80 hover:text-white" aria-label="Close">
        <X size={28} />
      </button>

      {images.length > 1 && (
        <button
          onClick={() => onIndexChange((index - 1 + images.length) % images.length)}
          className="absolute left-3 text-white/80 hover:text-white sm:left-6"
          aria-label="Previous"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      <div className="relative h-[70vh] w-full max-w-4xl">
        <Image src={image.url} alt={image.alt} fill className="object-contain" sizes="100vw" />
      </div>

      {images.length > 1 && (
        <button
          onClick={() => onIndexChange((index + 1) % images.length)}
          className="absolute right-3 text-white/80 hover:text-white sm:right-6"
          aria-label="Next"
        >
          <ChevronRight size={32} />
        </button>
      )}

      <p className="absolute bottom-6 text-sm text-white/60">{image.alt}</p>
    </div>
  );
}
