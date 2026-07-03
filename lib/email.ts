import "server-only";
import { Resend } from "resend";
import type { EnquiryFormInput, PartnerEnquiryFormInput } from "@/lib/types";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "reservations@heritageheavenhotels.com";
const FROM_EMAIL = process.env.EMAIL_FROM || "Heritage Heaven Hotels <onboarding@resend.dev>";

/**
 * Sends an admin notification email for a new enquiry. If RESEND_API_KEY
 * isn't configured yet, logs to the server console instead of throwing —
 * the enquiry is still saved to the database either way.
 */
export async function sendEnquiryNotification(input: EnquiryFormInput) {
  const subject = `New enquiry: ${input.propertyName || "General"} — ${input.name}`;
  const html = `
    <h2>New website enquiry</h2>
    <p><strong>Property:</strong> ${input.propertyName || "Not specified"}</p>
    <p><strong>Name:</strong> ${input.name}</p>
    <p><strong>Phone:</strong> ${input.phone}</p>
    <p><strong>Email:</strong> ${input.email || "-"}</p>
    <p><strong>Check-in:</strong> ${input.checkIn || "-"}</p>
    <p><strong>Check-out:</strong> ${input.checkOut || "-"}</p>
    <p><strong>Rooms:</strong> ${input.rooms ?? 1}</p>
    <p><strong>Guests:</strong> ${input.guests ?? 2}</p>
    <p><strong>Special Request:</strong> ${input.specialRequest || "None"}</p>
  `;

  if (!resend) {
    console.log("[email] RESEND_API_KEY not set — skipping send. Enquiry:", { subject, input });
    return { skipped: true };
  }

  return resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject,
    html,
    replyTo: input.email || undefined,
  });
}

export async function sendPartnerEnquiryNotification(input: PartnerEnquiryFormInput) {
  const subject = `New partner enquiry: ${input.companyName || input.contactName}`;
  const html = `
    <h2>New travel agent / group enquiry</h2>
    <p><strong>Type:</strong> ${input.enquiryType || "travel_agent"}</p>
    <p><strong>Company:</strong> ${input.companyName || "-"}</p>
    <p><strong>Contact:</strong> ${input.contactName}</p>
    <p><strong>Phone:</strong> ${input.phone}</p>
    <p><strong>Email:</strong> ${input.email || "-"}</p>
    <p><strong>City:</strong> ${input.city || "-"}</p>
    <p><strong>Message:</strong> ${input.message || "-"}</p>
  `;

  if (!resend) {
    console.log("[email] RESEND_API_KEY not set — skipping send. Partner enquiry:", { subject, input });
    return { skipped: true };
  }

  return resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject,
    html,
    replyTo: input.email || undefined,
  });
}
