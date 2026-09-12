import type { Metadata } from "next";
import { Syne, Instrument_Serif, Manrope, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Cursor } from "@/components/Cursor";
import { site } from "@/data/portfolio";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-syne", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const title = `${site.name} | ${site.role}`;
const description = site.tagline;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  keywords: [
    "Full-Stack Developer", "Next.js Developer", "React Developer", "Node.js", "MongoDB", "React Native",
    "OpenAI integration", "Stripe integration", "SaaS development", "Islamabad", "Upwork freelancer",
  ],
  authors: [{ name: site.name, url: site.github }],
  openGraph: { title, description, url: site.url, siteName: site.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${instrument.variable} ${manrope.variable} ${mono.variable}`} suppressHydrationWarning>
      {/* suppressHydrationWarning: browser extensions (ColorZilla, wallets) add attributes to <body> before React loads */}
      <body suppressHydrationWarning>
        <Providers>
          {children}
          <Cursor />
          <div className="grain" aria-hidden />
        </Providers>
      </body>
    </html>
  );
}
