"use client";

import { useState, useTransition } from "react";
import { Download } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { updateEnquiryStatus } from "@/lib/actions/admin-enquiries";
import { formatDate } from "@/lib/utils";
import type { Enquiry, EnquiryStatus } from "@/lib/types";

const STATUS_OPTIONS: EnquiryStatus[] = ["new", "contacted", "confirmed", "closed"];

export default function EnquiriesTable({ enquiries }: { enquiries: Enquiry[] }) {
  const [statusFilter, setStatusFilter] = useState<EnquiryStatus | "all">("all");
  const [items, setItems] = useState(enquiries);
  const [, startTransition] = useTransition();

  const filtered = statusFilter === "all" ? items : items.filter((e) => e.status === statusFilter);

  function handleStatusChange(id: string, status: EnquiryStatus) {
    setItems((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    startTransition(() => updateEnquiryStatus(id, status));
  }

  function exportCSV() {
    const headers = ["Name", "Phone", "Email", "Property", "Check-in", "Check-out", "Rooms", "Guests", "Status", "Received"];
    const rows = filtered.map((e) => [
      e.name,
      e.phone,
      e.email || "",
      e.property_name || "",
      e.check_in || "",
      e.check_out || "",
      String(e.rooms),
      String(e.guests),
      e.status,
      e.created_at,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(["all", ...STATUS_OPTIONS] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full border px-3.5 py-1.5 text-xs capitalize transition-colors ${
                statusFilter === s ? "border-heritage-500 bg-heritage-500 text-white" : "border-charcoal/15 text-charcoal/60 hover:border-heritage-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button onClick={exportCSV} className="btn-secondary text-sm">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-md bg-white shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-charcoal/10 bg-cream-50 text-xs uppercase tracking-wide text-charcoal/50">
            <tr>
              <th className="px-4 py-3">Guest</th>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Dates</th>
              <th className="px-4 py-3">Rooms/Guests</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-charcoal/50">
                  No enquiries yet.
                </td>
              </tr>
            )}
            {filtered.map((e) => (
              <tr key={e.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-charcoal">{e.name}</p>
                  <p className="text-xs text-charcoal/50">{e.phone}</p>
                  {e.email && <p className="text-xs text-charcoal/50">{e.email}</p>}
                </td>
                <td className="px-4 py-3 text-charcoal/75">{e.property_name || "—"}</td>
                <td className="px-4 py-3 text-charcoal/75">
                  {e.check_in ? formatDate(e.check_in) : "—"} → {e.check_out ? formatDate(e.check_out) : "—"}
                </td>
                <td className="px-4 py-3 text-charcoal/75">
                  {e.rooms} room{e.rooms !== 1 ? "s" : ""} · {e.guests} guest{e.guests !== 1 ? "s" : ""}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={e.status}
                    onChange={(ev) => handleStatusChange(e.id, ev.target.value as EnquiryStatus)}
                    className="rounded-sm border border-charcoal/15 bg-white px-2 py-1 text-xs"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="mt-1">
                    <StatusBadge status={e.status} />
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-charcoal/50">{formatDate(e.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
