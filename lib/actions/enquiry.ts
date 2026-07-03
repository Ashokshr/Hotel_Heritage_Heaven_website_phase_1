"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { sendEnquiryNotification, sendPartnerEnquiryNotification } from "@/lib/email";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { EnquiryFormInput, PartnerEnquiryFormInput } from "@/lib/types";

/**
 * Enquiry flow (per PRD):
 *  1. Guest fills the popup (name, phone, dates, rooms, guests, request)
 *  2. We store it in Supabase
 *  3. We email the admin
 *  4. We return a wa.me link with the message prefilled so the client can
 *     redirect the browser to WhatsApp (must happen client-side — a server
 *     action can't open a new tab).
 */
export async function submitEnquiry(input: EnquiryFormInput) {
  if (!input.name?.trim() || !input.phone?.trim()) {
    return { ok: false, error: "Name and phone are required.", whatsappLink: null };
  }

  try {
    const admin = createAdminClient();
    const client = admin ?? (await createClient());

    if (client) {
      await client.from("enquiries").insert({
        name: input.name,
        phone: input.phone,
        email: input.email || null,
        property_id: input.propertyId || null,
        property_name: input.propertyName || null,
        check_in: input.checkIn || null,
        check_out: input.checkOut || null,
        rooms: input.rooms ?? 1,
        guests: input.guests ?? 2,
        special_request: input.specialRequest || null,
        source: "website",
        status: "new",
      });
    } else {
      console.log("[enquiry] Supabase not configured — enquiry not persisted:", input);
    }
  } catch (err) {
    console.error("[enquiry] Failed to save enquiry", err);
    // Continue — we still want the guest to reach WhatsApp even if the DB write failed.
  }

  try {
    await sendEnquiryNotification(input);
  } catch (err) {
    console.error("[enquiry] Failed to send admin email", err);
  }

  return { ok: true, error: null, whatsappLink: buildWhatsAppLink(input) };
}

export async function submitPartnerEnquiry(input: PartnerEnquiryFormInput) {
  if (!input.contactName?.trim() || !input.phone?.trim()) {
    return { ok: false, error: "Contact name and phone are required." };
  }

  try {
    const admin = createAdminClient();
    const client = admin ?? (await createClient());

    if (client) {
      await client.from("partner_enquiries").insert({
        enquiry_type: input.enquiryType || "travel_agent",
        company_name: input.companyName || null,
        contact_name: input.contactName,
        phone: input.phone,
        email: input.email || null,
        city: input.city || null,
        message: input.message || null,
        status: "new",
      });
    } else {
      console.log("[partner-enquiry] Supabase not configured — not persisted:", input);
    }
  } catch (err) {
    console.error("[partner-enquiry] Failed to save enquiry", err);
  }

  try {
    await sendPartnerEnquiryNotification(input);
  } catch (err) {
    console.error("[partner-enquiry] Failed to send admin email", err);
  }

  return { ok: true, error: null };
}
