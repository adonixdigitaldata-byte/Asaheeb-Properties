import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://www.asaheebrealestate.com"),
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
    url: "https://www.asaheebrealestate.com",
    siteName: "Asaheeb Real Estate",
    title: "Asaheeb Real Estate — Premium Saudi Real Estate Investment",
    description:
      "Curated real estate investments aligned with Saudi Arabia's Vision 2030. Apartments, villas, commercial land, and buildings — vetted by experts.",
    images: [
      {
        url: "https://www.asaheebrealestate.com/images/og-image.jpg",
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
    images: ["https://www.asaheebrealestate.com/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com",
    languages: {
      "en-US": "https://www.asaheebrealestate.com",
      "ar-SA": "https://www.asaheebrealestate.com",
    },
  },
  verification: {
    google: "DQlKOCqS_f9LA9dhsJhdPAfzxPPZbENPvs8us-aM6Uc",
  },
};

import { LanguageProvider } from "@/context/LanguageContext";
import PageLoader from "@/components/shared/PageLoader";

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.asaheebrealestate.com/#organization",
      "name": "Asaheeb Real Estate",
      "alternateName": ["شركة صهيب العقارية", "Asaheeb Properties", "Asaheeb Real Estate Company"],
      "url": "https://www.asaheebrealestate.com",
      "logo": "https://www.asaheebrealestate.com/icon.png",
      "image": "https://www.asaheebrealestate.com/images/og-image.jpg",
      "description": "Premier Saudi real estate brokerage and advisory firm specializing in Vision 2030 residential, commercial land, and off-plan investment properties in Jeddah, Riyadh, and Madinah.",
      "telephone": "+966565654450",
      "email": "buy@asaheebrealestate.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Office 602, Matbouli Plaza, Fayd As Samaa, Al-Ruwais",
        "addressLocality": "Jeddah",
        "postalCode": "23213",
        "addressCountry": "SA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.5204,
        "longitude": 39.1728
      },
      "hasMap": "https://maps.app.goo.gl/azGoR8U9jpaXa3Qh8",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
          "opens": "08:00",
          "closes": "20:00"
        }
      ],
      "priceRange": "$$$$",
      "currenciesAccepted": "SAR, USD, EUR, GBP",
      "paymentAccepted": "Bank Transfer, Electronic Payment",
      "areaServed": [
        { "@type": "City", "name": "Jeddah", "sameAs": "https://en.wikipedia.org/wiki/Jeddah" },
        { "@type": "City", "name": "Riyadh", "sameAs": "https://en.wikipedia.org/wiki/Riyadh" },
        { "@type": "City", "name": "Madinah", "sameAs": "https://en.wikipedia.org/wiki/Medina" },
        { "@type": "Country", "name": "Saudi Arabia", "sameAs": "https://en.wikipedia.org/wiki/Saudi_Arabia" }
      ],
      "knowsAbout": [
        "Saudi Real Estate General Authority (REGA / FAL) Licensing",
        "Non-Saudi Property Ownership Framework (2% Ownership Fee)",
        "Saudi Real Estate Transaction Tax (5% RETT)",
        "Saudi Premium Residency Real Estate Track (SAR 4,000,000)",
        "Wafi Off-Plan Project Due Diligence & Escrow Accounts",
        "Jeddah Waterfront & Obhur Luxury Real Estate",
        "Riyadh Commercial Land & Vision 2030 HQ Corridors"
      ],
      "sameAs": [
        "https://www.instagram.com/Asaheebrealestate",
        "https://www.snapchat.com/add/Asaheeb.re",
        "https://www.tiktok.com/@Asaheeb.RealEstate"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.asaheebrealestate.com/#website",
      "url": "https://www.asaheebrealestate.com",
      "name": "Asaheeb Real Estate",
      "publisher": {
        "@id": "https://www.asaheebrealestate.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.asaheebrealestate.com/faq?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "inLanguage": ["en-US", "ar-SA"]
    }
  ]
};

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
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="DQlKOCqS_f9LA9dhsJhdPAfzxPPZbENPvs8us-aM6Uc" />

        {/* Global Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Preload Initial Hero Frame for Instant Paint */}
        <link rel="preload" href="/frames/frame_0001.webp" as="image" type="image/webp" />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-THQ67S9R');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[var(--color-ink)] text-[var(--color-dune)]"
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-THQ67S9R"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <LanguageProvider>
          <PageLoader />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
