import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services — Asaheeb Properties | Real Estate Investment Advisory",
  description:
    "Institutional-grade real estate services in Saudi Arabia — Asset Sourcing, 40-point Due Diligence, Legal & RERA support, and Portfolio Strategy Advisory.",
  keywords: [
    "Saudi real estate advisory services",
    "property due diligence Saudi Arabia",
    "RERA legal support Riyadh",
    "real estate asset sourcing KSA",
    "خدمات الاستثمار العقاري السعودية",
  ],
  openGraph: {
    title: "Our Services — Asaheeb Properties",
    description: "Asset sourcing, institutional due diligence, legal support, and portfolio strategy.",
    url: "https://asaheeb.com/services",
    siteName: "Asaheeb Properties",
  },
  alternates: {
    canonical: "https://asaheeb.com/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
