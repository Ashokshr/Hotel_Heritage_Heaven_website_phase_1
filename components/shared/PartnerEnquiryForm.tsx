"use client";

import { useState, useTransition } from "react";
import { Loader2, Send } from "lucide-react";
import { submitPartnerEnquiry } from "@/lib/actions/enquiry";

export default function PartnerEnquiryForm({
  defaultType = "travel_agent",
}: {
  defaultType?: "travel_agent" | "group" | "wedding" | "corporate";
}) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitPartnerEnquiry({
        enquiryType: (String(formData.get("enquiryType") || defaultType) as typeof defaultType),
        companyName: String(formData.get("companyName") || "") || undefined,
        contactName: String(formData.get("contactName") || ""),
        phone: String(formData.get("phone") || ""),
        email: String(formData.get("email") || "") || undefined,
        city: String(formData.get("city") || "") || undefined,
        message: String(formData.get("message") || "") || undefined,
      });
      setStatus(result.ok ? "success" : "error");
    });
  }

  if (status === "success") {
    return (
      <div className="rounded-md bg-forest-500/10 p-6 text-center">
        <p className="font-medium text-forest-600">Thank you for reaching out.</p>
        <p className="mt-1 text-sm text-charcoal/60">Our partnerships team will contact you within 1 business day.</p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="enquiryType" value={defaultType} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Company / Agency Name</label>
          <input name="companyName" className="w-full rounded-sm border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Contact Person</label>
          <input name="contactName" required className="w-full rounded-sm border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Phone Number</label>
          <input name="phone" type="tel" required className="w-full rounded-sm border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Email</label>
          <input name="email" type="email" className="w-full rounded-sm border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal/80">City</label>
        <input name="city" className="w-full rounded-sm border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Tell us about your requirement</label>
        <textarea name="message" rows={4} className="w-full rounded-sm border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400" />
      </div>
      {status === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={isPending} className="btn-primary w-full sm:w-auto">
        {isPending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        {isPending ? "Sending..." : "Become Our Partner"}
      </button>
    </form>
  );
}
