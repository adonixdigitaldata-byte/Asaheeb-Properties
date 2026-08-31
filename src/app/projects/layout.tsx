import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured Projects — Asaheeb Real Estate | Saudi Real Estate Portfolio",
  description:
    "Explore curated real estate investment projects across Saudi Arabia — luxury apartments, villas, commercial land, and towers in Riyadh, Jeddah, and Madinah.",
  keywords: [
    "Saudi Arabia real estate projects",
    "Riyadh apartments for sale",
    "Jeddah luxury villas",
    "Madinah commercial land investment",
    "مشاريع عقارية في السعودية",
    "فلل الرياض جدة والمدينة المنورة",
  ],
  openGraph: {
    title: "Real Estate Investment Projects — Asaheeb Saudi Arabia",
    description: "Explore curated residential and commercial real estate projects in Riyadh, Jeddah & Madinah.",
    url: "https://www.asaheebrealestate.com/projects",
    siteName: "Asaheeb Real Estate",
    images: [
      {
        url: "https://www.asaheebrealestate.com/icon.png",
        width: 1200,
        height: 1200,
        alt: "Asaheeb Real Estate Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curated Saudi Real Estate Projects — Asaheeb",
    description: "Explore luxury apartments, villas, and commercial assets across Jeddah, Riyadh & Madinah.",
    images: ["https://www.asaheebrealestate.com/icon.png"],
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com/projects",
  },
};

const projectsCollectionSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.asaheebrealestate.com/projects#webpage",
      "url": "https://www.asaheebrealestate.com/projects",
      "name": "Featured Saudi Real Estate Projects",
      "description": "Explore curated luxury residential and commercial investment projects across Jeddah, Riyadh, and Madinah.",
      "publisher": {
        "@type": "RealEstateAgent",
        "@id": "https://www.asaheebrealestate.com/#organization",
        "name": "Asaheeb Real Estate"
      }
    }
  ]
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsCollectionSchema) }}
      />
      {children}
    </>
  );
}
