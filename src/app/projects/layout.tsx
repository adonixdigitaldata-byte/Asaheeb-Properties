import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured Projects — Asaheeb Properties | Saudi Real Estate Portfolio",
  description:
    "Explore curated real estate investment projects across Saudi Arabia — luxury apartments, villas, commercial land, and towers in Riyadh, Jeddah, and NEOM.",
  keywords: [
    "Saudi Arabia real estate projects",
    "Riyadh apartments for sale",
    "Jeddah luxury villas",
    "NEOM commercial land investment",
    "مشاريع عقارية في السعودية",
    "فلل الرياض جدة نيوم",
  ],
  openGraph: {
    title: "Featured Projects — Asaheeb Properties",
    description: "Curated apartments, villas, commercial land, and towers across Saudi Arabia.",
    url: "https://asaheeb.com/projects",
    siteName: "Asaheeb Properties",
  },
  alternates: {
    canonical: "https://asaheeb.com/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
