import { MetadataRoute } from "next";
import { getPublishedProjects, getPublishedBlogs } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.asaheebrealestate.com";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/projects",
    "/services",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "daily" : "weekly") as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: route === "" ? 1.0 : route === "/projects" || route === "/blog" ? 0.9 : 0.8,
  }));

  // Fetch dynamic projects from DB
  const dbProjects = await getPublishedProjects();
  const projectRoutes: MetadataRoute.Sitemap = dbProjects.map((p) => ({
    url: `${baseUrl}/projects/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Fetch dynamic blogs from DB
  const dbBlogs = await getPublishedBlogs();
  const blogRoutes: MetadataRoute.Sitemap = dbBlogs.map((b) => ({
    url: `${baseUrl}/blog/${b.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
