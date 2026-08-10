"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";

interface Props {
  pageNameEn: string;
  pageNameAr: string;
}

export default function UnderConstructionPage({ pageNameEn, pageNameAr }: Props) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <main className="relative bg-[#12130F] min-h-screen flex flex-col justify-between" dir={isAr ? "rtl" : "ltr"}>
      <PageNav />

      <section className="relative z-10 flex-1 flex items-center justify-center pt-32 pb-20 px-6 sm:px-10 lg:px-20 text-center">
        {/* Background ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(184,135,59,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#B8873B]/40 bg-[#B8873B]/10 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-ping" />
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#B8873B] font-semibold">
              {isAr ? "قيد التطوير والتجهيز" : "Under Construction"}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl text-[#E8DFCE] font-normal leading-tight">
            {isAr ? (
              <>صفحة <span className="italic text-[#B8873B]">{pageNameAr}</span> قيد التحديث</>
            ) : (
              <><span className="italic text-[#B8873B]">{pageNameEn}</span> Page Under Construction</>
            )}
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#8C8477] leading-relaxed max-w-xl mx-auto">
            {isAr
              ? "نعمل حالياً على تحديث وتجهيز المحتوى والخدمات الخاصة بهذه الصفحة لتلبية أعلى المعايير. يمكنك تصفح مشاريعنا العقارية المتاحة حالياً."
              : "We are currently curating and refining the content for this section to serve you better. In the meantime, explore our active Saudi real estate projects."}
          </p>

          {/* Action Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects"
              className="w-full sm:w-auto px-8 py-4 font-mono text-[11px] tracking-[0.2em] uppercase border border-[#B8873B] bg-[#B8873B] text-[#12130F] font-bold hover:bg-transparent hover:text-[#B8873B] transition-all duration-300"
            >
              {isAr ? "تصفح المشاريع المتاحة ←" : "Explore Active Projects →"}
            </Link>

            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 font-mono text-[11px] tracking-[0.2em] uppercase border border-white/20 text-[#E8DFCE] hover:border-[#25D366] hover:text-[#25D366] transition-all duration-300 font-semibold"
            >
              💬 {isAr ? "استفسار مباشر عبر واتساب" : "Direct WhatsApp Inquiry"}
            </a>
          </div>
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}
