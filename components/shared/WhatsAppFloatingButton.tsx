"use client";

import { MessageCircle } from "lucide-react";
import { useEnquiryModal } from "@/components/providers/EnquiryModalProvider";

export default function WhatsAppFloatingButton() {
  const { open } = useEnquiryModal();

  return (
    <button
      onClick={() => open()}
      aria-label="Enquire on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated transition-transform hover:scale-105"
    >
      <MessageCircle size={26} />
    </button>
  );
}
