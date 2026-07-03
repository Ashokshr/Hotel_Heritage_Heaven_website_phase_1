"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import EnquiryModal from "@/components/shared/EnquiryModal";

interface EnquiryModalContext {
  open: (opts?: { propertyId?: string; propertyName?: string }) => void;
  close: () => void;
}

const Ctx = createContext<EnquiryModalContext | null>(null);

export function EnquiryModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<{ propertyId?: string; propertyName?: string }>({});

  const open = useCallback((opts?: { propertyId?: string; propertyName?: string }) => {
    setPrefill(opts || {});
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <EnquiryModal isOpen={isOpen} onClose={close} propertyId={prefill.propertyId} propertyName={prefill.propertyName} />
    </Ctx.Provider>
  );
}

export function useEnquiryModal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useEnquiryModal must be used within EnquiryModalProvider");
  return ctx;
}
