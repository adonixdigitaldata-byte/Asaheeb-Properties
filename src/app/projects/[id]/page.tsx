import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectDetailBySlug, getPublishedProjects } from "@/lib/api";
import { getDiscountStatus } from "@/lib/offerUtils";
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

  const rawOffer = (dbProject as any)?.discount_offer || (dbProject as any)?.discountOffer;
  const offerStatus = getDiscountStatus(rawOffer);
  const isOfferActive = offerStatus.isActive && !offerStatus.isExpired;

  let title = `${dbProject.name_en} (${dbProject.name_ar}) — Asaheeb Real Estate`;
  if (isOfferActive && offerStatus.offer?.title_en) {
    title = `${offerStatus.offer.title_en} | ${dbProject.name_en} — Asaheeb Real Estate`;
  }

  let description = dbProject.overview_en
    ? `${dbProject.overview_en.substring(0, 160)}...`
    : `Discover investment opportunities in ${dbProject.name_en}. Detailed pricing, size, amenities, brochure, and advisory in ${dbProject.city_en}.`;

  if (isOfferActive && offerStatus.offer) {
    const offerBadge = offerStatus.badgeLabelEn;
    const priceText = offerStatus.offer.discounted_price_en || dbProject.starting_price_en;
    description = `${offerBadge}: ${offerStatus.offer.title_en}. Starting at ${priceText || "special rates"}. ${description}`;
  }

  const rawImg = dbProject.images?.[0]?.url;
  const imageUrl = rawImg
    ? rawImg.startsWith("http")
      ? rawImg
      : `https://www.asaheebrealestate.com${rawImg.startsWith("/") ? "" : "/"}${rawImg}`
    : "https://www.asaheebrealestate.com/images/og-image.jpg";
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

  const rawOffer = (project as any)?.discountOffer || (project as any)?.discount_offer;
  const offerStatus = getDiscountStatus(rawOffer);
  const isOfferActive = offerStatus.isActive && !offerStatus.isExpired;

  const rawImg = project.images?.[0]?.url;
  const imageUrl = rawImg
    ? rawImg.startsWith("http")
      ? rawImg
      : `https://www.asaheebrealestate.com${rawImg.startsWith("/") ? "" : "/"}${rawImg}`
    : "https://www.asaheebrealestate.com/images/og-image.jpg";
  const pageUrl = `https://www.asaheebrealestate.com/projects/${id}`;

  // JSON-LD RealEstateListing & Offer Schema for Google Search Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": project.nameEn,
    "alternateName": project.nameAr,
    "description": project.overviewEn,
    "url": pageUrl,
    "image": imageUrl,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": project.cityEn,
      "addressRegion": project.districtEn,
      "addressCountry": "SA",
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "SAR",
      "price": isOfferActive && offerStatus.offer?.discounted_price_en
        ? offerStatus.offer.discounted_price_en
        : project.startingPriceEn,
      "priceValidUntil": isOfferActive && offerStatus.offer?.valid_until ? offerStatus.offer.valid_until : undefined,
      "availability": "https://schema.org/InStock",
      "validFrom": isOfferActive ? new Date().toISOString() : undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DynamicProjectDetailClient project={project} />
    </>
  );
}
