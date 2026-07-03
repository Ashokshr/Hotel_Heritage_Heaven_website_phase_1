"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, MessageSquareQuote, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAdmin } from "@/lib/actions/admin-auth";

const LINKS = [
  { href: "/admin/dashboard", label: "Enquiries", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/reviews", label: "Guest Reviews", icon: MessageSquareQuote },
];

function SidebarContent({ pathname, onNavigate }: { pathname: string | null; onNavigate?: () => void }) {
  return (
    <>
      <div className="border-b border-charcoal/10 px-6 py-6">
        <p className="font-serif text-lg text-charcoal">Heritage Heaven</p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-heritage-500">Admin Panel</p>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {LINKS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
              pathname?.startsWith(href) ? "bg-heritage-500 text-white" : "text-charcoal/70 hover:bg-cream-100"
            )}
          >
            <Icon size={17} /> {label}
          </Link>
        ))}
      </nav>
      <form action={logoutAdmin} className="border-t border-charcoal/10 p-3">
        <button type="submit" className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-charcoal/70 hover:bg-cream-100">
          <LogOut size={17} /> Log Out
        </button>
      </form>
    </>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-charcoal/10 bg-white px-4 py-3 lg:hidden">
        <div>
          <p className="font-serif text-base text-charcoal">Heritage Heaven</p>
          <p className="text-[9px] uppercase tracking-[0.25em] text-heritage-500">Admin Panel</p>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open admin menu"
          className="rounded-sm p-2 text-charcoal/70 hover:bg-cream-100"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[80vw] flex-col bg-white shadow-elevated">
            <div className="flex items-center justify-end px-3 pt-3">
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close admin menu"
                className="rounded-sm p-2 text-charcoal/60 hover:bg-cream-100"
              >
                <X size={20} />
              </button>
            </div>
            <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-charcoal/10 bg-white lg:flex">
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  );
}
