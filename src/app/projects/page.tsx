import { Metadata } from "next";
import { getPublishedProjectDetails } from "@/lib/api";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Curated Saudi Real Estate Portfolio | Asaheeb Real Estate",
  description:
    "Explore premier vetted investment properties in Riyadh, Jeddah, and Madinah. High-yield residential and commercial projects aligned with Saudi Vision 2030.",
  alternates: {
    canonical: "https://www.asaheebrealestate.com/projects",
  },
};

// Revalidate every 60 seconds (ISR) or on-demand
export const revalidate = 60;

export default async function ProjectsPage() {
  const initialProjects = await getPublishedProjectDetails();

  return <ProjectsClient initialProjects={initialProjects} />;
}
