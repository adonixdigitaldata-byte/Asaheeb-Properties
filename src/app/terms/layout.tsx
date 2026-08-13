import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Asaheeb Real Estate | KSA Regulatory & Advisory Terms",
  description:
    "Review the Terms of Use for Asaheeb Real Estate. Governing brokerage advisory, property due diligence, RETT tax obligations, and RERA compliance in Saudi Arabia.",
  keywords: [
    "Asaheeb Real Estate terms of use",
    "Saudi real estate brokerage terms",
    "RETT tax disclaimer KSA",
    "RERA regulated advisory terms",
    "الشروط والأحكام أصاهيب العقارية",
  ],
  openGraph: {
    title: "Terms of Use — Asaheeb Real Estate",
    description: "Governing terms for real estate advisory and brokerage services in Saudi Arabia.",
    url: "https://www.asaheebrealestate.com/terms",
    siteName: "Asaheeb Real Estate",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use — Asaheeb Real Estate",
    description: "Compliance with Saudi Arabian real estate laws and RERA regulations.",
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com/terms",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
