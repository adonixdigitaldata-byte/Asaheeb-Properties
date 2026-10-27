import { MetadataRoute } from "next";
import { getPublishedProjects, getPublishedBlogs } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.asaheebrealestate.com";

  // Static routes with stable reference date
  const siteBuildDate = new Date("2026-10-26T00:00:00Z");
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/projects",
    "/services",
    "/faq",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: siteBuildDate,
    changeFrequency: (route === "" ? "daily" : route === "/faq" ? "daily" : "weekly") as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: route === "" ? 1.0 : route === "/faq" ? 0.95 : route === "/projects" || route === "/blog" ? 0.9 : 0.8,
  }));

  // Fetch dynamic projects from DB
  const dbProjects = await getPublishedProjects();
  const projectRoutes: MetadataRoute.Sitemap = dbProjects.map((p) => ({
    url: `${baseUrl}/projects/${p.id}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : (p.created_at ? new Date(p.created_at) : siteBuildDate),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Fetch dynamic blogs from DB with authentic content modification dates
  const dbBlogs = await getPublishedBlogs();
  const blogRoutes: MetadataRoute.Sitemap = dbBlogs.map((b) => ({
    url: `${baseUrl}/blog/${b.id}`,
    lastModified: b.updated_at ? new Date(b.updated_at) : (b.created_at ? new Date(b.created_at) : siteBuildDate),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
