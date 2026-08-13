import { MetadataRoute } from "next";
import { PROJECTS_DATA } from "@/data/projectsData";
import { POSTS } from "@/data/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
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
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/projects" || route === "/blog" ? 0.9 : 0.8,
  }));

  // Dynamic project routes
  const projectRoutes: MetadataRoute.Sitemap = PROJECTS_DATA.map((proj) => ({
    url: `${baseUrl}/projects/${proj.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic blog routes
  const blogRoutes: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
