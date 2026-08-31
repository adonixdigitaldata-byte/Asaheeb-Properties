import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Asaheeb Real Estate | Speak to a Saudi Real Estate Advisor",
  description:
    "Get in touch with Asaheeb Real Estate in Riyadh & Jeddah. Instant WhatsApp support, bilingual advisory in Arabic and English, and custom portfolio inquiries.",
  keywords: [
    "Contact Asaheeb Real Estate",
    "Saudi real estate advisor WhatsApp",
    "Riyadh property consultation",
    "تواصل مع أصاهيب العقارية",
  ],
  openGraph: {
    title: "Contact Asaheeb Real Estate — Jeddah & Riyadh Advisory Offices",
    description: "Connect with Asaheeb's real estate investment specialists in Saudi Arabia.",
    url: "https://www.asaheebrealestate.com/contact",
    siteName: "Asaheeb Real Estate",
    images: [
      {
        url: "https://www.asaheebrealestate.com/icon.png",
        width: 1200,
        height: 1200,
        alt: "Contact Asaheeb Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Asaheeb Real Estate — Speak to a Property Advisor",
    description: "Connect with Asaheeb's real estate investment specialists in Saudi Arabia.",
    images: ["https://www.asaheebrealestate.com/icon.png"],
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com/contact",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.asaheebrealestate.com/contact#webpage",
      "url": "https://www.asaheebrealestate.com/contact",
      "name": "Contact Asaheeb Real Estate",
      "description": "Get in touch with Asaheeb Real Estate in Jeddah & Riyadh. Instant WhatsApp support, bilingual advisory in Arabic and English, and custom property inquiries.",
      "mainEntity": {
        "@type": "RealEstateAgent",
        "@id": "https://www.asaheebrealestate.com/#organization",
        "name": "Asaheeb Real Estate",
        "telephone": "+966565654450",
        "email": "buy@asaheebrealestate.com",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+966565654450",
            "contactType": "sales",
            "areaServed": "SA",
            "availableLanguage": ["Arabic", "English"]
          }
        ]
      }
    }
  ]
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {children}
    </>
  );
}
