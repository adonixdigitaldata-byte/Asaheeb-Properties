"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PrivateAdvisoryBannerProps {
  onContact: () => void;
  isRTL?: boolean;
}

export default function PrivateAdvisoryBanner({
  onContact,
  isRTL = false,
}: PrivateAdvisoryBannerProps) {
  return (
    <section className="relative py-14 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 border-t border-[rgba(184,135,59,0.12)] overflow-hidden max-w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto border rounded-sm p-6 sm:p-12 relative overflow-hidden"
        style={{
          borderColor: "rgba(184,135,59,0.35)",
          backgroundColor: "#161713",
        }}
      >
        {/* Architectural Image Backdrop */}
        <Image
          src="/images/madinah-luxury-estate.jpg"
          alt="Jeddah & Madinah Luxury Real Estate"
          fill
          className="object-cover object-center opacity-25 pointer-events-none"
          sizes="(max-width: 1280px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12130F] via-[#12130F]/85 to-[#12130F]/50 pointer-events-none" />

        <div className={`relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 ${isRTL ? "lg:flex-row-reverse text-right" : "text-left"}`}>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 border rounded-full" style={{ borderColor: "rgba(184,135,59,0.3)", backgroundColor: "rgba(18,19,15,0.7)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B]" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B] font-semibold">
                {isRTL ? "المكتب الاستشاري الخاص" : "Private Financing Desk"}
              </span>
            </div>

            <h3 className="font-display text-xl sm:text-3xl text-[#E8DFCE] font-normal leading-tight">
              {isRTL ? (
                <>
                  هل تبحث عن هيكلة تمويلية خاصة لعقار فاخر أو محفظة استثمارية؟
                </>
              ) : (
                <>
                  Require Bespoke Financing for a Ultra-Luxury Villa or Commercial Portfolio?
                </>
              )}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#C5BCAD] mt-2.5 leading-relaxed">
              {isRTL
                ? "يقدم مستشارو أصاهيب حلولاً تمويلية حصرية لكبار المستثمرين والشركات مع كبرى إدارات الخدمات المصرفية الخاصة في المملكة بهوامش ربح تفضيلية."
                : "Asaheeb's senior advisory desk coordinates directly with private banking divisions across Saudi Arabia to secure custom LTV ratios, preferential profit margins, and off-market terms."}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              type="button"
              onClick={onContact}
              className="px-8 py-3.5 font-mono text-[11px] tracking-[0.2em] uppercase font-bold text-[#12130F] bg-[#B8873B] hover:bg-[#c79748] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(184,135,59,0.3)] cursor-pointer text-center"
            >
              {isRTL ? "تواصل مع مستشار خاص ↗" : "Consult a Specialist ↗"}
            </button>
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 font-mono text-[11px] tracking-[0.2em] uppercase font-semibold text-[#E8DFCE] border border-[rgba(184,135,59,0.3)] hover:border-[#B8873B] hover:text-[#B8873B] transition-all text-center flex items-center justify-center gap-2"
            >
              <span>WhatsApp</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
