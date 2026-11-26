"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { HalftoneCanvas } from "./halftone-canvas";
import { RollButton } from "./roll-button";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@morrowandco.in");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <HalftoneCanvas variant="footer" dotColor="#ffffff" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 pb-8 pt-20 sm:px-10 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Left CTA block */}
          <div className="lg:col-span-6">
            <p className="max-w-sm text-[22px] font-normal leading-[1.35] tracking-[-0.02em] text-zinc-200 sm:text-[26px]">
              Good software is complicated. Reaching us isn&apos;t. Talk to the
              Morrow &amp; Co. team anytime.
            </p>
            <div className="mt-7">
              <RollButton href="/onboarding" variant="primary" size="md">
                Get in touch
              </RollButton>
            </div>
          </div>

          {/* Right bordered link columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-6">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                SERVICES
              </p>
              <ul className="mt-3 divide-y divide-white/12 border-t border-b border-white/12 text-[14.5px] text-zinc-200">
                <li>
                  <Link
                    href="/services#automation"
                    className="block py-3 transition-colors hover:text-white"
                  >
                    Workflow &amp; AI Automation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#saas"
                    className="block py-3 transition-colors hover:text-white"
                  >
                    Custom SaaS Apps
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#web-products"
                    className="block py-3 transition-colors hover:text-white"
                  >
                    Web Products &amp; Portals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#custom-engineering"
                    className="block py-3 transition-colors hover:text-white"
                  >
                    Bespoke Solutions &amp; APIs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                COMPANY
              </p>
              <ul className="mt-3 divide-y divide-white/12 border-t border-b border-white/12 text-[14.5px] text-zinc-200">
                <li>
                  <Link
                    href="/about"
                    className="block py-3 transition-colors hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="block py-3 transition-colors hover:text-white"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/onboarding"
                    className="block py-3 transition-colors hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Clean studio wordmark */}
        <div className="mt-24 flex items-center gap-4 sm:mt-32">
          <BrandMark
            className="h-10 w-10 shrink-0 sm:h-11 sm:w-11"
            color="#4483E8"
          />
          <span className="text-[clamp(2rem,4vw,3.1rem)] font-medium tracking-[-0.03em] text-white">
            Morrow &amp; Co.
          </span>
        </div>

        {/* Bottom legal & email bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/12 pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500 sm:flex-row sm:items-center">
          <p>© 2026 MORROW &amp; CO. — SYSTEMS, NOT BUSYWORK.</p>
          <button
            type="button"
            onClick={handleCopyEmail}
            className={`font-mono text-[11px] lowercase tracking-wide transition-colors ${
              copied ? "text-[#60a5fa]" : "text-zinc-300 hover:text-white"
            }`}
          >
            {copied ? "copied hello@morrowandco.in" : "hello@morrowandco.in"}
          </button>
        </div>
      </div>
    </footer>
  );
}
