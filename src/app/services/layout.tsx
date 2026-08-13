import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services — Asaheeb Real Estate | Real Estate Investment Advisory",
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
    title: "Real Estate Advisory & Investment Services — Asaheeb",
    description: "Curated deal sourcing, 40-point due diligence, title check, and portfolio management.",
    url: "https://www.asaheebrealestate.com/services",
    siteName: "Asaheeb Real Estate",
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
