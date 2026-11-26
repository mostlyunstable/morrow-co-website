import type { Metadata } from "next";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://morrowandco.in"
).replace(/\/$/, "");

export const SITE_NAME = "Morrow & Co.";

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    keywords: [
      "Morrow & Co.",
      "workflow automation agency",
      "AI automation India",
      "custom SaaS development",
      "web product studio",
      "software agency India and global",
      ...keywords,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
