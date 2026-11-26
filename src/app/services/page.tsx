import type { Metadata } from "next";
import { ServicesView } from "@/components/services-view";
import { SERVICES } from "@/data/agency";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services — Workflow Automation, Custom SaaS & Web Products",
  description:
    "Explore Morrow & Co. services across Workflow & AI Automation, Custom SaaS Applications, Web Products & Portals, and Bespoke APIs with INR and USD pricing.",
  path: "/services",
  keywords: [
    "AI workflow automation pricing",
    "SaaS MVP development India",
    "custom web portal agency",
  ],
});

const SERVICES_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Morrow & Co. Engineering & Automation Services",
  url: `${SITE_URL}/services`,
  itemListElement: SERVICES.map((s) => ({
    "@type": "Offer",
    name: s.title,
    description: s.summary,
    url: `${SITE_URL}/services#${s.slug}`,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_JSON_LD) }}
      />
      <ServicesView />
    </>
  );
}
