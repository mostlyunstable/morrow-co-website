"use client";

import { useEffect, useRef } from "react";
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
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const total = MANIFESTO_TOKENS.length;
    const activeState = new Uint8Array(total);
    let rafId = 0;

    const applyProgress = (progress: number) => {
      for (let idx = 0; idx < total; idx++) {
        const threshold = idx / total;
        const isActive = progress >= threshold * 0.88 + 0.04 ? 1 : 0;
        if (activeState[idx] === isActive) continue;
        activeState[idx] = isActive;

        const wordEl = wordRefs.current[idx];
        if (wordEl) {
          wordEl.classList.toggle("bg-black", isActive === 1);
          wordEl.classList.toggle("text-white", isActive === 1);
          wordEl.classList.toggle("bg-[#eceef2]", isActive === 0);
          wordEl.classList.toggle("text-zinc-600", isActive === 0);
        }

        const iconEl = iconRefs.current[idx];
        if (iconEl) {
          iconEl.classList.toggle("bg-[#4483e8]", isActive === 1);
          iconEl.classList.toggle("text-white", isActive === 1);
          iconEl.classList.toggle("bg-[#e7e9ee]", isActive === 0);
          iconEl.classList.toggle("text-zinc-500", isActive === 0);
        }
      }
    };

    if (prefersReducedMotion) {
      applyProgress(1);
      return;
    }

    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const start = vh * 0.8;
      const end = vh * 0.22;
      const span = Math.max(1, start - end + rect.height * 0.35);
      const raw = (start - rect.top) / span;
      applyProgress(Math.max(0, Math.min(1, raw)));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-auto max-w-[1040px] pb-12 pt-16 sm:pb-24 sm:pt-32"
    >
      <div className="mb-6 sm:mb-8">
        <span className="inline-block rounded-[2px] bg-[#f1f2f5] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-zinc-600">
          OPERATIONS, REBUILT AS SYSTEMS
        </span>
      </div>

      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[clamp(1.38rem,3.9vw,3.1rem)] font-normal leading-[1.24] tracking-[-0.03em] text-black">
        {MANIFESTO_TOKENS.map((token, idx) => {
          const IconComponent = token.icon ? ICONS[token.icon] : null;

          return (
            <span
              key={`${token.text}-${idx}`}
              className="inline-flex items-center gap-1.5"
            >
              {IconComponent && (
                <span
                  ref={(el) => {
                    iconRefs.current[idx] = el;
                  }}
                  aria-hidden="true"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#e7e9ee] text-zinc-500 transition-colors duration-300 sm:h-10 sm:w-10"
                >
                  <IconComponent className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </span>
              )}
              <span
                ref={(el) => {
                  wordRefs.current[idx] = el;
                }}
                className="inline-block rounded-[2px] bg-[#eceef2] px-2 py-0.5 text-zinc-600 transition-colors duration-300"
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
