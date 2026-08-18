import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectDetailBySlug, getPublishedProjects } from "@/lib/api";
import DynamicProjectDetailClient from "./ProjectDetailClient";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const dbProject = await getProjectBySlug(id);

  if (!dbProject) {
    return {
      title: "Project Not Found | Asaheeb Real Estate",
    };
  }

  const title = `${dbProject.name_en} (${dbProject.name_ar}) — Asaheeb Real Estate Portfolio`;
  const description = dbProject.overview_en
    ? `${dbProject.overview_en.substring(0, 160)}...`
    : `Discover investment opportunities in ${dbProject.name_en}. Detailed pricing, size, amenities, brochure, and advisory in ${dbProject.city_en}.`;

  const imageUrl = dbProject.images?.[0]?.url || "/images/og-image.png";
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

export default async function DynamicProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectDetailBySlug(id);

  if (!project) {
    notFound();
  }

  return <DynamicProjectDetailClient project={project} />;
}
