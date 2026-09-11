import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Market Intelligence — Asaheeb Real Estate",
  description:
    "Saudi Arabia real estate market insights, Vision 2030 analysis, rental yield reports, and legal investment guides for foreign & domestic investors.",
  keywords: [
    "Saudi real estate market blog",
    "Vision 2030 property news",
    "Riyadh rental yields 2025",
    "buying property in Saudi Arabia foreigner guide",
    "مدونة العقارات السعودية",
  ],
  openGraph: {
    title: "Saudi Real Estate Market Intelligence & Vision 2030 Blog — Asaheeb",
    description: "Expert market briefings, yield analysis, regulatory updates, and property investment guides.",
    url: "https://www.asaheebrealestate.com/blog",
    siteName: "Asaheeb Real Estate",
    images: [
      {
        url: "https://www.asaheebrealestate.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Asaheeb Real Estate Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saudi Real Estate Intelligence — Asaheeb",
    description: "Market briefings, rental yield data, and regulatory guides.",
    images: ["https://www.asaheebrealestate.com/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com/blog",
  },
};

const blogArchiveSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": "https://www.asaheebrealestate.com/blog#blog",
      "url": "https://www.asaheebrealestate.com/blog",
      "name": "Asaheeb Saudi Real Estate Intelligence & Vision 2030 Briefings",
      "description": "Expert Saudi real estate market intelligence, rental yield reports, and legal guides.",
      "publisher": {
        "@type": "RealEstateAgent",
        "@id": "https://www.asaheebrealestate.com/#organization",
        "name": "Asaheeb Real Estate"
      }
    }
  ]
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogArchiveSchema) }}
      />
      {children}
    </>
  );
}
