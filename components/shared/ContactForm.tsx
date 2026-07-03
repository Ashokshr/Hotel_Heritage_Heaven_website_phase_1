"use client";

import { useState, useTransition } from "react";
import { Loader2, Send } from "lucide-react";
import { submitEnquiry } from "@/lib/actions/enquiry";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitEnquiry({
        name: String(formData.get("name") || ""),
        phone: String(formData.get("phone") || ""),
        email: String(formData.get("email") || "") || undefined,
        propertyName: "Heritage Heaven Hotels — Contact Form",
        specialRequest: String(formData.get("message") || ""),
      });
      setStatus(result.ok ? "success" : "error");
    });
  }

  if (status === "success") {
    return (
      <div className="rounded-md bg-forest-500/10 p-6 text-center">
        <p className="font-medium text-forest-600">Thank you — we&apos;ve received your message.</p>
        <p className="mt-1 text-sm text-charcoal/60">Our team will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Full Name</label>
          <input name="name" required className="w-full rounded-sm border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Phone Number</label>
          <input name="phone" type="tel" required className="w-full rounded-sm border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Email</label>
        <input name="email" type="email" className="w-full rounded-sm border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Message</label>
        <textarea name="message" rows={4} required className="w-full rounded-sm border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400" />
      </div>
      {status === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={isPending} className="btn-primary w-full sm:w-auto">
        {isPending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
