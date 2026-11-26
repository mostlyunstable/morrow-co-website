import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq-accordion";
import { RollButton } from "@/components/roll-button";
import { FAQS } from "@/data/agency";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQs — Timelines, INR & USD Billing, and Code Ownership",
  description:
    "Answers on Morrow & Co. delivery timelines, Indian (INR/UPI/GST) and international (USD/Stripe) billing, Razorpay/WhatsApp/Zoho integrations, and IP ownership.",
  path: "/faqs",
});

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function FaqsPage() {
  return (
    <div className="bg-[#f7f8fa] pt-28 text-black sm:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#2563eb]">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.03] tracking-[-0.025em] text-black">
            Clear answers, <span className="italic text-zinc-600">zero fine print.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-zinc-600">
            Everything founders and operations teams in India and abroad ask
            before kicking off an automation sprint or SaaS build.
          </p>

          <div className="mt-12 rounded-[2px] border border-black/8 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-10">
            <FaqAccordion />
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[2px] bg-black p-8 text-white sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#60a5fa]">
                STILL HAVE A SPECIFIC QUESTION?
              </p>
              <p className="mt-2 text-xl font-medium tracking-[-0.02em]">
                Share your use case and get a concrete architecture reply.
              </p>
            </div>
            <RollButton href="/onboarding" variant="primary" size="md">
              Start scoping
            </RollButton>
          </div>
        </div>
      </section>
    </div>
  );
}
