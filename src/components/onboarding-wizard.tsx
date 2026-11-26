"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { SERVICES, type ServiceSlug } from "@/data/agency";
import { useCurrency } from "@/context/currency-context";
import { CurrencyToggle } from "./currency-toggle";

interface DropdownOption {
  value: string;
  label: string;
}

const BUILD_OPTIONS: DropdownOption[] = [
  ...SERVICES.map((s) => ({ value: s.slug, label: s.title })),
  { value: "not-sure", label: "Not sure yet — help me scope" },
];

const TIMELINE_OPTIONS: DropdownOption[] = [
  { value: "asap", label: "As soon as possible (1–2 weeks)" },
  { value: "1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "exploring", label: "Just exploring" },
];

const BUDGET_OPTIONS = {
  USD: [
    { value: "$650–$1,500", label: "$650 – $1,500" },
    { value: "$1,500–$3,500", label: "$1,500 – $3,500" },
    { value: "$3,500–$8,000", label: "$3,500 – $8,000" },
    { value: "$8,000+", label: "$8,000+" },
  ],
  INR: [
    { value: "₹45k–₹1L", label: "₹45,000 – ₹1,00,000" },
    { value: "₹1L–₹2.5L", label: "₹1,00,000 – ₹2,50,000" },
    { value: "₹2.5L–₹6L", label: "₹2,50,000 – ₹6,00,000" },
    { value: "₹6L+", label: "₹6,00,000+" },
  ],
} as const;

function CustomSelect({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  options: readonly DropdownOption[];
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const selected = options.find((o) => o.value === value);

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const idx = Math.max(
      0,
      options.findIndex((o) => o.value === value)
    );
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
      } else {
        const next = options[(idx + 1) % options.length];
        if (next) onChange(next.value);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
      } else {
        const prev = options[(idx - 1 + options.length) % options.length];
        if (prev) onChange(prev.value);
      }
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <label
        htmlFor={id}
        className="block font-mono text-[10.5px] uppercase tracking-[0.14em] text-zinc-400"
      >
        {label}
      </label>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onKeyDown={handleTriggerKeyDown}
        onClick={() => setOpen((prev) => !prev)}
        className={`mt-2 flex min-h-[44px] w-full items-center justify-between gap-2 rounded-[2px] border bg-[#0b0d11] px-3.5 py-2.5 text-left text-[16px] transition-colors sm:text-[13.5px] ${
          open
            ? "border-[#4483e8] text-white"
            : "border-white/14 text-zinc-200 hover:border-white/30"
        }`}
      >
        <span className={`truncate ${selected ? "text-white" : "text-zinc-500"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
            open ? "rotate-180 text-[#4483e8]" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-30 mt-1 max-h-60 overflow-auto rounded-[2px] border border-white/18 bg-[#0b0d11] py-1 shadow-[0_18px_40px_rgba(0,0,0,0.85)]"
        >
          {options.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`block w-full px-3.5 py-2.5 text-left text-[13.5px] transition-colors ${
                    active
                      ? "bg-[#4483e8]/18 text-[#93c5fd]"
                      : "text-zinc-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function OnboardingWizard() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") as ServiceSlug | null;
  const validInitial = SERVICES.some((s) => s.slug === initialService)
    ? (initialService as ServiceSlug)
    : "automation";

  return <OnboardingWizardForm key={validInitial} initialService={validInitial} />;
}

function OnboardingWizardForm({
  initialService,
}: {
  initialService: ServiceSlug;
}) {
  const { currency } = useCurrency();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [websiteTrap, setWebsiteTrap] = useState("");
  const [service, setService] = useState<string>(initialService);
  const [timeline, setTimeline] = useState<string>("1-month");
  const [budgetIndex, setBudgetIndex] = useState<number>(1);
  const [problem, setProblem] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{
    ticketId: string;
    serviceTitle: string;
  } | null>(null);

  const budgetList = BUDGET_OPTIONS[currency];
  const selectedBudget = budgetList[budgetIndex] ?? budgetList[1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          market: currency === "INR" ? "india" : "international",
          budget: selectedBudget.label,
          timeline,
          problem,
          name,
          email,
          company: company || website,
          websiteTrap,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Please check the required fields.");
        setSubmitting(false);
        return;
      }

      const selectedTitle =
        BUILD_OPTIONS.find((s) => s.value === service)?.label ??
        "Custom Solution";
      setSubmitted({ ticketId: data.ticketId, serviceTitle: selectedTitle });
    } catch {
      setError("Network error while submitting. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[2px] border border-white/14 bg-[#07080b] p-8 text-white sm:p-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#4483e8]/45 bg-[#4483e8]/15 text-[#60a5fa]">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#60a5fa]">
          BRIEF LOGGED · TICKET {submitted.ticketId}
        </p>
        <h2 className="mt-3 text-3xl font-medium tracking-[-0.03em] text-white">
          We&apos;ve got your problem statement.
        </h2>
        <p className="mt-4 text-[14.5px] leading-relaxed text-zinc-300">
          Thanks, <span className="text-white">{name}</span>. Our engineering
          lead is reviewing your brief for{" "}
          <span className="text-white">{submitted.serviceTitle}</span> (
          {selectedBudget.label}). Expect a concrete architecture note and
          call link at{" "}
          <span className="font-mono text-[13px] text-[#93c5fd]">{email}</span>{" "}
          within 24 hours.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setSubmitted(null);
              setProblem("");
            }}
            className="rounded-[2px] border border-white/20 bg-white/[0.04] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:border-white/45"
          >
            Submit another brief
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2px] border border-white/14 bg-[#07080b] p-6 sm:p-8"
    >
      {/* Clean top metadata row */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-zinc-400">
          PROJECT BRIEF · {currency === "INR" ? "INDIA (INR / GST)" : "GLOBAL (USD)"}
        </span>
        <CurrencyToggle tone="dark" />
      </div>

      {/* Row 1: Name & Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="fullName"
            className="block font-mono text-[10.5px] uppercase tracking-[0.14em] text-zinc-400"
          >
            FULL NAME
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mt-2 min-h-[44px] w-full rounded-[2px] border border-white/14 bg-[#0b0d11] px-3.5 py-2.5 text-[16px] text-white placeholder:text-zinc-600 focus:border-[#4483e8] focus:outline-none sm:text-[13.5px]"
          />
        </div>

        <div>
          <label
            htmlFor="workEmail"
            className="block font-mono text-[10.5px] uppercase tracking-[0.14em] text-zinc-400"
          >
            WORK EMAIL
          </label>
          <input
            id="workEmail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="mt-2 min-h-[44px] w-full rounded-[2px] border border-white/14 bg-[#0b0d11] px-3.5 py-2.5 text-[16px] text-white placeholder:text-zinc-600 focus:border-[#4483e8] focus:outline-none sm:text-[13.5px]"
          />
        </div>
      </div>

      {/* Row 2: Company & Website */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="company"
            className="block font-mono text-[10.5px] uppercase tracking-[0.14em] text-zinc-400"
          >
            COMPANY &amp; CITY
          </label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company · Bengaluru / NYC"
            className="mt-2 min-h-[44px] w-full rounded-[2px] border border-white/14 bg-[#0b0d11] px-3.5 py-2.5 text-[16px] text-white placeholder:text-zinc-600 focus:border-[#4483e8] focus:outline-none sm:text-[13.5px]"
          />
        </div>

        <div>
          <label
            htmlFor="website"
            className="block font-mono text-[10.5px] uppercase tracking-[0.14em] text-zinc-400"
          >
            WEBSITE
          </label>
          <input
            id="website"
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://company.com"
            className="mt-2 min-h-[44px] w-full rounded-[2px] border border-white/14 bg-[#0b0d11] px-3.5 py-2.5 text-[16px] text-white placeholder:text-zinc-600 focus:border-[#4483e8] focus:outline-none sm:text-[13.5px]"
          />
        </div>
      </div>

      {/* Row 3: Custom Sharp Dropdowns (even 2-col alignment) */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CustomSelect
          id="buildType"
          label="BUILD TYPE"
          placeholder="Select a service"
          options={BUILD_OPTIONS}
          value={service}
          onChange={setService}
        />

        <CustomSelect
          id="timeline"
          label="TIMELINE"
          placeholder="Select timeline"
          options={TIMELINE_OPTIONS}
          value={timeline}
          onChange={setTimeline}
        />
      </div>

      {/* Row 4: Target Budget (2-col mobile, 4-col tablet/desktop) */}
      <div className="mt-4">
        <span className="block font-mono text-[10.5px] uppercase tracking-[0.14em] text-zinc-400">
          TARGET BUDGET ({currency})
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {budgetList.map((b, idx) => (
            <button
              key={b.value}
              type="button"
              onClick={() => setBudgetIndex(idx)}
              className={`min-h-[42px] rounded-[2px] border px-2.5 py-2 font-mono text-[11.5px] transition-colors ${
                budgetIndex === idx
                  ? "border-[#4483e8] bg-[#4483e8]/18 text-[#93c5fd]"
                  : "border-white/14 bg-[#0b0d11] text-zinc-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {b.value}
            </button>
          ))}
        </div>
      </div>

      {/* Row 5: Problem statement */}
      <div className="mt-4">
        <label
          htmlFor="problem"
          className="block font-mono text-[10.5px] uppercase tracking-[0.14em] text-zinc-400"
        >
          WHAT SHOULD WE BUILD, AND WHAT IS IT REPLACING?
        </label>
        <textarea
          id="problem"
          rows={4}
          required
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Example: our ops team copies every order from WhatsApp & sheets into Zoho each morning—or we need a custom SaaS portal for our clients."
          className="mt-2 w-full rounded-[2px] border border-white/14 bg-[#0b0d11] px-3.5 py-3 text-[16px] leading-relaxed text-white placeholder:text-zinc-600 focus:border-[#4483e8] focus:outline-none sm:text-[13.5px]"
        />
      </div>

      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-4 rounded-[2px] border border-red-500/35 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-300"
        >
          {error}
        </p>
      )}

      {/* Hidden honeypot for automated spam */}
      <input
        type="text"
        name="websiteTrap"
        tabIndex={-1}
        autoComplete="off"
        value={websiteTrap}
        onChange={(e) => setWebsiteTrap(e.target.value)}
        aria-hidden="true"
        className="hidden"
      />

      {/* Full-width crisp white rectangular submit */}
      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-[2px] bg-white px-6 py-3.5 font-mono text-[11.5px] font-medium uppercase tracking-[0.16em] text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
      >
        {submitting ? "SENDING DETAILS..." : "SEND ONBOARDING DETAILS"}
      </button>
    </form>
  );
}
