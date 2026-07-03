"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useEnquiryModal } from "@/components/providers/EnquiryModalProvider";
import { SITE_CONFIG } from "@/lib/constants";

export default function EnquireButtons({
  propertyId,
  propertyName,
  phone,
  whatsappNumber,
}: {
  propertyId?: string;
  propertyName?: string;
  phone?: string | null;
  whatsappNumber?: string | null;
}) {
  const { open } = useEnquiryModal();

  return (
    <div className="flex flex-col gap-3">
      <button onClick={() => open({ propertyId, propertyName })} className="btn-primary w-full">
        Enquire Now
      </button>
      <a
        href={`https://wa.me/${(whatsappNumber || SITE_CONFIG.whatsappNumber).replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp w-full"
      >
        <MessageCircle size={18} /> WhatsApp
      </a>
      <a href={`tel:${phone || SITE_CONFIG.supportPhone}`} className="btn-secondary w-full">
        <Phone size={18} /> Call Now
      </a>
    </div>
  );
}
