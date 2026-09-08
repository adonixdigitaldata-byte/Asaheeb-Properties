import { Metadata } from "next";
import NewLaunchesClient from "./NewLaunchesClient";

export const metadata: Metadata = {
  title: "New Launches & Pre-Launch Properties | Asaheeb Real Estate",
  description:
    "Explore exclusive new property launches and pre-launch real estate investment opportunities in Saudi Arabia, including Fairmont Residences Rua Al Madinah adjacent to The Prophet's Mosque.",
  keywords: [
    "Saudi new launches",
    "pre-launch property Saudi Arabia",
    "Fairmont Residences Madinah",
    "Rua Al Madinah investment",
    "إطلاقات عقارية جديدة السعودية",
    "مشاريع تحت الإنشاء المدينة المنورة",
  ],
  openGraph: {
    title: "New Launches & Pre-Launch Properties | Asaheeb Real Estate",
    description:
      "Exclusive pre-launch residential & branded property opportunities across Saudi Arabia's Vision 2030 destinations.",
    url: "https://www.asaheebrealestate.com/new-launches",
    siteName: "Asaheeb Real Estate",
  },
};

export default function NewLaunchesPage() {
  return <NewLaunchesClient />;
}
