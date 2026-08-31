import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services — Asaheeb Real Estate | Real Estate Investment Advisory",
  description:
    "Institutional-grade real estate services in Saudi Arabia — Asset Sourcing, 40-point Due Diligence, Legal & RERA support, and Portfolio Strategy Advisory.",
  keywords: [
    "Saudi real estate advisory services",
    "property due diligence Saudi Arabia",
    "RERA legal support Riyadh",
    "real estate asset sourcing KSA",
    "خدمات الاستثمار العقاري السعودية",
  ],
  openGraph: {
    title: "Real Estate Advisory & Investment Services — Asaheeb",
    description: "Curated deal sourcing, 40-point due diligence, title check, and portfolio management.",
    url: "https://www.asaheebrealestate.com/services",
    siteName: "Asaheeb Real Estate",
    images: [
      {
        url: "https://www.asaheebrealestate.com/icon.png",
        width: 1200,
        height: 1200,
        alt: "Asaheeb Real Estate Advisory Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Advisory & Investment Services — Asaheeb",
    description: "Curated deal sourcing, due diligence, and portfolio advisory in Saudi Arabia.",
    images: ["https://www.asaheebrealestate.com/icon.png"],
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com/services",
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.asaheebrealestate.com/services#asset-sourcing",
      "name": "Asset Sourcing & Off-Market Property Curation",
      "provider": {
        "@type": "RealEstateAgent",
        "@id": "https://www.asaheebrealestate.com/#organization",
        "name": "Asaheeb Real Estate"
      },
      "areaServed": "Saudi Arabia",
      "description": "Exclusive access to off-market luxury villas, prime commercial land, and pre-launch developer allocations in Jeddah, Riyadh, and Madinah.",
      "serviceType": "Real Estate Brokerage & Acquisition"
    },
    {
      "@type": "Service",
      "@id": "https://www.asaheebrealestate.com/services#due-diligence",
      "name": "40-Point Legal & Technical Due Diligence",
      "provider": {
        "@type": "RealEstateAgent",
        "@id": "https://www.asaheebrealestate.com/#organization",
        "name": "Asaheeb Real Estate"
      },
      "areaServed": "Saudi Arabia",
      "description": "Comprehensive title deed verification, building completion auditing, municipal zoning checks, and REGA FAL compliance reviews.",
      "serviceType": "Property Due Diligence & Legal Audit"
    },
    {
      "@type": "Service",
      "@id": "https://www.asaheebrealestate.com/services#foreign-acquisition",
      "name": "Non-Saudi & Expat Property Acquisition Advisory",
      "provider": {
        "@type": "RealEstateAgent",
        "@id": "https://www.asaheebrealestate.com/#organization",
        "name": "Asaheeb Real Estate"
      },
      "areaServed": "Saudi Arabia",
      "description": "End-to-end legal onboarding for foreign individuals, expats, and non-resident investors navigating Saudi Properties portal, 5% RETT, and 2% Non-Saudi ownership fees.",
      "serviceType": "Expat & Foreign Investment Advisory"
    },
    {
      "@type": "Service",
      "@id": "https://www.asaheebrealestate.com/services#premium-residency",
      "name": "Saudi Premium Residency Real Estate Track Advisory (SAR 4M+)",
      "provider": {
        "@type": "RealEstateAgent",
        "@id": "https://www.asaheebrealestate.com/#organization",
        "name": "Asaheeb Real Estate"
      },
      "areaServed": "Saudi Arabia",
      "description": "Specialized asset identification and certification for foreign high-net-worth investors acquiring qualifying SAR 4,000,000+ unencumbered residential properties for Saudi Premium Residency.",
      "serviceType": "Golden Visa & Residency Property Advisory"
    }
  ]
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {children}
    </>
  );
}
