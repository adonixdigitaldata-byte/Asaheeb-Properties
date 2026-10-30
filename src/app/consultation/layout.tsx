import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "1-on-1 Strategic Real Estate Advisory with Founder Nabeel | Asaheeb Real Estate",
  description:
    "Book a private 1-on-1 real estate investment consultation with Founder Nabeel. Pay the advisory fee upfront to secure your slot, and get your fee credited back toward your property purchase down payment when you buy with Asaheeb.",
  keywords: [
    "Saudi real estate consultation",
    "Nabeel Asaheeb Real Estate",
    "Jeddah property investment advisor",
    "Riyadh off-plan investment consultation",
    "Vision 2030 real estate advisory",
    "استشارة عقارية السعودية",
    "مستشار عقاري جدة الرياض",
  ],
  openGraph: {
    title: "1-on-1 Strategic Real Estate Advisory with Founder Nabeel | Asaheeb Real Estate",
    description:
      "Exclusive 1-on-1 investment consultation with Founder Nabeel. Limited to 10 executive sessions per week. Pay upfront to book, fee credited back when you purchase any property through Asaheeb.",
    url: "https://www.asaheebrealestate.com/consultation",
    siteName: "Asaheeb Real Estate",
    images: [
      {
        url: "https://www.asaheebrealestate.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Asaheeb Real Estate VIP Consultation",
      },
    ],
    locale: "en_US",
    alternateLocale: "ar_SA",
    type: "website",
  },
  alternates: {
    canonical: "https://www.asaheebrealestate.com/consultation",
  },
};

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
