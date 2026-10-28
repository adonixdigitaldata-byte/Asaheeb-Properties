import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "1-on-1 Strategic Real Estate Advisory with Founder Nabeel | Asaheeb Real Estate",
  description:
    "Schedule a private 1-on-1 real estate investment consultation with Nabeel, Founder of Asaheeb Real Estate. Capped at 10 sessions/week. 100% credited towards your property purchase in Saudi Arabia.",
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
      "Exclusive 1-on-1 investment consultation with Nabeel. Limited to 10 executive sessions per week. Booking fee is 100% credited towards your property purchase.",
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
