"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAdmin } from "@/lib/actions/admin-auth";

const LINKS = [
  { href: "/admin/dashboard", label: "Enquiries", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-charcoal/10 bg-white">
      <div className="border-b border-charcoal/10 px-6 py-6">
        <p className="font-serif text-lg text-charcoal">Heritage Heaven</p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-heritage-500">Admin Panel</p>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {LINKS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
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
    </aside>
  );
}
