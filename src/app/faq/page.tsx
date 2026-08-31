import { Metadata } from "next";
import FaqClient from "./FaqClient";
import { FAQ_DATA } from "@/data/faqData";

export const metadata: Metadata = {
  title: "Saudi Expat Real Estate Guide & 157 FAQs — Asaheeb Real Estate",
  description:
    "Comprehensive guide and 157 verified FAQs on buying property in Saudi Arabia for expats and foreign investors. REGA regulations, 5% RETT tax, 2% ownership fee, and SAR 4M Premium Residency in Jeddah and Riyadh.",
  keywords: [
    "can foreigners buy property in Saudi Arabia",
    "expat buying property Saudi Arabia",
    "Saudi Arabia real estate law for non-Saudis",
    "buy property in Jeddah foreigner",
    "buy property in Riyadh foreigner",
    "Saudi Real Estate Transaction Tax RETT 5%",
    "REGA non-Saudi property fee 2%",
    "Saudi Premium Residency real estate SAR 4M",
    "شراء عقار لغير السعوديين",
    "تملك الأجانب للعقار في السعودية",
    "ضريبة التصرفات العقارية ورسم التملك",
    "رخصة فال وساطة عقارية جدة الرياض"
  ],
  openGraph: {
    title: "Saudi Expat Real Estate Guide & 157 FAQs — Asaheeb Real Estate",
    description:
      "Authoritative answers to 157 questions on foreign and expat property ownership, REGA FAL licensing, and Vision 2030 investment in Saudi Arabia.",
    url: "https://www.asaheebrealestate.com/faq",
    siteName: "Asaheeb Real Estate",
    images: [
      {
        url: "https://www.asaheebrealestate.com/icon.png",
        width: 1200,
        height: 1200,
        alt: "Asaheeb Real Estate Expat Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saudi Expat Real Estate Guide & 157 FAQs — Asaheeb Real Estate",
    description: "Complete guide on buying property in Saudi Arabia as an expat or foreign investor.",
    images: ["https://www.asaheebrealestate.com/icon.png"],
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com/faq",
  },
};

export default function FaqPage() {
  // Build Google-compliant FAQPage JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map((faq) => ({
      "@type": "Question",
      "name": faq.questionEn,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${faq.answerEn} (العربية: ${faq.answerAr})`
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient />
    </>
  );
}
