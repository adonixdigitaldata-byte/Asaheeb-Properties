import { Metadata } from "next";
import { PROJECTS_DATA } from "@/data/projectsData";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS_DATA.find((p) => p.id === id);

  const title = project
    ? `${project.nameEn} — Asaheeb Real Estate Portfolio`
    : `${id.replace(/-/g, " ").toUpperCase()} | Asaheeb Real Estate Saudi Arabia`;

  const description = project?.overviewEn
    ? `${project.overviewEn.substring(0, 160)}...`
    : `Discover investment opportunities in ${id}. Detailed pricing, size, amenities, brochure, and advisory in Jeddah & Riyadh.`;

  const imageUrl = project?.images?.[0]?.url || "/images/og-image.png";
  const pageUrl = `https://www.asaheebrealestate.com/projects/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Asaheeb Real Estate",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default function ProjectDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
