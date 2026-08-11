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
    title: "Contact Us — Asaheeb Real Estate",
    description: "Speak to a Saudi real estate advisor today. Instant WhatsApp support.",
    url: "https://asaheebrealestate.com/contact",
    siteName: "Asaheeb Real Estate",
  },
  alternates: {
    canonical: "https://asaheebrealestate.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
