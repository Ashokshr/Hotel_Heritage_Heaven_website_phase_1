"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEnquiryModal } from "@/components/providers/EnquiryModalProvider";

export default function Hero({
  image,
  eyebrow,
  title,
  subtitle,
  showButtons = true,
  primaryLabel = "Our Properties",
  primaryHref = "/#properties",
  height = "full",
}: {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  showButtons?: boolean;
  primaryLabel?: string;
  primaryHref?: string;
  height?: "full" | "tall";
}) {
  const { open } = useEnquiryModal();

  return (
    <section className={height === "full" ? "relative h-[100svh] min-h-[560px] w-full" : "relative h-[60vh] min-h-[420px] w-full"}>
      <Image src={image} alt={title} fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/20" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {eyebrow && (
          <p className="fade-up text-xs font-semibold uppercase tracking-[0.3em] text-heritage-200">
            {eyebrow}
          </p>
        )}
        <h1 className="fade-up mt-4 max-w-4xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl" style={{ animationDelay: "0.1s" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="fade-up mt-5 max-w-xl text-base text-white/85 sm:text-lg" style={{ animationDelay: "0.2s" }}>
            {subtitle}
          </p>
        )}

        {showButtons && (
          <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.3s" }}>
            <Link href={primaryHref} className="btn-primary min-w-[180px]">
              {primaryLabel}
            </Link>
            <button onClick={() => open()} className="btn-secondary min-w-[180px] bg-transparent border-white/40 text-white hover:border-white">
              Enquire Now
            </button>
          </div>
        )}
      </div>

      {height === "full" && (
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/70">
          <ChevronDown size={28} />
        </div>
      )}
    </section>
  );
}
