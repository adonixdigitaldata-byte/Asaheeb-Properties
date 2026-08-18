import { Metadata } from "next";
import { getPublishedPostMetadata, getFeaturedBlog, mapBlogToMetadata } from "@/lib/api";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Saudi Real Estate Intelligence & Research | Asaheeb Blog",
  description:
    "Saudi Arabia real estate market insights, Vision 2030 developments, legal guides for foreign investors, and capital appreciation analysis.",
  alternates: {
    canonical: "https://www.asaheebrealestate.com/blog",
  },
};

// Revalidate every 60 seconds (ISR) or on-demand
export const revalidate = 60;

export default async function BlogPage() {
  const [posts, featBlog] = await Promise.all([
    getPublishedPostMetadata(),
    getFeaturedBlog(),
  ]);

  const featured = featBlog ? mapBlogToMetadata(featBlog) : (posts.length > 0 ? posts[0] : null);

  return <BlogClient initialPosts={posts} initialFeatured={featured} />;
}
