"use client";

import { useState, useTransition } from "react";
import { X, Loader2, MessageCircle } from "lucide-react";
import { submitEnquiry } from "@/lib/actions/enquiry";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  propertyId?: string;
  propertyName?: string;
}

export default function EnquiryModal({ isOpen, onClose, propertyId, propertyName }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await submitEnquiry({
        name: String(formData.get("name") || ""),
        phone: String(formData.get("phone") || ""),
        email: String(formData.get("email") || "") || undefined,
        propertyId,
        propertyName: propertyName || "Heritage Heaven Hotels — General Enquiry",
        checkIn: String(formData.get("checkIn") || "") || undefined,
        checkOut: String(formData.get("checkOut") || "") || undefined,
        rooms: Number(formData.get("rooms") || 1),
        guests: Number(formData.get("guests") || 2),
        specialRequest: String(formData.get("specialRequest") || "") || undefined,
      });

      if (!result.ok) {
        setError(result.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      if (result.whatsappLink) {
        window.open(result.whatsappLink, "_blank", "noopener,noreferrer");
      }
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-charcoal/50 backdrop-blur-sm sm:items-center animate-fadeIn" role="dialog" aria-modal="true">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 shadow-elevated sm:rounded-2xl sm:p-8">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="eyebrow">Enquire Now</p>
            <h3 className="mt-1 text-2xl font-serif text-charcoal">
              {propertyName || "Plan your stay"}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-charcoal/60 hover:bg-cream-100 hover:text-charcoal"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
              <MessageCircle size={28} />
            </div>
            <p className="text-lg font-medium text-charcoal">Thank you, your enquiry is on its way.</p>
            <p className="mt-2 text-sm text-charcoal/70">
              We&apos;ve saved your details and opened WhatsApp with a prefilled message — just hit send.
              If it didn&apos;t open,{" "}
              <button
                className="underline"
                onClick={() => window.location.reload()}
              >
                try again
              </button>
              .
            </p>
            <button onClick={onClose} className="btn-secondary mt-6">
              Close
            </button>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Full Name" name="name" required placeholder="Your name" />
              <Field label="Phone Number" name="phone" required type="tel" placeholder="+91 98765 43210" />
            </div>
            <Field label="Email (optional)" name="email" type="email" placeholder="you@example.com" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Check-in" name="checkIn" type="date" />
              <Field label="Check-out" name="checkOut" type="date" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Rooms" name="rooms" type="number" defaultValue={1} min={1} />
              <Field label="Guests" name="guests" type="number" defaultValue={2} min={1} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal/80">Special Request</label>
              <textarea
                name="specialRequest"
                rows={3}
                placeholder="Anniversary, early check-in, airport pickup..."
                className="w-full rounded-sm border border-charcoal/15 bg-cream-50 px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button type="submit" disabled={isPending} className="btn-whatsapp w-full">
              {isPending ? <Loader2 className="animate-spin" size={18} /> : <MessageCircle size={18} />}
              {isPending ? "Sending..." : "Send Enquiry on WhatsApp"}
            </button>
            <p className="text-center text-xs text-charcoal/50">
              We&apos;ll save your details and open WhatsApp with your enquiry ready to send.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  min?: number;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-charcoal/80">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        min={min}
        className="w-full rounded-sm border border-charcoal/15 bg-cream-50 px-3.5 py-2.5 text-sm outline-none focus:border-heritage-400"
      />
    </div>
  );
}
