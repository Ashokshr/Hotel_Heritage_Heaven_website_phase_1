import {
  Compass,
  Leaf,
  Users,
  Wallet,
  Mountain,
  HeartHandshake,
  ShieldCheck,
  Star,
  Sparkles,
  MapPin,
  Home,
  Clock,
} from "lucide-react";

/**
 * Icon options for the Home page's About "values" and Why Choose Us cards.
 * Keys are what gets stored in HomeInfoCard.icon; values are the matching
 * lucide-react component. Add new entries here to make them available in
 * the admin icon picker — nothing else needs to change.
 */
export const ICON_MAP = {
  compass: Compass,
  leaf: Leaf,
  users: Users,
  wallet: Wallet,
  mountain: Mountain,
  heartHandshake: HeartHandshake,
  shieldCheck: ShieldCheck,
  star: Star,
  sparkles: Sparkles,
  mapPin: MapPin,
  home: Home,
  clock: Clock,
} as const;

export type IconKey = keyof typeof ICON_MAP;

export const ICON_OPTIONS: { value: IconKey; label: string }[] = [
  { value: "compass", label: "Compass (vision / direction)" },
  { value: "leaf", label: "Leaf (mission / nature)" },
  { value: "users", label: "Users (people / philosophy)" },
  { value: "wallet", label: "Wallet (rates / value)" },
  { value: "mountain", label: "Mountain (location / views)" },
  { value: "heartHandshake", label: "Handshake (hospitality / trust)" },
  { value: "shieldCheck", label: "Shield (trusted / transparent)" },
  { value: "star", label: "Star (quality / rating)" },
  { value: "sparkles", label: "Sparkle (general highlight)" },
  { value: "mapPin", label: "Location pin" },
  { value: "home", label: "Home (comfort / stay)" },
  { value: "clock", label: "Clock (responsiveness / 24x7)" },
];

export const DEFAULT_ICON: IconKey = "sparkles";
