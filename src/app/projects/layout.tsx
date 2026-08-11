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
    title: "Featured Projects — Asaheeb Real Estate",
    description: "Curated apartments, villas, commercial land, and towers across Saudi Arabia.",
    url: "https://asaheebrealestate.com/projects",
    siteName: "Asaheeb Real Estate",
  },
  alternates: {
    canonical: "https://asaheebrealestate.com/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
