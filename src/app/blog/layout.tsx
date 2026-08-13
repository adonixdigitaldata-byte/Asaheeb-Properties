import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Market Intelligence — Asaheeb Real Estate",
  description:
    "Saudi Arabia real estate market insights, Vision 2030 analysis, rental yield reports, and legal investment guides for foreign & domestic investors.",
  keywords: [
    "Saudi real estate market blog",
    "Vision 2030 property news",
    "Riyadh rental yields 2025",
    "buying property in Saudi Arabia foreigner guide",
    "مدونة العقارات السعودية",
  ],
  openGraph: {
    title: "Saudi Real Estate Market Intelligence & Vision 2030 Blog — Asaheeb",
    description: "Expert market briefings, yield analysis, regulatory updates, and property investment guides.",
    url: "https://www.asaheebrealestate.com/blog",
    siteName: "Asaheeb Real Estate",
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
