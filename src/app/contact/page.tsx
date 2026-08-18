"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { PHONE_NUMBER_DISPLAY, WHATSAPP_NUMBER, CONTACT_EMAIL, getWhatsAppLink } from "@/data/contactConfig";
import { submitWebsiteLead } from "@/lib/api";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";

// ─── Bilingual content ─────────────────────────────────────────────────────────
const CONTENT = {
  en: {
    badge: "Let's Talk",
    heroTitle: "Your Next Investment\nStarts With a Conversation.",
    heroSub: "Whether you have a specific property in mind or are starting from scratch, our advisors are ready.",
    formTitle: "Send Us a Message",
    fields: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone / WhatsApp",
      interest: "Investment Interest",
      budget: "Budget Range",
      message: "Your Message",
      submit: "Send Message",
    },
    interests: ["Apartments", "Villas", "Land", "Buildings", "General Inquiry"],
    budgets: ["Under SAR 1M", "SAR 1M – 5M", "SAR 5M – 20M", "SAR 20M – 50M", "SAR 50M+"],
    infoTitle: "Contact Information",
    responseTime: "We typically respond within 2 hours during business hours.",
    whatsappTitle: "WhatsApp — Instant Support",
    whatsappSub: "Message us directly. Our team replies in Arabic and English.",
    whatsappBtn: "Open WhatsApp",
    officeTitle: "Office Location",
    officeAddr: "Jeddah, Saudi Arabia",
    hoursTitle: "Business Hours",
    hours: "Sun – Thu: 9:00 AM – 6:00 PM (AST)",
    successTitle: "Message Received!",
    successSub: "We'll be in touch within 2 hours. You can also reach us on WhatsApp for faster response.",
  },
  ar: {
    badge: "لنتحدث",
    heroTitle: "استثمارك القادم\nيبدأ بمحادثة.",
    heroSub: "سواء كان لديك عقار محدد في ذهنك أو تبدأ من الصفر، مستشارونا جاهزون.",
    formTitle: "أرسل لنا رسالة",
    fields: {
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "الهاتف / واتساب",
      interest: "الاهتمام الاستثماري",
      budget: "نطاق الميزانية",
      message: "رسالتك",
      submit: "إرسال الرسالة",
    },
    interests: ["شقق", "فلل", "أراضٍ", "مبانٍ", "استفسار عام"],
    budgets: ["أقل من مليون ر.س", "مليون – 5 مليون ر.س", "5 – 20 مليون ر.س", "20 – 50 مليون ر.س", "+50 مليون ر.س"],
    infoTitle: "معلومات التواصل",
    responseTime: "نرد عادةً خلال ساعتين أثناء ساعات العمل.",
    whatsappTitle: "واتساب — رد فوري",
    whatsappSub: "راسلنا مباشرة. فريقنا يرد بالعربية والإنجليزية.",
    whatsappBtn: "فتح واتساب",
    officeTitle: "موقع المكتب",
    officeAddr: "جدة، المملكة العربية السعودية",
    hoursTitle: "ساعات العمل",
    hours: "الأحد – الخميس: 9:00 صباحاً – 6:00 مساءً",
    successTitle: "تم استلام رسالتك!",
    successSub: "سنتواصل معك خلال ساعتين. يمكنك أيضاً التواصل عبر واتساب للرد الأسرع.",
  },
};

// ─── Floating label input ──────────────────────────────────────────────────────
function FloatingInput({
  label, type = "text", value, onChange, isAr, required = false,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; isAr: boolean; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const isUp = focused || hasValue;

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        required={required}
        dir={isAr ? "rtl" : "ltr"}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-6 pb-2 font-sans text-sm text-[#E8DFCE] bg-transparent border border-[rgba(184,135,59,0.2)] focus:border-[#B8873B] outline-none transition-all duration-300 placeholder-transparent"
        style={{ backgroundColor: "rgba(18,19,15,0.6)" }}
        placeholder={label}
      />
      <label
        className="absolute font-sans text-sm pointer-events-none transition-all duration-200"
        style={{
          top: isUp ? "8px" : "50%",
          left: isAr ? "auto" : "16px",
          right: isAr ? "16px" : "auto",
          transform: isUp ? "none" : "translateY(-50%)",
          fontSize: isUp ? "10px" : "14px",
          letterSpacing: isUp ? "0.12em" : "0",
          textTransform: isUp ? "uppercase" as const : "none" as const,
          color: focused ? "#B8873B" : isUp ? "#C5BCAD" : "#C5BCAD",
          fontFamily: isUp ? "var(--font-mono)" : "var(--font-sans)",
        }}
      >
        {label}
      </label>
    </div>
  );
}

// ─── Floating label select ─────────────────────────────────────────────────────
function FloatingSelect({
  label, options, value, onChange, isAr,
}: {
  label: string; options: string[]; value: string;
  onChange: (v: string) => void; isAr: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const isUp = focused || hasValue;

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        dir={isAr ? "rtl" : "ltr"}
        className="w-full px-4 pt-6 pb-2 font-sans text-sm text-[#E8DFCE] border border-[rgba(184,135,59,0.2)] focus:border-[#B8873B] outline-none transition-all duration-300 appearance-none cursor-pointer"
        style={{ backgroundColor: "rgba(18,19,15,0.6)" }}
      >
        <option value="" style={{ backgroundColor: "#12130F" }}></option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ backgroundColor: "#12130F" }}>{opt}</option>
        ))}
      </select>
      <label
        className="absolute font-sans pointer-events-none transition-all duration-200"
        style={{
          top: isUp ? "8px" : "50%",
          left: isAr ? "auto" : "16px",
          right: isAr ? "16px" : "auto",
          transform: isUp ? "none" : "translateY(-50%)",
          fontSize: isUp ? "10px" : "14px",
          letterSpacing: isUp ? "0.12em" : "0",
          textTransform: isUp ? "uppercase" as const : "none" as const,
          color: focused ? "#B8873B" : "#8C8477",
          fontFamily: isUp ? "var(--font-mono)" : "var(--font-sans)",
        }}
      >
        {label}
      </label>
      <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-[#8C8477] ${isAr ? "left-4" : "right-4"}`}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 4l4 4 4-4" />
        </svg>
      </div>
    </div>
  );
}

