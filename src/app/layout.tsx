import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Hanken_Grotesk,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/context/currency-context";
import { LenisProvider } from "@/components/lenis-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Morrow & Co. | Workflow Automation, Web Products & Custom SaaS",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Morrow & Co. eliminates repetitive busywork and engineers custom web products, SaaS applications, and AI automation for ambitious teams in India and worldwide.",
  keywords: [
    "Morrow & Co.",
    "workflow automation agency",
    "custom SaaS development",
    "web product engineering",
    "AI automation India",
    "n8n automation agency",
    "global software studio",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Morrow & Co. | Workflow Automation, Web Products & Custom SaaS",
    description:
      "You have a problem—we engineer the solution. Workflow automation, custom SaaS apps, and web products for India and global teams.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morrow & Co. | Workflow Automation, Web Products & Custom SaaS",
    description:
      "Eliminate repetitive busywork and launch custom SaaS apps and web products.",
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Morrow & Co.",
  url: SITE_URL,
  email: "hello@morrowandco.in",
  description:
    "Software & automation studio eliminating repetitive work and building custom web products, SaaS applications, and AI workflows for Indian and international clients.",
  areaServed: ["IN", "US", "GB", "AE", "SG", "Worldwide"],
  currenciesAccepted: "INR, USD",
  serviceType: [
    "Workflow & AI Automation",
    "Custom SaaS Development",
    "Web Products & Client Portals",
    "Bespoke APIs & Engineering",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${hankenGrotesk.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-black text-white antialiased selection:bg-[#3b82f6] selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD),
          }}
        />
        <CurrencyProvider>
          <LenisProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LenisProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
