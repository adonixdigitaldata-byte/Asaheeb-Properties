import { Metadata } from "next";
import FairmontLandingClient from "./FairmontLandingClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Fairmont Residences Rua Al Madinah | Exclusive Pre-Launch — Asaheeb Real Estate",
  description:
    "A home close to your heart: The privilege of living next to The Prophet’s Mosque. Exclusive pre-launch of 120 ultra-luxury Fairmont branded residences in Rua Al Madinah, developed by Rua Al Madinah Holding (PIF). Register your interest now.",
  keywords: [
    "Fairmont Residences Rua Al Madinah",
    "فيرمونت ريزيدنسز رؤى المدينة",
    "Rua Al Madinah project",
    "مشروع رؤى المدينة",
    "Prophet's Mosque residences",
    "عقارات بجوار المسجد النبوي",
    "luxury apartments Madinah",
    "Accor ownership benefits Madinah",
    "Asaheeb Real Estate new launches",
    "Madinah branded residences",
    "PIF real estate Madinah",
  ],
  openGraph: {
    title: "Fairmont Residences Rua Al Madinah | Exclusive Pre-Launch",
    description:
      "A home close to your heart. The privilege of living next to The Prophet’s Mosque in the heart of Madinah. 120 ultra-luxury branded residences.",
    url: "https://www.asaheebrealestate.com/new-launches/fairmont-residences-rua-al-madinah",
    siteName: "Asaheeb Real Estate",
    images: [
      {
        url: "https://www.asaheebrealestate.com/images/projects/fairmont-rua-al-madinah/hero-exterior.png",
        width: 1200,
        height: 675,
        alt: "Fairmont Residences Rua Al Madinah next to The Prophet's Mosque",
      },
    ],
    locale: "en_US",
    alternateLocale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fairmont Residences Rua Al Madinah | Exclusive Pre-Launch",
    description: "The privilege of living next to The Prophet’s Mosque. Register your pre-launch interest.",
    images: ["https://www.asaheebrealestate.com/images/projects/fairmont-rua-al-madinah/hero-exterior.png"],
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com/new-launches/fairmont-residences-rua-al-madinah",
  },
};

export default function FairmontResidencesPreLaunchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "Fairmont Residences Rua Al Madinah",
    "alternateName": "فيرمونت ريزيدنسز رؤى المدينة",
    "description":
      "Exclusive ultra-luxury branded residential collection directly adjacent to The Prophet's Mosque in Madinah, developed by Rua Al Madinah Holding in collaboration with Fairmont (Accor).",
    "url": "https://www.asaheebrealestate.com/new-launches/fairmont-residences-rua-al-madinah",
    "image": "https://www.asaheebrealestate.com/images/projects/fairmont-rua-al-madinah/hero-exterior.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Madinah",
      "addressRegion": "Rua Al Madinah, Directly Adjacent to Al-Masjid an-Nabawi",
      "addressCountry": "SA",
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "SAR",
      "price": "Price on Application",
      "availability": "https://schema.org/PreOrder",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FairmontLandingClient />
    </>
  );
}
