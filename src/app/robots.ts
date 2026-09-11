import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.asaheebrealestate.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/leads/", "/_next/", "/new-launches", "/new-launches/"],
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Applebot-Extended",
          "Bingbot",
          "Googlebot",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/faq", "/projects", "/blog", "/services", "/about"],
        disallow: ["/api/leads/", "/new-launches", "/new-launches/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
