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
  title: "Morrow & Co. | Workflow Automation, Web Products & Custom SaaS",
  description:
    "Morrow & Co. eliminates repetitive busywork and engineers custom web products, SaaS applications, and AI automation for ambitious teams in India and worldwide.",
  keywords: [
    "Morrow & Co.",
    "workflow automation agency",
    "custom SaaS development",
    "web product engineering",
    "AI automation India",
    "global software studio",
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
