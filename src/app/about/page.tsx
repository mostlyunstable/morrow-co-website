import { HalftoneCanvas } from "@/components/halftone-canvas";
import { RollButton } from "@/components/roll-button";

const PRINCIPLES = [
  {
    code: "01",
    title: "You have a problem, we engineer the answer",
    desc: "We don't force your business into rigid templates. Whether you need an internal operations script, an AI triage agent, or a customer-facing SaaS platform, we design around the exact constraint.",
  },
  {
    code: "02",
    title: "Built in India, shipping for the world",
    desc: "We combine fast, high-agency engineering with international design standards—supporting Razorpay, UPI, and GST workflows locally alongside Stripe, SOC-ready practices, and US/UK/UAE timezone overlap.",
  },
  {
    code: "03",
    title: "Weekly demos, zero agency theater",
    desc: "No bloated account managers or month-long slide decks. You collaborate directly with the engineers shipping your product, testing live staging links every week.",
  },
  {
    code: "04",
    title: "100% IP & infrastructure ownership",
    desc: "Your repos, your cloud, your automation nodes, your data. When we hand over, your team owns every single line of code with clean runbooks.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-black pt-28 text-white sm:pt-36">
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <HalftoneCanvas variant="orbit" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/80 to-black" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#60a5fa]">
            ABOUT MORROW &amp; CO.
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.6rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.025em]">
            Software studios shouldn&apos;t sell hours.{" "}
            <span className="italic text-[#93c5fd]">They should solve problems.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-zinc-300">
            Morrow &amp; Co. was founded on a straightforward premise: teams
            spend far too much talent on repetitive busywork and wait far too
            long for custom software. We bridge both—automating what slows you
            down and building the web products and SaaS apps your customers ask
            for.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <RollButton href="/onboarding" variant="white" size="md">
              Tell us your problem
            </RollButton>
            <RollButton href="/services" variant="outline-dark" size="md">
              Explore services
            </RollButton>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f7f9] px-5 py-20 text-black sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {PRINCIPLES.map((item) => (
              <div
                key={item.code}
                className="rounded-[2px] border border-black/8 bg-white p-8 shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
              >
                <span className="font-mono text-xs tracking-[0.18em] text-[#2563eb]">
                  {item.code}
                </span>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-black">
                  {item.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
