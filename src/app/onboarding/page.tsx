import { Suspense } from "react";
import { OnboardingWizard } from "@/components/onboarding-wizard";

export default function OnboardingPage() {
  return (
    <div className="bg-grid-dark min-h-[85svh] border-b border-white/10 px-5 pb-20 pt-28 text-white sm:px-8 sm:pb-24 sm:pt-40">
      <div className="mx-auto grid max-w-[1160px] items-start gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left Lead Column */}
        <div className="lg:col-span-5 lg:pt-8">
          <h1 className="text-[clamp(2.8rem,5.5vw,4.35rem)] font-medium leading-[1.02] tracking-[-0.045em] text-white">
            Build your{" "}
            <span className="text-[#4483e8]">breakthrough</span> system.
          </h1>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-zinc-400">
            Share the bottleneck, target outcome, timeline, and billing market
            (India INR or Global USD). We&apos;ll reply within 24 hours with a
            clear architecture and milestone plan.
          </p>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7">
          <Suspense
            fallback={
              <div className="rounded-[2px] border border-white/14 bg-[#07080b] p-8 font-mono text-xs text-zinc-500">
                LOADING SCOPE PANEL...
              </div>
            }
          >
            <OnboardingWizard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
