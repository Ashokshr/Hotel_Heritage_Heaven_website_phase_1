import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { FOOTER_LINKS, SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream-100">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div>
          <p className="font-serif text-2xl text-white">Heritage Heaven</p>
          <p className="text-xs uppercase tracking-[0.3em] text-heritage-300">Hotels</p>
          <p className="mt-4 max-w-xs text-sm text-cream-100/70">
            Premium, family-run mountain stays across Himachal Pradesh. Book direct for the best rates
            and a warmer welcome.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com/heritageheavenhotels" aria-label="Instagram" className="rounded-full border border-white/15 p-2 hover:border-heritage-300 hover:text-heritage-300">
              <Instagram size={16} />
            </a>
            <a href="https://facebook.com/heritageheavenhotels" aria-label="Facebook" className="rounded-full border border-white/15 p-2 hover:border-heritage-300 hover:text-heritage-300">
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Explore</p>
          <ul className="space-y-2.5">
            {FOOTER_LINKS.explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-cream-100/70 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Partners</p>
          <ul className="space-y-2.5">
            {FOOTER_LINKS.partners.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-cream-100/70 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mb-4 mt-6 text-sm font-semibold uppercase tracking-wide text-white">Legal</p>
          <ul className="space-y-2.5">
            {FOOTER_LINKS.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-cream-100/70 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Get in Touch</p>
          <ul className="space-y-3 text-sm text-cream-100/70">
            <li className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-heritage-300" />
              McLeod Ganj, Dharamshala, Himachal Pradesh
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-heritage-300" />
              <a href={`tel:${SITE_CONFIG.supportPhone}`}>{SITE_CONFIG.supportPhone}</a>
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-heritage-300" />
              <a href={`mailto:${SITE_CONFIG.supportEmail}`}>{SITE_CONFIG.supportEmail}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-6 text-xs text-cream-100/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Heritage Heaven Hotels. All rights reserved.</p>
          <Link href="/admin/login" className="hover:text-cream-100/80">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
