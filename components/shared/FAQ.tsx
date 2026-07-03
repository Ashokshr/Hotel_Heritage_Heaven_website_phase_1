"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ as FAQItem } from "@/lib/types";

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-base font-medium text-charcoal">{item.question}</span>
              <ChevronDown
                size={18}
                className={cn("shrink-0 text-heritage-500 transition-transform", isOpen && "rotate-180")}
              />
            </button>
            <div className={cn("grid overflow-hidden transition-all duration-300", isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]")}>
              <p className="overflow-hidden text-sm leading-relaxed text-charcoal/65">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
