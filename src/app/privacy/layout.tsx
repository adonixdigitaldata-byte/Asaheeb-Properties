import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Asaheeb Real Estate | KSA Data Protection Compliance",
  description:
    "Read the Privacy Policy of Asaheeb Real Estate. Learn how we handle investor data, client confidentiality, cookies, and compliance with Saudi Personal Data Protection Law (PDPL).",
  keywords: [
    "Asaheeb Real Estate privacy policy",
    "Saudi Arabia real estate data protection",
    "PDPL compliance Saudi Arabia",
    " investor confidentiality KSA",
    "سياسة الخصوصية أصاهيب العقارية",
  ],
  openGraph: {
    title: "Privacy Policy — Asaheeb Real Estate",
    description: "Investor data protection and privacy standards in Saudi Arabia.",
    url: "https://www.asaheebrealestate.com/privacy",
    siteName: "Asaheeb Real Estate",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — Asaheeb Real Estate",
    description: "Compliance with Saudi Personal Data Protection Law (PDPL) and client confidentiality.",
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
