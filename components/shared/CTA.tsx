"use client";

import Link from "next/link";
import { useEnquiryModal } from "@/components/providers/EnquiryModalProvider";

export default function CTA({
  eyebrow,
  title,
  description,
  primaryLabel = "Enquire Now",
  secondaryLabel,
  secondaryHref,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  const { open } = useEnquiryModal();

  return (
    <section className="section-padding bg-charcoal">
      <div className="container-site flex flex-col items-center gap-6 text-center">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.25em] text-heritage-300">{eyebrow}</p>}
        <h2 className="max-w-2xl text-3xl text-white sm:text-4xl">{title}</h2>
        {description && <p className="max-w-xl text-white/70">{description}</p>}
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <button onClick={() => open()} className="btn-primary min-w-[200px]">
            {primaryLabel}
          </button>
          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref} className="btn-secondary min-w-[200px] bg-transparent border-white/30 text-white hover:border-white">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
