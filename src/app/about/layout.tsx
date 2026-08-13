import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Asaheeb Real Estate | Saudi Real Estate Investment Brokerage",
  description:
    "Learn about Asaheeb Real Estate, Saudi Arabia's premier real estate investment brokerage. Curated deal sourcing, Vision 2030 corridor alignment, and institutional due diligence.",
  keywords: [
    "About Asaheeb Real Estate",
    "Saudi real estate brokerage",
    "Vision 2030 real estate advisory",
    "Riyadh property investment firm",
    "من نحن أصاهيب العقارية",
    "شركة استثمار عقاري السعودية",
  ],
  openGraph: {
    title: "About Asaheeb Real Estate — Strategic Saudi Investment Advisory",
    description:
      "Learn about Asaheeb Real Estate — leading luxury real estate investment advisors in Saudi Arabia. Specializing in high-yield assets aligned with Vision 2030.",
    url: "https://www.asaheebrealestate.com/about",
    siteName: "Asaheeb Real Estate",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Asaheeb Real Estate — Vision 2030 Property Advisors",
    description: "Curated Saudi real estate investments. Institutional due diligence & bilingual advisory.",
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
