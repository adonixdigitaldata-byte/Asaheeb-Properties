"use client";

import { ProjectDetail } from "@/types/database";

interface FloatingProjectCTAProps {
  project: ProjectDetail;
  isAr: boolean;
  whatsAppLink?: string;
  onRegisterClick?: () => void;
}

export default function FloatingProjectCTA({
  isAr,
  onRegisterClick,
}: FloatingProjectCTAProps) {
  const handleAction = () => {
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      const el = document.getElementById("section-inquiry");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const input = el.querySelector<HTMLInputElement>("input[type='text']");
          if (input) input.focus();
        }, 500);
      }
    }
  };

  return (
    <aside
      aria-label="Register Interest Tab"
      className={`fixed top-1/2 -translate-y-1/2 z-[380] pointer-events-auto select-none ${
        isAr ? "left-0" : "right-0"
      }`}
    >
      {/* 
        Sleek, permanent closed vertical tab (Desktop & Mobile).
        Takes only ~32px flush against the screen edge.
        Zero horizontal expansion, zero obstruction of gallery photos, captions or text.
        Clicking it smoothly scrolls directly to the VIP registration form.
      */}
      <button
        type="button"
        onClick={handleAction}
        className={`flex flex-col items-center justify-center gap-1.5 py-4 px-2 sm:px-2.5 bg-[#0C0E0A]/95 hover:bg-[#18150F] backdrop-blur-xl border border-[#B8873B] text-[#FAF6EE] active:scale-95 transition-all duration-200 cursor-pointer group ${
          isAr
            ? "rounded-r-xl border-l-0 shadow-[4px_0_20px_rgba(184,135,59,0.3)] hover:translate-x-1"
            : "rounded-l-xl border-r-0 shadow-[-4px_0_20px_rgba(184,135,59,0.3)] hover:-translate-x-1"
        }`}
        title={isAr ? "انقر للانتقال لنموذج تسجيل الاهتمام" : "Click to Register Interest"}
      >
        {/* Pulsing indicator dot */}
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B] animate-pulse shrink-0" />

        {/* Vertical Text */}
        <span className="font-mono text-[9px] sm:text-[9.5px] tracking-[0.22em] uppercase font-bold text-[#FAF6EE] group-hover:text-[#E2B768] transition-colors [writing-mode:vertical-rl] rotate-180 py-1">
          {isAr ? "تسجيل الاهتمام" : "REGISTER"}
        </span>

        {/* Down arrow pointing to form */}
        <span className="text-[#B8873B] text-[10px] font-bold group-hover:translate-y-0.5 transition-transform">
          ↓
        </span>
      </button>
    </aside>
  );
}
