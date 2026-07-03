export const SITE_CONFIG = {
  name: "Heritage Heaven Hotels",
  shortName: "Heritage Heaven",
  description:
    "Premium, family-run mountain stays across Himachal Pradesh. Book direct with Heritage Heaven Hotels for the best rates and personal service.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://heritageheavenhotels.com",
  ogImage: "/og-image.jpg",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  supportEmail: "reservations@heritageheavenhotels.com",
  supportPhone: "+91-98765-43210",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Hotels", href: "/hotels" },
  { label: "Gallery", href: "/gallery" },
  { label: "Travel Agents", href: "/travel-agents" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  explore: [
    { label: "About Us", href: "/about" },
    { label: "Our Hotels", href: "/hotels" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  partners: [
    { label: "Travel Agents", href: "/travel-agents" },
    { label: "Meetings & Groups", href: "/travel-agents#groups" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/heritageheavenhotels" },
  { label: "Facebook", href: "https://facebook.com/heritageheavenhotels" },
];
