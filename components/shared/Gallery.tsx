"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/types";

export default function Gallery({ images, showFilters = true }: { images: GalleryImage[]; showFilters?: boolean }) {
  const categories = useMemo(() => {
    const set = new Set(images.map((i) => i.category || "other"));
    return ["all", ...Array.from(set)];
  }, [images]);

  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filter === "all" ? images : images.filter((i) => (i.category || "other") === filter);

  return (
    <div>
      {showFilters && categories.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm capitalize transition-colors",
                filter === c
                  ? "border-heritage-500 bg-heritage-500 text-white"
                  : "border-charcoal/15 text-charcoal/70 hover:border-heritage-400"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {filtered.map((image, idx) => (
          <button
            key={image.url + idx}
            onClick={() => setLightboxIndex(idx)}
            className="block w-full overflow-hidden rounded-md break-inside-avoid"
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={600}
              height={idx % 3 === 0 ? 750 : 450}
              className="w-full object-cover transition-transform duration-500 hover:scale-105"
            />
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
