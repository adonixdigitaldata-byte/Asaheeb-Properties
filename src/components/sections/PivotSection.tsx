"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

export default function PivotSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [line1Ref.current, line2Ref.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-pivot"
      className="relative w-full py-32 lg:py-48 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#050709" }}
    >
      {/* Minimal geometric marks */}
      <div
        className="absolute top-1/2 left-10 -translate-y-1/2 w-px h-24 opacity-20"
        style={{ backgroundColor: "#B8873B" }}
      />
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-px h-24 opacity-20"
        style={{ backgroundColor: "#B8873B" }}
      />

      <div className={`relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-10 lg:px-20 ${isAr ? "text-right" : "text-center"}`}>
        <p className="font-mono text-[9px] tracking-[0.38em] uppercase text-[#8C8477] mb-10">
          {isAr ? "المحور" : "The Pivot"}
        </p>

        <h2
          className="font-display text-3xl sm:text-4xl lg:text-6xl text-[#E8DFCE] font-normal tracking-[-0.025em] leading-[1.1]"
          dir={isAr ? "rtl" : "ltr"}
        >
          <span ref={line1Ref} className="block opacity-0 mb-3">
            {isAr
              ? "كل تحول يخلق لحظة."
              : "Every transformation creates a moment."}
          </span>
          <span ref={line2Ref} className="block opacity-0">
            {isAr ? (
              <>
                هذه لحظة المملكة —{" "}
                <span className="italic" style={{ color: "#B8873B" }}>
                  وتحدث مرة واحدة.
                </span>
              </>
            ) : (
              <>
                This is Saudi Arabia&apos;s —{" "}
                <span className="italic" style={{ color: "#B8873B" }}>
                  and it happens once.
                </span>
              </>
            )}
          </span>
        </h2>
      </div>
    </section>
  );
}
