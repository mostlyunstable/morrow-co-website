"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "@/data/agency";

export function FaqAccordion({ limit }: { limit?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = limit ? FAQS.slice(0, limit) : FAQS;

  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.q} className="py-5">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 text-left"
            >
              <span className="text-[16px] font-medium tracking-[-0.015em] text-black sm:text-[18px]">
                {item.q}
              </span>
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                  isOpen
                    ? "rotate-45 border-[#3b82f6] bg-[#3b82f6] text-white"
                    : "border-black/15 bg-[#f7f8fa] text-black"
                }`}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] pt-3 opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl text-[14.5px] leading-relaxed text-zinc-600">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
