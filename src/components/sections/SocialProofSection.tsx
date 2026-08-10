"use client";

import { useLanguage } from "@/context/LanguageContext";

const TESTIMONIALS = [
  {
    quoteEn: "I'd been watching Saudi Arabia for two years. Asaheeb was the first firm that spoke to me in numbers I could verify, not promises I had to believe.",
    quoteAr: "كنت أراقب المملكة العربية السعودية منذ سنتين. كان أصاهيب أول شركة تحدثت إليّ بأرقام يمكنني التحقق منها، لا بوعود أحتاج إلى تصديقها.",
    nameEn: "Khalid A.",
    nameAr: "خالد أ.",
    roleEn: "Private investor, Dubai",
    roleAr: "مستثمر خاص، دبي",
    initials: "KA",
    accent: "#B8873B",
  },
  {
    quoteEn: "The process was seamless — legal guidance, financing, and everything explained in Arabic. We closed within 60 days.",
    quoteAr: "كانت العملية سلسة — إرشاد قانوني، وتمويل، وكل شيء مُوضَّح بالعربية. أنجزنا الصفقة في غضون ٦٠ يوماً.",
    nameEn: "Rania H.",
    nameAr: "رانيا ح.",
    roleEn: "Business owner, Jeddah",
    roleAr: "صاحبة أعمال، جدة",
    initials: "RH",
    accent: "#7FA8B3",
  },
];

const PARTNERS = ["Developer 1", "Developer 2", "Developer 3", "Developer 4", "Developer 5", "Developer 6"];

const PROOF_STATS = [
  { valueEn: "500+", valueAr: "٥٠٠+", labelEn: "Investors Guided", labelAr: "مستثمر تمت إرشادهم" },
  { valueEn: "SAR 2.4B", valueAr: "٢.٤ مليار ر.س", labelEn: "Total Deal Value", labelAr: "إجمالي قيمة الصفقات" },
  { valueEn: "98%", valueAr: "٩٨٪", labelEn: "Client Satisfaction", labelAr: "رضا العملاء" },
];

export default function SocialProofSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <section
      id="section-social-proof"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#080A0D" }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(184,135,59,0.25) 50%, transparent)" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">

        {/* Section header */}
        <div className={`mb-16 ${isAr ? "text-right" : "text-center"}`}>
          <div className={`flex items-center gap-3 mb-6 ${isAr ? "justify-end" : "justify-center"}`}>
            <div className="h-px w-10 bg-[#B8873B]/40" />
            <span className="font-mono text-[9px] tracking-[0.36em] uppercase text-[#B8873B]">
              {isAr ? "الثقة المكتسبة" : "Social Proof"}
            </span>
            <div className="h-px w-10 bg-[#B8873B]/40" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#E8DFCE] font-normal tracking-[-0.02em] leading-[1.1]">
            {isAr ? (
              <>الأرقام الحقيقية. <span className="italic text-[#B8873B]">الناس الحقيقيون.</span></>
            ) : (
              <>Real numbers. <span className="italic text-[#B8873B]">Real people.</span></>
            )}
          </h2>
        </div>

        {/* Proof Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mb-16 border border-[rgba(255,255,255,0.06)]">
          {PROOF_STATS.map((stat, i) => (
            <div
              key={i}
              className={`px-10 py-8 text-center ${i < PROOF_STATS.length - 1 ? "border-r border-[rgba(255,255,255,0.06)]" : ""}`}
            >
              <p className="font-display text-4xl font-semibold text-[#B8873B] mb-2">
                {isAr ? stat.valueAr : stat.valueEn}
              </p>
              <p className="font-mono text-[9px] tracking-[0.24em] uppercase text-[#8C8477]">
                {isAr ? stat.labelAr : stat.labelEn}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="relative p-8 group cursor-default transition-all duration-400"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                backgroundColor: "rgba(18,19,15,0.4)",
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px] opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${t.accent}, transparent)` }}
              />

              {/* Quote mark */}
              <div
                className={`font-display text-6xl leading-none mb-4 ${isAr ? "text-right" : ""}`}
                style={{ color: t.accent, opacity: 0.4 }}
              >
                {isAr ? "،،" : "\u201C"}
              </div>

              <p
                className={`font-sans text-sm text-[#C5BAB0] leading-[1.9] mb-6 ${isAr ? "text-right" : ""}`}
                dir={isAr ? "rtl" : "ltr"}
              >
                {isAr ? t.quoteAr : t.quoteEn}
              </p>

              {/* Author */}
              <div className={`flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0"
                  style={{
                    backgroundColor: `${t.accent}20`,
                    border: `1px solid ${t.accent}40`,
                    color: t.accent,
                  }}
                >
                  {t.initials}
                </div>
                <div className={isAr ? "text-right" : ""}>
                  <p className="font-sans text-sm text-[#E8DFCE] font-medium">
                    {isAr ? t.nameAr : t.nameEn}
                  </p>
                  <p className="font-mono text-[9px] text-[#8C8477] tracking-[0.15em]">
                    {isAr ? t.roleAr : t.roleEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos — placeholder strip */}
        <div className={`${isAr ? "text-right" : "text-center"} mb-8`}>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#8C8477] mb-6">
            {isAr ? "شركاؤنا الموثوقون" : "Trusted Developer Partners"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {PARTNERS.map((p, i) => (
              <div
                key={i}
                className="px-5 py-2.5 border font-mono text-[10px] tracking-[0.2em] uppercase text-[#8C8477] transition-all duration-300 hover:border-[#B8873B]/40 hover:text-[#B8873B]"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
