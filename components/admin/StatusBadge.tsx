import { cn } from "@/lib/utils";
import type { EnquiryStatus } from "@/lib/types";

const STYLES: Record<EnquiryStatus, string> = {
  new: "bg-blue-50 text-blue-700",
  contacted: "bg-amber-50 text-amber-700",
  confirmed: "bg-emerald-50 text-emerald-700",
  closed: "bg-charcoal/10 text-charcoal/60",
};

export default function StatusBadge({ status }: { status: EnquiryStatus }) {
  return (
    <span className={cn("inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize", STYLES[status])}>
      {status}
    </span>
  );
}
