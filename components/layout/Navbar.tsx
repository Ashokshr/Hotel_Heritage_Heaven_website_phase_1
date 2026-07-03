"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useEnquiryModal } from "@/components/providers/EnquiryModalProvider";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useEnquiryModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome || mobileOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "bg-cream-50/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="container-site flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/heritage-heaven-emblem.png"
            alt="Heritage Heaven Hotels crest"
            width={64}
            height={64}
            className="h-12 w-12 shrink-0 sm:h-14 sm:w-14"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span
              className={cn(
                "font-serif text-xl tracking-wide sm:text-2xl",
                solid ? "text-charcoal" : "text-white"
              )}
            >
              Heritage Heaven
            </span>
            <span
              className={cn(
                "text-[10px] uppercase tracking-[0.3em]",
                solid ? "text-heritage-500" : "text-cream-100"
              )}
            >
              Hotels
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                solid ? "text-charcoal/80 hover:text-heritage-500" : "text-white/90 hover:text-white",
                pathname === link.href && (solid ? "text-heritage-500" : "text-white")
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${SITE_CONFIG.supportPhone}`} className={cn("text-sm font-medium", solid ? "text-charcoal/80" : "text-white/90")}>
            {SITE_CONFIG.supportPhone}
          </a>
          <button onClick={() => open()} className="btn-primary">
            Enquire Now
          </button>
        </div>

        <button
          className={cn("p-2 lg:hidden", solid ? "text-charcoal" : "text-white")}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-charcoal/10 bg-cream-50 lg:hidden">
          <nav className="container-site flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-2 py-3 text-base font-medium text-charcoal/85 hover:bg-cream-100"
              >
                {link.label}
              </Link>
            ))}
            <button onClick={() => open()} className="btn-primary mt-2 w-full">
              Enquire Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
