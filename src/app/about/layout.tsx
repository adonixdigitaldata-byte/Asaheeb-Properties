import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Asaheeb Properties | Saudi Real Estate Investment Brokerage",
  description:
    "Learn about Asaheeb Properties, Saudi Arabia's premier real estate investment brokerage. Curated deal sourcing, Vision 2030 corridor alignment, and institutional due diligence.",
  keywords: [
    "About Asaheeb Properties",
    "Saudi real estate brokerage",
    "Vision 2030 real estate advisory",
    "Riyadh property investment firm",
    "من نحن أصاهيب العقارية",
    "شركة استثمار عقاري السعودية",
  ],
  openGraph: {
    title: "About Us — Asaheeb Properties",
    description: "Saudi Arabia's premier real estate investment brokerage. Curated deals aligned with Vision 2030.",
    url: "https://asaheeb.com/about",
    siteName: "Asaheeb Properties",
  },
  alternates: {
    canonical: "https://asaheeb.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
