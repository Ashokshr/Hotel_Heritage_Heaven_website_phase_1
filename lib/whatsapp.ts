import { SITE_CONFIG } from "@/lib/constants";
import type { EnquiryFormInput } from "@/lib/types";

/**
 * Builds a wa.me deep link with a prefilled enquiry message.
 * Works on both mobile (opens the WhatsApp app) and desktop (opens
 * WhatsApp Web) because wa.me handles the redirect automatically.
 */
export function buildWhatsAppLink(input: EnquiryFormInput, whatsappNumber?: string) {
  const number = (whatsappNumber || SITE_CONFIG.whatsappNumber).replace(/\D/g, "");

  const lines = [
    "Hello Heritage Heaven,",
    "",
    "I would like to enquire about:",
    "",
    `Property: ${input.propertyName || "Not specified"}`,
    `Check-in: ${input.checkIn || "-"}`,
    `Check-out: ${input.checkOut || "-"}`,
    `Rooms: ${input.rooms ?? 1}`,
    `Guests: ${input.guests ?? 2}`,
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Special Requests: ${input.specialRequest || "None"}`,
  ];

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${number}?text=${text}`;
}