// ─── Main Contact Page Component ───────────────────────────────────────────────
export default function ContactPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const c = isAr ? CONTENT.ar : CONTENT.en;
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", budget: "", message: "" });

  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const heroEls = heroRef.current.querySelectorAll(".hero-el");
        if (heroEls.length > 0) {
          gsap.set(heroEls, { opacity: 0, y: 30 });
          gsap.to(heroEls, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" });
        }
      }

      if (formRef.current) {
        const fields = formRef.current.querySelectorAll(".field-wrap");
        if (fields.length > 0) {
          gsap.set(fields, { opacity: 0, y: 20 });
          ScrollTrigger.create({
            trigger: formRef.current,
            start: "top 80%",
            onEnter: () => gsap.to(fields, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }),
          });
        }
      }

      if (infoRef.current) {
        gsap.set(infoRef.current, { opacity: 0, x: isAr ? -25 : 25 });
        ScrollTrigger.create({
          trigger: infoRef.current,
          start: "top 80%",
          onEnter: () => gsap.to(infoRef.current, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }),
        });
      }
    });
    return () => ctx.revert();
  }, [isAr]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await submitWebsiteLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        interest: form.interest || "General Advisory Inquiry",
        budget: form.budget,
        message: form.message,
        source: "WEBSITE_FORM",
        form_type: "Contact Page Advisory Form",
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setErrorMsg(isAr ? "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو مراسلتنا عبر واتساب." : "An error occurred while submitting. Please try again or message us directly via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative bg-[#12130F] min-h-screen pb-20 md:pb-0" dir={isAr ? "rtl" : "ltr"}>
      <PageNav />

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden pt-28 sm:pt-36 pb-12 px-6 sm:px-10 lg:px-20">
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-10%", right: isAr ? "auto" : "0", left: isAr ? "0" : "auto",
            width: "45vw", height: "45vw", maxWidth: 550, maxHeight: 550,
            background: "radial-gradient(circle, rgba(184,135,59,0.12) 0%, transparent 65%)",
            filter: "blur(25px)",
          }}
        />

        <div ref={heroRef} className={`relative z-10 max-w-5xl ${isAr ? "mr-auto text-right" : ""}`}>
          <div className="hero-el inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full"
            style={{ borderColor: "rgba(184,135,59,0.4)", backgroundColor: "rgba(18,19,15,0.85)" }}>
            <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-ping" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#B8873B] font-semibold">{c.badge}</span>
          </div>

          <h1
            className="hero-el font-display text-4xl sm:text-6xl lg:text-7xl text-[#E8DFCE] font-normal leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ whiteSpace: "pre-line" }}
          >
            {c.heroTitle.split("\n")[0]}{"\n"}
            <span className="italic text-[#B8873B]">{c.heroTitle.split("\n")[1]}</span>
          </h1>

          <p className="hero-el font-sans text-base sm:text-lg text-[#C5BCAD] leading-relaxed max-w-xl">{c.heroSub}</p>
        </div>
      </section>

      {/* ── CONTACT LAYOUT ────────────────────────────────────────────────── */}
      <section className="py-16 px-6 sm:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* FORM COLUMN */}
          <div className={isAr ? "lg:order-2" : ""}>
            <p className={`font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] mb-8 ${isAr ? "text-right" : ""}`}>
              {c.formTitle}
            </p>

            {submitted ? (
              <div
                className="p-8 sm:p-12 border border-[#B8873B]/30 text-center"
                style={{ background: "linear-gradient(135deg, rgba(184,135,59,0.08) 0%, rgba(18,19,15,0.95) 100%)" }}
              >
                <div className="w-16 h-16 rounded-full border-2 border-[#B8873B] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(184,135,59,0.4)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B8873B" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-[#E8DFCE] mb-4">{c.successTitle}</h3>
                <p className="font-sans text-sm text-[#8C8477] leading-relaxed">{c.successSub}</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="field-wrap">
                  <FloatingInput label={c.fields.name} value={form.name} onChange={(v) => setForm({ ...form, name: v })} isAr={isAr} required />
                </div>
                <div className="field-wrap">
                  <FloatingInput label={c.fields.email} type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} isAr={isAr} required />
                </div>
                <div className="field-wrap">
                  <FloatingInput label={c.fields.phone} type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} isAr={isAr} />
                </div>
                <div className="field-wrap grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingSelect label={c.fields.interest} options={c.interests} value={form.interest} onChange={(v) => setForm({ ...form, interest: v })} isAr={isAr} />
                  <FloatingSelect label={c.fields.budget} options={c.budgets} value={form.budget} onChange={(v) => setForm({ ...form, budget: v })} isAr={isAr} />
                </div>
                <div className="field-wrap">
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    dir={isAr ? "rtl" : "ltr"}
                    placeholder={c.fields.message}
                    className="w-full px-4 py-4 font-sans text-sm text-[#E8DFCE] bg-transparent border border-[rgba(184,135,59,0.2)] focus:border-[#B8873B] outline-none transition-colors duration-300 placeholder-[#8C8477] resize-none"
                    style={{ backgroundColor: "rgba(18,19,15,0.6)" }}
                  />
                </div>
                {errorMsg && (
                  <div className="field-wrap p-4 border border-red-500/40 bg-red-500/10 text-red-300 font-sans text-xs text-center rounded-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="field-wrap">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 font-mono text-[10.5px] tracking-[0.25em] uppercase border border-[#B8873B] text-[#12130F] bg-[#B8873B] hover:bg-transparent hover:text-[#B8873B] transition-all duration-300 flex items-center justify-center gap-3 font-semibold shadow-[0_0_25px_rgba(184,135,59,0.2)] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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
                      <>
                        {c.fields.submit}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={isAr ? "rotate-180" : ""}>
                          <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* INFO COLUMN */}
          <div ref={infoRef} className={isAr ? "lg:order-1" : ""}>
            <p className={`font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] mb-8 ${isAr ? "text-right" : ""}`}>
              {c.infoTitle}
            </p>

            {/* WhatsApp CTA */}
            <div
              className={`p-6 mb-8 border border-[#25D366]/30 hover:border-[#25D366]/60 transition-all duration-300 ${isAr ? "text-right" : ""}`}
              style={{ background: "linear-gradient(135deg, rgba(37,211,102,0.06) 0%, rgba(18,19,15,0.9) 100%)" }}
            >
              <div className={`flex items-center gap-3 mb-3 ${isAr ? "flex-row-reverse" : ""}`}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="font-display text-lg text-[#E8DFCE]">{c.whatsappTitle}</div>
                </div>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#8C8477] leading-relaxed mb-4">{c.whatsappSub}</p>
              <a
                href={getWhatsAppLink(undefined, undefined, isAr)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 font-semibold ${isAr ? "flex-row-reverse" : ""}`}
                style={{ backgroundColor: "#25D366", color: "#fff" }}
              >
                <span>{c.whatsappBtn}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={isAr ? "rotate-180" : ""}>
                  <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Contact details */}
            <div className="space-y-5">
              <div className={`border-l-2 border-[#B8873B]/40 ${isAr ? "border-l-0 border-r-2 pr-4 text-right" : "pl-4"}`}>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#B8873B] mb-1">{c.officeTitle}</p>
                <p className="font-sans text-sm text-[#E8DFCE]">{c.officeAddr}</p>
              </div>
              <div className={`border-l-2 border-[#B8873B]/40 ${isAr ? "border-l-0 border-r-2 pr-4 text-right" : "pl-4"}`}>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#B8873B] mb-1">Email</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-sans text-sm text-[#E8DFCE] hover:text-[#B8873B] transition-colors">{CONTACT_EMAIL}</a>
              </div>
              <div className={`border-l-2 border-[#B8873B]/40 ${isAr ? "border-l-0 border-r-2 pr-4 text-right" : "pl-4"}`}>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#B8873B] mb-1">Phone</p>
                <a href={`tel:${WHATSAPP_NUMBER}`} className="font-sans text-sm text-[#E8DFCE] hover:text-[#B8873B] transition-colors">{PHONE_NUMBER_DISPLAY}</a>
              </div>
              <div className={`border-l-2 border-[#B8873B]/40 ${isAr ? "border-l-0 border-r-2 pr-4 text-right" : "pl-4"}`}>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#B8873B] mb-1">{c.hoursTitle}</p>
                <p className="font-sans text-sm text-[#E8DFCE]">{c.hours}</p>
              </div>
            </div>

            {/* Response time note */}
            <div className={`mt-8 p-4 border border-[#B8873B]/15 ${isAr ? "text-right" : ""}`} style={{ backgroundColor: "rgba(18,19,15,0.4)" }}>
              <div className={`flex items-center gap-2 mb-1 ${isAr ? "flex-row-reverse" : ""}`}>
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#25D366] font-semibold">Live Advisory</span>
              </div>
              <p className="font-sans text-xs text-[#8C8477]">{c.responseTime}</p>
            </div>
          </div>
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}
