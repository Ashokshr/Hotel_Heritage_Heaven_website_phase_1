"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatingButton from "@/components/shared/WhatsAppFloatingButton";

/**
 * The /admin section has its own dashboard chrome (sidebar, top bar) — this
 * keeps the public Navbar/Footer/WhatsApp button out of admin pages without
 * needing a second Next.js root layout.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
