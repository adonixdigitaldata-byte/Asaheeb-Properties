import type { Metadata } from "next";
import MortgageCalculatorPage from "@/components/mortgage-calculator/MortgageCalculatorPage";

export const metadata: Metadata = {
  title: "Mortgage Calculator | حاسبة التمويل العقاري — Asaheeb Real Estate",
  description:
    "Calculate your Saudi real estate mortgage estimate instantly. Compare rates across 10 top Saudi banks, adjust down payment and loan period, and apply for financing in under 2 minutes. No login required.",
  keywords: [
    "mortgage calculator Saudi Arabia",
    "Saudi home loan calculator",
    "حاسبة التمويل العقاري",
    "قرض عقاري السعودية",
    "Asaheeb mortgage",
    "Saudi bank rates",
  ],
  openGraph: {
    title: "Mortgage Calculator — Asaheeb Real Estate",
    description:
      "Compare mortgage rates across 10 Saudi banks and calculate your monthly instalment instantly.",
    type: "website",
    locale: "en_SA",
  },
};

export default function MortgageCalculatorRoute() {
  return <MortgageCalculatorPage />;
}
