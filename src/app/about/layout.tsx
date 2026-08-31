import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Asaheeb Real Estate | Saudi Real Estate Investment Brokerage",
  description:
    "Learn about Asaheeb Real Estate, Saudi Arabia's premier real estate investment brokerage. Curated deal sourcing, Vision 2030 corridor alignment, and institutional due diligence.",
  keywords: [
    "About Asaheeb Real Estate",
    "Saudi real estate brokerage",
    "Vision 2030 real estate advisory",
    "Riyadh property investment firm",
    "من نحن أصاهيب العقارية",
    "شركة استثمار عقاري السعودية",
  ],
    openGraph: {
    title: "About Asaheeb Real Estate — Strategic Saudi Investment Advisory",
    description:
      "Learn about Asaheeb Real Estate — leading luxury real estate investment advisors in Saudi Arabia. Specializing in high-yield assets aligned with Vision 2030.",
    url: "https://www.asaheebrealestate.com/about",
    siteName: "Asaheeb Real Estate",
    images: [
      {
        url: "https://www.asaheebrealestate.com/icon.png",
        width: 1200,
        height: 1200,
        alt: "About Asaheeb Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Asaheeb Real Estate — Vision 2030 Property Advisors",
    description: "Curated Saudi real estate investments. Institutional due diligence & bilingual advisory.",
    images: ["https://www.asaheebrealestate.com/icon.png"],
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com/about",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.asaheebrealestate.com/about#webpage",
      "url": "https://www.asaheebrealestate.com/about",
      "name": "About Asaheeb Real Estate",
      "description": "Learn about Asaheeb Real Estate, Saudi Arabia's premier real estate investment brokerage specializing in Vision 2030 corridor alignment and institutional due diligence.",
      "about": {
        "@type": "RealEstateAgent",
        "@id": "https://www.asaheebrealestate.com/#organization",
        "name": "Asaheeb Real Estate"
      },
      "mainEntity": {
        "@type": "RealEstateAgent",
        "@id": "https://www.asaheebrealestate.com/#organization"
      }
    }
  ]
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      {children}
    </>
  );
}
