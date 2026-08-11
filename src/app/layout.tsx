import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asaheeb Real Estate — Premium Saudi Real Estate Investment",
  description:
    "Invest in Saudi Arabia's Vision 2030 transformation. Asaheeb Real Estate offers curated, vetted real estate investment opportunities — apartments, villas, commercial land, and buildings. Arabic & English advisory.",
  keywords: [
    "Saudi Arabia real estate investment",
    "Vision 2030 property",
    "Riyadh property investment",
    "Madinah property investment",
    "buy property Saudi Arabia",
    "luxury villas Saudi Arabia",
    "commercial land Saudi Arabia",
    "استثمار عقاري السعودية",
    "عقارات الرياض",
    "رؤية 2030 عقارات",
  ],
  authors: [{ name: "Asaheeb Real Estate" }],
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  creator: "Asaheeb Real Estate",
  publisher: "Asaheeb Real Estate",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    url: "https://asaheebrealestate.com",
    siteName: "Asaheeb Real Estate",
    title: "Asaheeb Real Estate — Premium Saudi Real Estate Investment",
    description:
      "Curated real estate investments aligned with Saudi Arabia's Vision 2030. Apartments, villas, commercial land, and buildings — vetted by experts.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asaheeb Real Estate — Saudi Arabia Real Estate Investment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asaheeb Real Estate — Invest in Saudi Arabia's Future",
    description: "Premium real estate investment opportunities aligned with Vision 2030.",
  },
  alternates: {
    canonical: "https://asaheeb.com",
    languages: {
      "en-US": "https://asaheeb.com",
      "ar-SA": "https://asaheeb.com/ar",
    },
  },
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[var(--color-ink)] text-[var(--color-dune)]"
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
