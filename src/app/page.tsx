"use client";

import WhatWeDoSection from "@/components/what-we-do/WhatWeDoSection";
import Hero from "@/components/hero/Hero";
import ProjectsSection from "@/components/sections/ProjectsSection";
import LeadFormSection from "@/components/sections/LeadFormSection";
import TurningPointSection from "@/components/sections/TurningPointSection";
import PillarsSection from "@/components/sections/PillarsSection";
import MegaProjectsSection from "@/components/sections/MegaProjectsSection";
import StatsSection from "@/components/sections/StatsSection";
import PivotSection from "@/components/sections/PivotSection";
import WhyNowSection from "@/components/sections/WhyNowSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";
export default function Home() {
  return (
    <>
      <main className="relative bg-[var(--color-ink)] selection:bg-[var(--color-horizon-gold)] selection:text-[var(--color-ink)] transition-all duration-300 pb-16 md:pb-0">

        {/* ── Section 1: "What Asaheeb Does" (2D Layered Parallax Hero) ── */}
        <WhatWeDoSection />

        {/* ── Section 2: "Why Invest in Saudi Arabia" (Cinematic Transformation Video) ── */}
        <div id="section-transformation">
          <Hero />
        </div>

        {/* ── Section 3: Featured Projects (curated, not marketplace) ── */}
        <ProjectsSection />

        {/* ── Section 4: Lead Capture Form (convert while intent is hot) ── */}
        <LeadFormSection />

        {/* ── Section 5: The Turning Point (Vision 2030 context) ── */}
        <TurningPointSection />

        {/* ── Section 6: Vision 2030 Pillars ── */}
        <PillarsSection />

        {/* ── Section 7: Mega Projects (horizontal scroll) ── */}
        <MegaProjectsSection />

        {/* ── Section 8: The Numbers (count-up stats) ── */}
        <StatsSection />

        {/* ── Section 9: The Pivot (single statement) ── */}
        <PivotSection />

        {/* ── Section 10: Why Real Estate, Why Now ── */}
        <WhyNowSection />

        {/* ── Section 11: How Asaheeb Works (4-step) ── */}
        <HowItWorksSection />

        {/* ── Section 12: Social Proof ── */}
        <SocialProofSection />

        {/* ── Section 13: Standardized Shared Footer ── */}
        <PageFooter />

      </main>

      {/* ── Mobile Bottom Navigation (md:hidden) ── */}
      <MobileBottomNav />
    </>
  );
}


