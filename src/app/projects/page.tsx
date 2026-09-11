import { Suspense } from "react";
import { Metadata } from "next";
import { getPublishedProjectDetails } from "@/lib/api";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Curated Saudi Real Estate Portfolio | Asaheeb Real Estate",
  description:
    "Explore premier vetted investment properties and limited-time promotional offers in Riyadh, Jeddah, and Madinah. High-yield residential and commercial projects aligned with Saudi Vision 2030.",
  openGraph: {
    title: "Curated Saudi Real Estate Portfolio | Asaheeb Real Estate",
    description:
      "Explore premier vetted investment properties and promotional offers in Riyadh, Jeddah, and Madinah.",
    url: "https://www.asaheebrealestate.com/projects",
    siteName: "Asaheeb Real Estate",
    images: [
      {
        url: "https://www.asaheebrealestate.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Asaheeb Real Estate Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curated Saudi Real Estate Portfolio | Asaheeb Real Estate",
    description:
      "Explore premier vetted investment properties and promotional offers in Riyadh, Jeddah, and Madinah.",
    images: ["https://www.asaheebrealestate.com/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com/projects",
  },
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function ProjectsPage() {
  const initialProjects = await getPublishedProjectDetails();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Asaheeb Real Estate Portfolio",
    "url": "https://www.asaheebrealestate.com/projects",
    "numberOfItems": initialProjects.length,
    "itemListElement": initialProjects.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": p.nameEn,
      "url": `https://www.asaheebrealestate.com/projects/${p.id}`,
    })),
  };

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#12130F]" />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsClient initialProjects={initialProjects} />
    </Suspense>
  );
}
