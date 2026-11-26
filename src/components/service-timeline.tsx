"use client";

import { useEffect, useRef, useState } from "react";
import { Blocks, Code2, Cpu, Globe2 } from "lucide-react";
import { SERVICES, type ServiceSlug } from "@/data/agency";
import { useCurrency } from "@/context/currency-context";
import { HalftoneCanvas } from "./halftone-canvas";
import { RollButton } from "./roll-button";
import { CurrencyToggle } from "./currency-toggle";

const SERVICE_ICONS: Record<ServiceSlug, typeof Cpu> = {
  automation: Cpu,
  saas: Blocks,
  "web-products": Globe2,
  "custom-engineering": Code2,
};

export function ServiceTimeline() {
  const { currency } = useCurrency();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [lineProgress, setLineProgress] = useState(0.14);
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const start = vh * 0.55;
      const raw = (start - rect.top) / Math.max(1, rect.height - 140);
      setLineProgress(Math.max(0.05, Math.min(1, raw)));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const cardEls = document.querySelectorAll<HTMLElement>("[data-tl-card]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-tl-card");
          if (id && entry.isIntersecting) {
            setVisibleCards((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.14 }
    );

    cardEls.forEach((el) => observer.observe(el));

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative bg-black px-5 pb-28 pt-6 text-white sm:px-8 sm:pb-36">
      <div className="mx-auto max-w-[1160px]">
        {/* Subtle centered currency switcher */}
        <div className="mb-14 flex items-center justify-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            PRICING IN
          </span>
          <CurrencyToggle tone="dark" />
        </div>

        {/* Timeline */}
        <div ref={trackRef} className="relative">
          {/* Central vertical dotted spine (desktop) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 left-1/2 top-4 hidden w-px -translate-x-1/2 lg:block"
          >
            <div className="timeline-spine h-full w-full" />
            <div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-[#4483e8] to-[#93c5fd] transition-[height] duration-150"
              style={{ height: `${lineProgress * 100}%` }}
            />
            <div
              className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-[1px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.75)] transition-[top] duration-150"
              style={{ top: `${lineProgress * 100}%` }}
            />
          </div>

          <div className="space-y-12 lg:space-y-16">
            {SERVICES.map((service, idx) => {
              const Icon = SERVICE_ICONS[service.slug];
              const isRight = idx % 2 === 0;
              const isVisible = visibleCards[service.slug];

              return (
                <div
                  key={service.slug}
                  data-tl-card={service.slug}
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-25"
                  } transition-all duration-700 ease-out`}
                >
                  {/* Opposite spacer column matching Eclipse negative space */}
                  <div
                    className={`hidden lg:block ${
                      isRight ? "lg:order-1" : "lg:order-2"
                    }`}
                  />

                  {/* Card column */}
                  <div className={isRight ? "lg:order-2" : "lg:order-1"}>
                    <article className="group relative overflow-hidden rounded-[2px] border border-white/12 bg-[#040405] p-6 sm:p-8">
                      {/* Halftone artwork on right side */}
                      <div className="pointer-events-none absolute inset-0 opacity-85">
                        <HalftoneCanvas
                          variant={service.halftoneVariant}
                          dotColor="#ffffff"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#040405] via-[#040405]/85 to-[#040405]/25" />

                      <div className="relative z-10">
                        {/* 01 + Category label */}
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-2xl font-normal tracking-tight text-zinc-500">
                            {service.index}
                          </span>
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-400">
                            {service.label}
                          </span>
                        </div>

                        {/* Crisp 2-3 line problem/solution headline */}
                        <h3 className="mt-5 max-w-md text-[21px] font-normal leading-[1.32] tracking-[-0.02em] text-white sm:text-[23px]">
                          {service.tagline}
                        </h3>

                        {/* 4 hairline rows with blue dots */}
                        <ul className="mt-7 divide-y divide-white/10 border-t border-white/10">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-3 py-3.5 text-[13.5px] text-zinc-300"
                            >
                              <span
                                aria-hidden="true"
                                className="h-1 w-1 shrink-0 rounded-full bg-[#4483e8]"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Bottom bar: circular icon + pricing anchor + sharp rectangular button */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-5">
                          <div className="flex items-center gap-3.5">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-[#60a5fa]">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="text-[16px] font-medium tracking-[-0.015em] text-white">
                              {service.price[currency]}
                            </span>
                          </div>

                          <RollButton
                            href={`/services#${service.slug}`}
                            variant="outline-dark"
                            size="sm"
                          >
                            See the page
                          </RollButton>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
