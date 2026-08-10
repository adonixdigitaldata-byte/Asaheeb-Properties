"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import UnderConstructionPage from "@/components/shared/UnderConstructionPage";

export default function DedicatedUnderConstructionPage() {
  return (
    <LanguageProvider>
      <UnderConstructionPage pageNameEn="This Section" pageNameAr="هذا القسم" />
    </LanguageProvider>
  );
}
