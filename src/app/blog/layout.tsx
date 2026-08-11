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
    title: "Blog & Market Intelligence — Asaheeb Real Estate",
    description: "Market intelligence, legal guides, and Vision 2030 updates.",
    url: "https://asaheebrealestate.com/blog",
    siteName: "Asaheeb Real Estate",
  },
  alternates: {
    canonical: "https://asaheebrealestate.com/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
