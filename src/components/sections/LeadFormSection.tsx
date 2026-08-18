"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppLink } from "@/data/contactConfig";
import { submitWebsiteLead } from "@/lib/api";

const INTEREST_OPTIONS_EN = ["Apartments", "Villas", "Land", "Buildings", "All Asset Types"];
const INTEREST_OPTIONS_AR = ["شقق سكنية", "فلل", "أراضي", "مباني", "جميع الأصول"];

const BUDGET_OPTIONS_EN = [
  "Under SAR 1M",
  "SAR 1M – 3M",
  "SAR 3M – 10M",
  "SAR 10M – 30M",
  "SAR 30M+",
];
const BUDGET_OPTIONS_AR = [
  "أقل من ١ مليون ر.س",
  "١م – ٣م ر.س",
  "٣م – ١٠م ر.س",
  "١٠م – ٣٠م ر.س",
  "٣٠م ر.س وأكثر",
];

export default function LeadFormSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await submitWebsiteLead({
        name: form.name,
        phone: form.phone,
        email: form.email,
        interest: form.interest || "General Property Inquiry",
        budget: form.budget,
        message: form.message,
        source: "WEBSITE_FORM",
        form_type: "Homepage Lead Form",
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error("Error posting lead form:", err);
      setErrorMsg(isAr ? "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب." : "An error occurred while submitting. Please try again or reach out via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) => `
    w-full bg-transparent font-sans text-sm text-[#E8DFCE] placeholder-[#8C8477]/60
    outline-none transition-all duration-300 py-3.5 px-4
    border border-transparent
    ${focused === field
      ? "border-[#B8873B] shadow-[0_0_20px_rgba(184,135,59,0.15)]"
      : "border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
    }
  `;

  const labelClass = "font-mono text-[9px] tracking-[0.26em] uppercase text-[#8C8477] mb-1.5 block";

  return (
    <section
      id="section-lead-form"
      className="relative w-full py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: "#0A0C0F" }}
    >
      {/* Background: Gold radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(184,135,59,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Architectural Lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#B8873B]/20 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#B8873B]/20 to-transparent" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-10 lg:px-20">

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">

          {/* LEFT COLUMN — Copy */}
          <div className={`lg:col-span-2 ${isAr ? "text-right" : "text-left"}`}>
            {/* Eyebrow */}
            <div className={`flex items-center gap-3 mb-8 ${isAr ? "justify-end" : "justify-start"}`}>
              <div className="h-px w-10 bg-[#B8873B]/50" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8873B] font-semibold">
                {isAr ? "ابدأ رحلتك" : "Start Your Journey"}
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#E8DFCE] font-normal tracking-[-0.02em] leading-[1.1] mb-6">
              {isAr ? (
                <>
                  خطتك الاستثمارية{" "}
                  <span className="italic text-[#B8873B] block">مبنية لأجلك</span>
                </>
              ) : (
                <>
                  Your Saudi Arabia{" "}
                  <span className="italic text-[#B8873B] block">Investment Plan,</span>
                  Built Around You.
                </>
              )}
            </h2>

            <p className="font-sans text-sm text-[#8C8477] leading-[1.8] mb-10 max-w-sm">
              {isAr
                ? "أخبرنا بأهدافك. سنوضح لك أين توجد الفرصة — بدون ضغط، وبدون التزام."
                : "Tell us your goals. We'll show you where the opportunity is — no pressure, no obligation."}
            </p>

            {/* Trust badges */}
            <div className="space-y-4">
              {[
                {
                  en: "100% confidential consultation",
                  ar: "استشارة سرية ١٠٠٪",
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                },
                {
                  en: "Response within 24 hours",
                  ar: "رد خلال ٢٤ ساعة",
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  en: "Available in Arabic & English",
                  ar: "متاح بالعربية والإنجليزية",
                  icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
                },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(184,135,59,0.12)", border: "1px solid rgba(184,135,59,0.25)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8873B" strokeWidth="1.5">
                      <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-sans text-xs text-[#8C8477]">
                    {isAr ? item.ar : item.en}
                  </span>
                </div>
              ))}
            </div>

            {/* WhatsApp quick link */}
            <a
              href={getWhatsAppLink(undefined, undefined, isAr)}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 flex items-center gap-3 w-fit transition-all duration-300"
              style={{ color: "#25D366" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: "rgba(37,211,102,0.1)",
                  border: "1px solid rgba(37,211,102,0.3)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: "#25D366" }}>
                  {isAr ? "واتساب — رد فوري" : "WhatsApp — Instant Reply"}
                </p>
                <p className="font-sans text-[10px] text-[#8C8477]">
                  {isAr ? "نتحدث عربي وإنجليزي" : "Arabic & English spoken"}
                </p>
              </div>
            </a>
          </div>

          {/* RIGHT COLUMN — Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              /* Success State */
              <div
                className="text-center py-16 px-8 border"
                style={{
                  borderColor: "rgba(184,135,59,0.3)",
                  backgroundColor: "rgba(18,19,15,0.6)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "rgba(184,135,59,0.15)", border: "1px solid rgba(184,135,59,0.4)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B8873B" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-[#E8DFCE] mb-3">
                  {isAr ? "تم استلام طلبك" : "Request Received"}
                </h3>
                <p className="font-sans text-sm text-[#8C8477] leading-relaxed">
                  {isAr
                    ? "سيتواصل معك مستشارنا الاستثماري خلال ٢٤ ساعة."
                    : "One of our investment advisors will reach out within 24 hours."}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                  backgroundColor: "rgba(18,19,15,0.5)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Form top accent */}
                <div
                  className="h-[2px] w-full"
                  style={{
                    background: "linear-gradient(to right, transparent, #B8873B 40%, #7FA8B3 60%, transparent)",
                  }}
                />

                <div className="p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="sm:col-span-1">
                    <label className={labelClass}>{isAr ? "الاسم الكامل" : "Full Name"} *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder={isAr ? "الاسم الكامل" : "Your full name"}
                      className={inputClass("name")}
                      dir={isAr ? "rtl" : "ltr"}
                    />
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-1">
                    <label className={labelClass}>{isAr ? "الهاتف / واتساب" : "Phone / WhatsApp"} *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                      placeholder={isAr ? "+٩٦٦ ٥٠٠ ٠٠٠ ٠٠٠" : "+966 500 000 000"}
                      className={inputClass("phone")}
                      dir="ltr"
                    />
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-2">
                    <label className={labelClass}>{isAr ? "البريد الإلكتروني" : "Email Address"}</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder={isAr ? "بريدك الإلكتروني" : "your@email.com"}
                      className={inputClass("email")}
                      dir="ltr"
                    />
                  </div>

                  {/* Investment Interest */}
                  <div className="sm:col-span-1">
                    <label className={labelClass}>{isAr ? "نوع الاستثمار" : "Investment Interest"} *</label>
                    <div className="relative">
                      <select
                        required
                        value={form.interest}
                        onChange={(e) => setForm({ ...form, interest: e.target.value })}
                        onFocus={() => setFocused("interest")}
                        onBlur={() => setFocused(null)}
                        className={inputClass("interest") + " appearance-none cursor-pointer"}
                        dir={isAr ? "rtl" : "ltr"}
                      >
                        <option value="" disabled style={{ backgroundColor: "#0A0C0F" }}>
                          {isAr ? "اختر نوع الأصل" : "Select asset type"}
                        </option>
                        {(isAr ? INTEREST_OPTIONS_AR : INTEREST_OPTIONS_EN).map((opt, i) => (
                          <option key={i} value={opt} style={{ backgroundColor: "#0A0C0F" }}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8C8477"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="sm:col-span-1">
                    <label className={labelClass}>{isAr ? "الميزانية التقريبية" : "Budget Range"} *</label>
                    <div className="relative">
                      <select
                        required
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        onFocus={() => setFocused("budget")}
                        onBlur={() => setFocused(null)}
                        className={inputClass("budget") + " appearance-none cursor-pointer"}
                        dir={isAr ? "rtl" : "ltr"}
                      >
                        <option value="" disabled style={{ backgroundColor: "#0A0C0F" }}>
                          {isAr ? "حدد ميزانيتك" : "Select budget"}
                        </option>
                        {(isAr ? BUDGET_OPTIONS_AR : BUDGET_OPTIONS_EN).map((opt, i) => (
                          <option key={i} value={opt} style={{ backgroundColor: "#0A0C0F" }}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8C8477"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label className={labelClass}>{isAr ? "أخبرنا عن أهدافك" : "Tell Us Your Goals"}</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      placeholder={
                        isAr
                          ? "ما هي أهدافك الاستثمارية؟ هل تفضل الدخل الإيجاري أم ارتفاع القيمة الرأسمالية؟"
                          : "What are your investment goals? Income-focused or capital appreciation? Preferred timeline?"
                      }
                      className={inputClass("message") + " resize-none"}
                      dir={isAr ? "rtl" : "ltr"}
                    />
                  </div>

                  {/* Error Alert if any */}
                  {errorMsg && (
                    <div className="sm:col-span-2 p-4 border border-red-500/40 bg-red-500/10 text-red-300 font-sans text-xs text-center rounded-xs">
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 font-mono text-sm tracking-[0.28em] uppercase font-bold transition-all duration-400 group relative overflow-hidden flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: "#B8873B",
                        color: "#12130F",
                        boxShadow: "0 0 40px rgba(184,135,59,0.35)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#c99a49";
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px rgba(184,135,59,0.6)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#B8873B";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(184,135,59,0.35)";
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-[#12130F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>{isAr ? "جاري الإرسال..." : "Submitting..."}</span>
                        </>
                      ) : (
                        <span>{isAr ? "احصل على خطتي الاستثمارية" : "Get My Investment Plan"}</span>
                      )}
                    </button>

                    <p className="font-mono text-[9px] text-[#8C8477] tracking-[0.18em] text-center mt-4">
                      {isAr
                        ? "بتقديم هذا النموذج، أنت توافق على التواصل من قبل فريق أصاهيب."
                        : "By submitting, you agree to be contacted by the Asaheeb team. No spam, ever."}
                    </p>
                  </div>
                </div>
              </form>
            )}

            {/* Request Call Back alternative */}
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
              <span className="font-mono text-[9px] text-[#8C8477] tracking-[0.2em] uppercase">
                {isAr ? "أو" : "or"}
              </span>
              <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
            </div>
            <a
              href="/contact"
              className="w-full mt-4 py-3.5 block text-center font-mono text-[11px] tracking-[0.24em] uppercase font-semibold border transition-all duration-300 group"
              style={{
                borderColor: "rgba(184,135,59,0.4)",
                color: "#B8873B",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#B8873B";
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(184,135,59,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(184,135,59,0.4)";
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              }}
            >
              📞 {isAr ? "طلب معاودة الاتصال" : "Request a Call Back"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
