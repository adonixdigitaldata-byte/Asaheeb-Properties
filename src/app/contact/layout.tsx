import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Asaheeb Properties | Speak to a Saudi Real Estate Advisor",
  description:
    "Get in touch with Asaheeb Properties in Riyadh. Instant WhatsApp support, bilingual advisory in Arabic and English, and custom portfolio inquiries.",
  keywords: [
    "Contact Asaheeb Properties",
    "Saudi real estate advisor WhatsApp",
    "Riyadh property consultation",
    "تواصل مع أصاهيب العقارية",
  ],
  openGraph: {
    title: "Contact Us — Asaheeb Properties",
    description: "Speak to a Saudi real estate advisor today. Instant WhatsApp support.",
    url: "https://asaheeb.com/contact",
    siteName: "Asaheeb Properties",
  },
  alternates: {
    canonical: "https://asaheeb.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
