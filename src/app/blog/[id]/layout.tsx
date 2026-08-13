import { Metadata } from "next";
import { BLOG_POSTS, POSTS } from "@/data/blogData";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const postMeta = POSTS.find((p) => p.id === id);
  const postDetail = BLOG_POSTS[id];

  const title = postDetail
    ? `${postDetail.titleEn} — Asaheeb Market Intelligence`
    : postMeta
    ? `${postMeta.titleEn} — Asaheeb Market Intelligence`
    : `${id.replace(/-/g, " ").toUpperCase()} | Asaheeb Real Estate Blog`;

  const description = postMeta
    ? postMeta.excerptEn
    : postDetail
    ? postDetail.summaryEn.join(" ")
    : `Saudi real estate market intelligence, Vision 2030 updates, and investment advisory.`;

  const pageUrl = `https://www.asaheebrealestate.com/blog/${id}`;
  const imageUrl = "/images/og-image.png";

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

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
