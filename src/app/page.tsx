import { BrandMark } from "@/components/brand-mark";
import { HalftoneCanvas } from "@/components/halftone-canvas";
import { RollButton } from "@/components/roll-button";
import { ToolMarquee } from "@/components/tool-marquee";
import { ScrollManifesto } from "@/components/scroll-manifesto";
import { ServiceTimeline } from "@/components/service-timeline";
import { ENGAGEMENT_PRINCIPLES } from "@/data/agency";

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      {/* 1. HERO — Full-bleed tight halftone dot matrix + Instrument Serif */}
      <section
        id="top"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 pb-24 pt-24 sm:px-8"
      >
        <div className="pointer-events-none absolute inset-0">
          <HalftoneCanvas variant="hero" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(0,0,0,0.48)_0%,rgba(0,0,0,0.18)_52%,rgba(0,0,0,0.58)_100%)]"
        />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="font-serif text-[clamp(3.35rem,8.4vw,6.4rem)] font-normal leading-[0.94] tracking-[-0.025em] text-white">
            Automate the
            <br />
            <span className="italic">busywork</span>
          </h1>

          <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-zinc-300 sm:text-[16.5px]">
            Morrow &amp; Co. turns repetitive operations into{" "}
            <strong className="font-semibold text-white">AI workflows</strong>,{" "}
            <strong className="font-semibold text-white">SaaS apps</strong>, and{" "}
            <strong className="font-semibold text-white">web products</strong>{" "}
            built for India and the world.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <RollButton href="/onboarding" variant="white" size="md">
              Start onboarding
            </RollButton>
            <RollButton href="/services" variant="outline-dark" size="md">
              See our services
            </RollButton>
          </div>
        </div>
      </section>

      {/* 2. WHITE OVERLAP SHEET: TOOL MARQUEE + SCROLL MANIFESTO */}
      <section className="relative z-20 -mt-10 rounded-t-[24px] bg-white px-5 pt-4 text-black sm:-mt-14 sm:rounded-t-[32px] sm:px-8 sm:pt-6">
        <div
          aria-hidden="true"
          className="mx-auto mb-8 h-1 w-10 rounded-full bg-black/15"
        />
        <div className="mx-auto max-w-[1320px]">
          <ToolMarquee />
          <ScrollManifesto />
        </div>

        {/* Halftone dot-matrix cloud transition back into black */}
        <div className="relative -mx-5 mt-8 h-40 overflow-hidden bg-black sm:-mx-8 sm:mt-14 sm:h-52">
          <HalftoneCanvas variant="fade-dark" dotColor="#ffffff" />
        </div>
      </section>

      {/* 3. SERVICES INTRO */}
      <section className="relative bg-black px-5 pb-10 pt-24 text-center text-white sm:px-8 sm:pt-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-[clamp(2.5rem,5.8vw,4.3rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
            Systems, engineered.
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2 text-[14.5px] text-zinc-300">
            <BrandMark className="h-4 w-4 shrink-0" color="#4483E8" />
            <span>What we build across your operations</span>
          </div>
        </div>
      </section>

      {/* 4. ALTERNATING SERVICE TIMELINE */}
      <ServiceTimeline />

      {/* 5. LIGHT-MODE ENGAGEMENT PRINCIPLES (3 crisp rectangular cards) */}
      <section className="bg-[#f6f7f9] px-5 py-24 text-black sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1160px]">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#4483e8]">
              HOW WE WORK
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.15rem)] font-normal leading-[1.1] tracking-[-0.035em] text-black">
              How every engagement works, and what you keep
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {ENGAGEMENT_PRINCIPLES.map((item) => (
              <div
                key={item.index}
                className="flex flex-col justify-between rounded-[2px] border border-black/[0.06] bg-white p-8 shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
              >
                <div>
                  <span className="font-mono text-xs tracking-[0.16em] text-zinc-400">
                    {item.index}
                  </span>
                  <h3 className="mt-5 text-[19px] font-medium leading-[1.32] tracking-[-0.02em] text-black">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-8 border-t border-black/[0.08] pt-5">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#4483e8]">
                    WHAT CHANGES
                  </p>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-zinc-500">
                    {item.takeaway}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
