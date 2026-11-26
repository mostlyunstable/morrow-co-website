"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Briefcase,
  GitFork,
  LayoutGrid,
} from "lucide-react";
import { MANIFESTO_TOKENS } from "@/data/agency";

const ICONS = {
  grid: LayoutGrid,
  branch: GitFork,
  arrow: ArrowUpRight,
  briefcase: Briefcase,
  bars: BarChart3,
};

export function ScrollManifesto() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafId = 0;

    if (prefersReducedMotion) {
      rafId = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(rafId);
    }

    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const start = vh * 0.8;
      const end = vh * 0.22;
      const total = Math.max(1, start - end + rect.height * 0.35);
      const raw = (start - rect.top) / total;
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const total = MANIFESTO_TOKENS.length;

  return (
    <div ref={containerRef} className="mx-auto max-w-[1040px] pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="mb-8">
        <span className="inline-block rounded-[2px] bg-[#f1f2f5] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-zinc-600">
          OPERATIONS, REBUILT AS SYSTEMS
        </span>
      </div>

      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[clamp(1.75rem,3.9vw,3.1rem)] font-normal leading-[1.22] tracking-[-0.03em] text-black">
        {MANIFESTO_TOKENS.map((token, idx) => {
          const threshold = idx / total;
          const active = progress >= threshold * 0.88 + 0.04;
          const IconComponent = token.icon ? ICONS[token.icon] : null;

          return (
            <span
              key={`${token.text}-${idx}`}
              className="inline-flex items-center gap-1.5"
            >
              {IconComponent && (
                <span
                  aria-hidden="true"
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-[4px] transition-all duration-300 sm:h-10 sm:w-10 ${
                    active
                      ? "bg-[#4483e8] text-white"
                      : "bg-[#e7e9ee] text-zinc-500"
                  }`}
                >
                  <IconComponent className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </span>
              )}
              <span
                className={`inline-block rounded-[2px] px-2 py-0.5 transition-colors duration-300 ${
                  active
                    ? "bg-black text-white"
                    : "bg-[#eceef2] text-zinc-600"
                }`}
              >
                {token.text}
              </span>
            </span>
          );
        })}
      </p>
    </div>
  );
}
