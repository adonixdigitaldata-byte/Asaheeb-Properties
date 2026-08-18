import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogDetailBySlug, getPublishedBlogs } from "@/lib/api";
import DynamicBlogDetailClient from "./BlogDetailClient";

export const revalidate = 60;

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();
  return blogs.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const dbBlog = await getBlogBySlug(id);

  if (!dbBlog) {
    return {
      title: "Article Not Found | Asaheeb Real Estate",
    };
  }

  const title = `${dbBlog.title_en} (${dbBlog.title_ar}) — Asaheeb Market Intelligence`;
  const description = dbBlog.excerpt_en || "Saudi real estate market intelligence, Vision 2030 updates, and investment advisory.";
  const pageUrl = `https://www.asaheebrealestate.com/blog/${id}`;
  const imageUrl = dbBlog.cover_image_url || "/images/og-image.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Asaheeb Real Estate",
      type: "article",
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

export default async function DynamicBlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogDetailBySlug(id);

  if (!post) {
    notFound();
  }

  return <DynamicBlogDetailClient post={post} />;
}
