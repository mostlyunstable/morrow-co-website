"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/agency";
import { BrandMark } from "./brand-mark";
import { RollButton } from "./roll-button";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 36;
      setScrolled((prev) => (prev !== next ? next : prev));
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    const onPointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4 sm:pt-3.5"
    >
      <nav
        aria-label="Primary navigation"
        className={`mx-auto flex max-w-[1390px] items-center justify-between rounded-[6px] border px-3.5 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-white/14 bg-[#0b0d12]/94 shadow-[0_10px_34px_rgba(0,0,0,0.6)] backdrop-blur-md"
            : "border-white/12 bg-[#0e1015]/80 backdrop-blur-md"
        }`}
      >
        {/* Brand mark */}
        <Link href="/" className="flex min-h-[36px] items-center gap-2.5 text-white">
          <BrandMark className="h-[19px] w-[19px] shrink-0" color="#FFFFFF" />
          <span className="text-[15.5px] font-medium tracking-[-0.02em] sm:text-[16px]">
            Morrow &amp; Co.
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden items-center gap-5 md:flex lg:gap-8">
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shuffle-link text-[13.5px] font-normal transition-colors ${
                  active ? "text-white" : "text-zinc-200 hover:text-white"
                }`}
              >
                <span className="shuffle-link__text" aria-hidden="true">
                  {item.label.split("").map((ch, idx) => (
                    <span
                      key={`${ch}-${idx}`}
                      className="shuffle-link__ch"
                      style={{ ["--i" as string]: idx }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
                <span className="sr-only">{item.label}</span>
                <span
                  className={`inline-flex h-[17px] w-[17px] items-center justify-center rounded-[2px] border font-mono text-[10px] leading-none transition-colors ${
                    active
                      ? "border-[#4483e8]/60 bg-[#4483e8]/20 text-[#93c5fd]"
                      : "border-white/15 bg-white/[0.04] text-zinc-400"
                  }`}
                >
                  +
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right CTA + Mobile menu trigger */}
        <div className="flex items-center gap-2">
          <RollButton href="/onboarding" variant="primary" size="sm">
            Get started
          </RollButton>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-[3px] border border-white/15 bg-white/[0.04] text-white md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-[1390px] rounded-[6px] border border-white/15 bg-[#090b10]/96 p-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center justify-between rounded-[3px] border border-white/10 bg-white/[0.02] px-4 py-3 text-[15px] font-medium text-zinc-200 active:bg-white/[0.06]"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-[#60a5fa]">+</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
