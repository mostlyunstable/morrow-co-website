"use client";

import { useCurrency } from "@/context/currency-context";

export function CurrencyToggle({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { currency, setCurrency } = useCurrency();

  const shell =
    tone === "dark"
      ? "border-white/15 bg-white/[0.04] text-zinc-400"
      : "border-black/15 bg-black/[0.04] text-zinc-600";

  const active =
    tone === "dark"
      ? "bg-white text-black"
      : "bg-black text-white";

  return (
    <div
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-[3px] border p-0.5 font-mono text-[11px] uppercase tracking-wider ${shell}`}
      role="group"
      aria-label="Select pricing currency"
    >
      <button
        type="button"
        onClick={() => setCurrency("USD")}
        className={`whitespace-nowrap rounded-[2px] px-2.5 py-1 transition-colors ${
          currency === "USD" ? active : "hover:text-current"
        }`}
      >
        USD $
      </button>
      <button
        type="button"
        onClick={() => setCurrency("INR")}
        className={`whitespace-nowrap rounded-[2px] px-2.5 py-1 transition-colors ${
          currency === "INR" ? active : "hover:text-current"
        }`}
      >
        INR ₹
      </button>
    </div>
  );
}
