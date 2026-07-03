import {
  Star,
  Mountain,
  Users,
  MapPin,
  Sparkles,
  Coffee,
  Heart,
  Briefcase,
  UtensilsCrossed,
  ParkingCircle,
  Clock,
  Home,
} from "lucide-react";

/**
 * Icon options for a Property Highlight badge. Keys are what gets stored in
 * `property_highlight.icon`; values are the matching lucide-react component.
 * Add new entries here to make them available in the admin icon picker —
 * nothing else needs to change.
 */
export const HIGHLIGHT_ICONS = {
  sparkles: Sparkles,
  star: Star,
  mountain: Mountain,
  users: Users,
  mapPin: MapPin,
  coffee: Coffee,
  heart: Heart,
  briefcase: Briefcase,
  utensils: UtensilsCrossed,
  parking: ParkingCircle,
  clock: Clock,
  home: Home,
} as const;

export type HighlightIconKey = keyof typeof HIGHLIGHT_ICONS;

export const HIGHLIGHT_ICON_OPTIONS: { value: HighlightIconKey; label: string }[] = [
  { value: "sparkles", label: "Sparkle (general highlight)" },
  { value: "star", label: "Star (best seller / rating)" },
  { value: "mountain", label: "Mountain (views / scenery)" },
  { value: "users", label: "Users (group / family)" },
  { value: "mapPin", label: "Location (nearby landmark)" },
  { value: "coffee", label: "Coffee (breakfast / dining)" },
  { value: "heart", label: "Heart (couples / romance)" },
  { value: "briefcase", label: "Briefcase (corporate / business)" },
  { value: "utensils", label: "Utensils (restaurant / meal plans)" },
  { value: "parking", label: "Parking" },
  { value: "clock", label: "Clock (24x7 / assistance)" },
  { value: "home", label: "Home (renovated / hospitality)" },
];

export const DEFAULT_HIGHLIGHT_ICON: HighlightIconKey = "sparkles";
