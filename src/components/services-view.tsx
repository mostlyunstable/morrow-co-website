"use client";

import Link from "next/link";
import { ArrowUpRight, Blocks, Code2, Cpu, Globe2 } from "lucide-react";
import {
  DIAGNOSTIC_ROUTES,
  SERVICES,
  type ServiceSlug,
} from "@/data/agency";
import { useCurrency } from "@/context/currency-context";
import { CurrencyToggle } from "@/components/currency-toggle";
import { RollButton } from "@/components/roll-button";

const SERVICE_ICONS: Record<ServiceSlug, typeof Cpu> = {
  automation: Cpu,
  saas: Blocks,
  "web-products": Globe2,
  "custom-engineering": Code2,
};

export function ServicesView() {
  const { currency } = useCurrency();

  return (
    <div className="bg-black text-white">
      {/* 1. DARK SQUARE-GRID HERO + 4-NODE CONNECTED CHAIN */}
      <section className="bg-grid-dark border-b border-white/10 px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-[1160px]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h1 className="text-[clamp(2.5rem,5.5vw,4.1rem)] font-medium leading-[1.04] tracking-[-0.04em] text-white">
                Four pillars.{" "}
                <span className="text-[#4483e8]">Start small</span> on any of
                them.
              </h1>
              <p className="mt-5 text-[15.5px] leading-relaxed text-zinc-400 sm:text-[16.5px]">
                They work standalone or stack together as you grow. Whether you
                need repetitive ops automated in days or a full SaaS product
                launched globally, every engagement begins with a focused first
                step.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-end">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                CURRENCY
              </span>
              <CurrencyToggle tone="dark" />
            </div>
          </div>

          {/* 4-column connected chain strip */}
          <div className="mt-10 grid grid-cols-1 border border-white/12 bg-[#050507] sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, idx) => {
              const Icon = SERVICE_ICONS[service.slug];
              const borderClasses = [
                idx < 3 ? "border-b lg:border-b-0" : "",
                idx < 2 ? "sm:border-b lg:border-b-0" : "sm:border-b-0",
                idx % 2 === 0 ? "sm:border-r" : "",
                idx < 3 ? "lg:border-r" : "lg:border-r-0",
              ].join(" ");
              return (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className={`group relative flex flex-col justify-between border-white/12 p-5 transition-colors hover:bg-white/[0.03] sm:p-6 ${borderClasses}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] tracking-[0.12em] text-zinc-500">
                        {service.chainLabel}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </div>

                    <div className="mt-4 text-[#4483e8]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h2 className="mt-4 text-[17px] font-medium tracking-[-0.02em] text-white">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
                      {service.idealFor}
                    </p>
                  </div>

                  <p className="mt-6 font-mono text-[11.5px] text-zinc-400">
                    {service.price[currency]}
                  </p>
                </a>
              );
            })}
          </div>

          <p className="mt-5 max-w-2xl text-[13px] leading-relaxed text-zinc-500">
            Manual work with no pipeline is wasted payroll. Pipelines on top of
            a broken spreadsheet still break. Fix the exact bottleneck first,
            then scale cleanly.
          </p>
        </div>
      </section>

      {/* 2. ALTERNATING LIGHT / DARK 2-COLUMN BREAKDOWN BANDS */}
      {SERVICES.map((service, idx) => {
        const isLight = idx % 2 === 0;
        const isMirrored = idx % 2 === 1;

        const leftSummary = (
          <div className={isMirrored ? "lg:order-2" : "lg:order-1"}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              SERVICE {service.index} / 04
            </p>
            <h2
              className={`mt-3 text-[clamp(2.1rem,4.5vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.035em] ${
                isLight ? "text-black" : "text-white"
              }`}
            >
              {service.title}
            </h2>
            <p
              className={`mt-5 max-w-md text-[15.5px] leading-relaxed ${
                isLight ? "text-zinc-600" : "text-zinc-400"
              }`}
            >
              {service.summary}
            </p>

            {/* Start here when callout */}
            <div
              className={`mt-7 border-l-2 border-[#4483e8] px-4 py-3.5 text-[13.5px] leading-relaxed ${
                isLight
                  ? "bg-[#eef4ff] text-zinc-700"
                  : "bg-[#0d1729] text-zinc-300"
              }`}
            >
              <strong
                className={`font-semibold ${
                  isLight ? "text-black" : "text-white"
                }`}
              >
                Start here when
              </strong>{" "}
              {service.startHereWhen}
            </div>

            <div className="mt-7">
              <p className="font-mono text-[13px] font-medium text-[#4483e8]">
                {service.price[currency]}
              </p>
              <p
                className={`mt-1 text-[13px] ${
                  isLight ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                {service.priceNote} · {service.timeline}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <RollButton
                href={`/onboarding?service=${service.slug}`}
                variant="primary"
                size="md"
              >
                Scope this build
              </RollButton>
              <RollButton
                href="/onboarding"
                variant={isLight ? "outline-light" : "outline-dark"}
                size="md"
              >
                Book a call
              </RollButton>
            </div>
          </div>
        );

        const rightDetails = (
          <div className={isMirrored ? "lg:order-1" : "lg:order-2"}>
            <p
              className={`border-b pb-3 font-mono text-[10.5px] uppercase tracking-[0.18em] ${
                isLight
                  ? "border-black/10 text-zinc-500"
                  : "border-white/12 text-zinc-500"
              }`}
            >
              WHAT YOU GET
            </p>
            <div
              className={`divide-y ${
                isLight ? "divide-black/10" : "divide-white/12"
              }`}
            >
              {service.whatYouGet.map((row, rowIdx) => (
                <div
                  key={row.title}
                  className="grid grid-cols-[2.25rem_1fr] gap-4 py-6"
                >
                  <span className="font-mono text-xs text-[#4483e8]">
                    0{rowIdx + 1}
                  </span>
                  <div>
                    <h3
                      className={`text-[16.5px] font-medium tracking-[-0.015em] ${
                        isLight ? "text-black" : "text-white"
                      }`}
                    >
                      {row.title}
                    </h3>
                    <p
                      className={`mt-1.5 text-[14px] leading-relaxed ${
                        isLight ? "text-zinc-600" : "text-zinc-400"
                      }`}
                    >
                      {row.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24 lg:py-28 ${
              isLight ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            <div className="mx-auto grid max-w-[1160px] items-start gap-10 lg:grid-cols-2 lg:gap-20">
              {leftSummary}
              {rightDetails}
            </div>
          </section>
        );
      })}

      {/* 3. DIAGNOSTIC ROUTING TABLE */}
      <section className="bg-black px-5 py-24 text-white sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1160px]">
          <div className="max-w-xl">
            <h2 className="text-[clamp(2rem,4.4vw,3.15rem)] font-medium leading-[1.08] tracking-[-0.035em] text-white">
              Tell us where it hurts.
              <br />
              We&apos;ll tell you which one.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
              We turn down work that does not fit. If a simple off-the-shelf
              tool solves it, that is the answer you get.
            </p>
          </div>

          <div className="mt-12 border-t border-white/12">
            <div className="hidden grid-cols-12 border-b border-white/12 py-3.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-zinc-500 md:grid">
              <span className="col-span-6">WHERE YOU ARE</span>
              <span className="col-span-3">START WITH</span>
              <span className="col-span-3 text-right">FIRST STEP</span>
            </div>

            <div className="divide-y divide-white/12">
              {DIAGNOSTIC_ROUTES.map((row) => (
                <div
                  key={row.pain}
                  className="flex flex-col gap-3 py-5 md:grid md:grid-cols-12 md:items-center md:gap-4"
                >
                  <p className="text-[14.5px] leading-snug text-zinc-200 md:col-span-6">
                    {row.pain}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3 md:col-span-6 md:grid md:grid-cols-6 md:items-center">
                    <div className="md:col-span-3">
                      <Link
                        href={`/onboarding?service=${row.slug}`}
                        className="inline-flex min-h-[36px] items-center gap-1.5 text-[14px] font-medium text-[#60a5fa] transition-colors hover:text-white"
                      >
                        <span>{row.serviceTitle}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                    <p className="font-mono text-[12.5px] text-zinc-400 md:col-span-3 md:text-right">
                      {row.step[currency]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRE-FOOTER LIGHT CTA BAND */}
      <section className="bg-[#f6f7f9] px-5 py-20 text-center text-black sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            READY WHEN YOU ARE
          </p>
          <p className="mt-4 text-[clamp(1.75rem,3.6vw,2.6rem)] font-normal leading-[1.2] tracking-[-0.03em] text-black">
            Let&apos;s talk — get a free{" "}
            <Link
              href="/onboarding"
              className="mx-1 my-1 inline-flex items-center gap-2 rounded-[3px] bg-[#4483e8] px-4 py-1.5 text-[16px] font-medium text-white align-middle transition-colors hover:bg-[#3472d8]"
            >
              Scope a call
              <ArrowUpRight className="h-4 w-4" />
            </Link>{" "}
            architecture consultation.
          </p>
        </div>
      </section>
    </div>
  );
}
