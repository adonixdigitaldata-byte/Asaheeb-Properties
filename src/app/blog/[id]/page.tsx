import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogDetailBySlug, getPublishedBlogs } from "@/lib/api";
import DynamicBlogDetailClient from "./BlogDetailClient";

// Revalidate every 24 hours (ISR)
export const revalidate = 86400;
// Disable on-demand generation for unknown slugs to prevent bot probe cache writes
export const dynamicParams = false;

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

  // Use dedicated SEO title if available, otherwise fall back to English title cleanly
  const baseTitle = dbBlog.seo_title_en || dbBlog.title_en;
  const title = `${baseTitle} | Asaheeb Real Estate`;
  const description =
    dbBlog.meta_description_en ||
    dbBlog.excerpt_en ||
    "Saudi real estate market intelligence, Vision 2030 updates, and investment advisory.";
  const pageUrl = `https://www.asaheebrealestate.com/blog/${id}`;
  const rawImg = dbBlog.cover_image_url;
  const imageUrl = rawImg
    ? rawImg.startsWith("http")
      ? rawImg
      : `https://www.asaheebrealestate.com${rawImg.startsWith("/") ? "" : "/"}${rawImg}`
    : "https://www.asaheebrealestate.com/images/og-image.jpg";
  const imageAlt = dbBlog.cover_image_alt_en || baseTitle;

  const keywordsList: string[] = [];
  if (dbBlog.focus_keyword_en) keywordsList.push(dbBlog.focus_keyword_en);
  if (dbBlog.secondary_keywords_en && Array.isArray(dbBlog.secondary_keywords_en)) {
    keywordsList.push(...dbBlog.secondary_keywords_en);
  }

  return {
    title,
    description,
    keywords: keywordsList.length > 0 ? keywordsList : undefined,
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
          alt: imageAlt,
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

  const rawPostImg = post.coverImageUrl;
  const articleImageUrl = rawPostImg
    ? rawPostImg.startsWith("http")
      ? rawPostImg
      : `https://www.asaheebrealestate.com${rawPostImg.startsWith("/") ? "" : "/"}${rawPostImg}`
    : "https://www.asaheebrealestate.com/images/og-image.jpg";

  const schemaKeywords = [post.focusKeywordEn, ...(post.secondaryKeywordsEn || [])]
    .filter(Boolean)
    .join(", ");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.seoTitleEn || post.titleEn || post.titleAr,
    "description":
      post.metaDescriptionEn ||
      post.summaryEn?.[0] ||
      post.summaryAr?.[0] ||
      post.titleEn ||
      "Saudi real estate market intelligence by Asaheeb Real Estate.",
    "image": articleImageUrl,
    "datePublished": post.createdAt || "2026-01-01T00:00:00Z",
    "dateModified": post.updatedAt || post.createdAt || "2026-01-01T00:00:00Z",
    "inLanguage": ["en", "ar"],
    ...(schemaKeywords ? { "keywords": schemaKeywords } : {}),
    "author": {
      "@type": "Organization",
      "name": post.authorEn || post.authorAr || "Asaheeb Real Estate",
      "url": "https://www.asaheebrealestate.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Asaheeb Real Estate",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.asaheebrealestate.com/icon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.asaheebrealestate.com/blog/${id}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <DynamicBlogDetailClient post={post} />
    </>
  );
}
