"use client";

import { useState, useRef, useEffect } from "react";
import PhoneInputWithCountry from "@/components/ui/PhoneInputWithCountry";
import type { CountryInfo } from "@/data/countriesData";
import type { MortgageResult } from "./engine";
import { formatSAR } from "./engine";
import { BANKS } from "./constants";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: MortgageResult | null;
  price: number;
  downPaymentAmount: number;
  loanPeriodYears: number;
  bankSlug: string;
  isCitizen: boolean;
  isFirstHome: boolean | null;
  isRTL?: boolean;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function LeadModal({
  isOpen,
  onClose,
  result,
  price,
  downPaymentAmount,
  loanPeriodYears,
  bankSlug,
  isCitizen,
  isFirstHome,
  isRTL = false,
}: LeadModalProps) {
  const [fullName, setFullName] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [redfSupported, setRedfSupported] = useState<boolean>(true);
  const [monthlyObligations, setMonthlyObligations] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedBank = BANKS.find((b) => b.slug === bankSlug);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg(isRTL ? "الاسم الكامل مطلوب" : "Full name is required");
      return;
    }

    if (!phoneValue.trim()) {
      setErrorMsg(isRTL ? "رقم الهاتف مطلوب" : "Phone number is required");
      return;
    }

    if (!isPhoneValid) {
      setErrorMsg(isRTL ? "يرجى إدخال رقم هاتف صحيح" : "Please enter a valid phone number");
      return;
    }

    setSubmitState("submitting");

    try {
      const res = await fetch("/api/mortgage-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phoneNumber: phoneValue.trim(),
          monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome.replace(/,/g, "")) : null,
          redfSupported,
          monthlyObligations: monthlyObligations
            ? parseFloat(monthlyObligations.replace(/,/g, ""))
            : null,
          price,
          isCitizen,
          isFirstHome,
          downPaymentAmount,
          loanPeriodYears,
          bankSlug,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }

      setSubmitState("success");
    } catch (err: any) {
      setSubmitState("error");
      setErrorMsg(
        isRTL
          ? "حدث خطأ أثناء تقديم الطلب، يرجى المحاولة مجدداً"
          : err?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="relative z-[9999]">
      {/* Dark backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="fixed inset-0 flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto pt-14 sm:pt-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mortgage-modal-title"
        onClick={onClose}
      >
        <div
          className={`relative w-full max-w-lg border rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[92vh] flex flex-col ${
            isRTL ? "text-right" : "text-left"
          }`}
          style={{
            backgroundColor: "#12130F",
            borderColor: "rgba(184,135,59,0.35)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b shrink-0"
            style={{
              borderColor: "rgba(184,135,59,0.15)",
              backgroundColor: "rgba(18,19,15,0.9)",
            }}
          >
            <div>
              <h2
                id="mortgage-modal-title"
                className="text-base sm:text-lg font-bold text-[#E8DFCE]"
              >
                {isRTL ? "تقديم طلب التمويل العقاري" : "Submit Mortgage Request"}
              </h2>
              {selectedBank && result && (
                <p className="text-xs font-mono text-[#B8873B] mt-0.5">
                  {isRTL
                    ? `${selectedBank.nameAr} · القسط التقديري: ${formatSAR(result.monthlyInstalment)} ر.س / شهر`
                    : `${selectedBank.nameEn} · Est. Monthly: SAR ${formatSAR(result.monthlyInstalment)} / mo`}
                </p>
              )}
            </div>

            {/* Prominent Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-[rgba(184,135,59,0.3)] bg-[rgba(18,19,15,0.8)] text-[#C5BCAD] hover:text-[#E8DFCE] hover:border-[#B8873B] hover:bg-[#B8873B]/10 flex items-center justify-center transition-all cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body Content */}
          <div className="overflow-y-auto px-5 py-5 space-y-4">
            {submitState === "success" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                <div
                  className="w-16 h-16 rounded-full border flex items-center justify-center"
                  style={{
                    borderColor: "#B8873B",
                    backgroundColor: "rgba(184,135,59,0.15)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#B8873B" strokeWidth="2.5" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-display text-[#E8DFCE]">
                  {isRTL ? "تم استلام طلبك بنجاح" : "Financing Request Received"}
                </h3>
                <p className="text-sm text-[#C5BCAD] max-w-sm leading-relaxed">
                  {isRTL
                    ? "سيتواصل معك مستشار التمويل العقاري الخاص بك في أقرب وقت لإتمام الإجراءات مع البنك المختار بأفضل هامش ربح."
                    : "Your dedicated mortgage advisory specialist will contact you shortly to review your eligibility and secure prime banking terms."}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 px-8 py-3 border font-mono text-[11px] tracking-[0.2em] uppercase font-semibold text-[#12130F] bg-[#B8873B] border-[#B8873B] hover:bg-[#c79748] transition-all cursor-pointer"
                >
                  {isRTL ? "تم" : "Done"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="mortgage-full-name"
                    className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B] font-semibold"
                  >
                    {isRTL ? "الاسم الكامل *" : "Full Name *"}
                  </label>
                  <input
                    ref={firstInputRef}
                    id="mortgage-full-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isRTL ? "أدخل اسمك الكامل" : "Enter your full name"}
                    className="w-full px-3.5 py-2.5 rounded-sm border text-[#E8DFCE] text-sm font-mono outline-none transition-all placeholder:text-[#8C8477]/50 focus:border-[#B8873B] focus:shadow-[0_0_12px_rgba(184,135,59,0.2)]"
                    style={{
                      borderColor: "rgba(184,135,59,0.25)",
                      backgroundColor: "#161713",
                    }}
                  />
                </div>

                {/* Country-Code Enabled Phone Input */}
                <div className="flex flex-col gap-1.5">
                  <PhoneInputWithCountry
                    value={phoneValue}
                    onChange={(fullVal, valid) => {
                      setPhoneValue(fullVal);
                      setIsPhoneValid(valid);
                    }}
                    label={isRTL ? "رقم الهاتف" : "Phone Number"}
                    isAr={isRTL}
                    required
                    defaultCountryCode="SA"
                    className="w-full"
                  />
                </div>

                {/* Monthly Income */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="mortgage-income"
                    className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B] font-semibold"
                  >
                    {isRTL ? "الدخل الشهري (اختياري)" : "Monthly Income (Optional)"}
                  </label>
                  <div
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-sm border transition-all focus-within:border-[#B8873B] ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                    style={{
                      borderColor: "rgba(184,135,59,0.25)",
                      backgroundColor: "#161713",
                    }}
                  >
                    <span className="text-[#8C8477] text-xs font-mono font-semibold shrink-0">SAR</span>
                    <input
                      id="mortgage-income"
                      type="text"
                      inputMode="numeric"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      placeholder={isRTL ? "أدخل دخلك الشهري" : "e.g. 25,000"}
                      className="flex-1 bg-transparent text-[#E8DFCE] text-sm font-mono outline-none placeholder:text-[#8C8477]/50"
                    />
                  </div>
                </div>

                {/* REDF Supported */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B] font-semibold">
                    {isRTL ? "دعم صندوق التنمية العقارية (سكني)" : "REDF / Sakani Supported"}
                  </label>
                  <div
                    className={`flex rounded-sm overflow-hidden border ${isRTL ? "flex-row-reverse" : ""}`}
                    style={{
                      borderColor: "rgba(184,135,59,0.25)",
                      backgroundColor: "rgba(18,19,15,0.6)",
                    }}
                  >
                    {[
                      { value: true, labelEn: "Yes, Supported", labelAr: "نعم، مدعوم" },
                      { value: false, labelEn: "No / Direct Bank", labelAr: "لا / تمويل مباشر" },
                    ].map((opt) => (
                      <button
                        key={String(opt.value)}
                        type="button"
                        onClick={() => setRedfSupported(opt.value)}
                        className={`flex-1 py-2.5 text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                          redfSupported === opt.value
                            ? "bg-[#B8873B] text-[#12130F] font-bold shadow-[0_0_10px_rgba(184,135,59,0.3)]"
                            : "text-[#C5BCAD] hover:text-[#E8DFCE] hover:bg-[rgba(184,135,59,0.08)]"
                        }`}
                      >
                        {isRTL ? opt.labelAr : opt.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monthly Obligations */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="mortgage-obligations"
                    className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B] font-semibold"
                  >
                    {isRTL ? "الالتزامات الشهرية القائمة (اختياري)" : "Existing Monthly Obligations (Optional)"}
                  </label>
                  <div
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-sm border transition-all focus-within:border-[#B8873B] ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                    style={{
                      borderColor: "rgba(184,135,59,0.25)",
                      backgroundColor: "#161713",
                    }}
                  >
                    <span className="text-[#8C8477] text-xs font-mono font-semibold shrink-0">SAR</span>
                    <input
                      id="mortgage-obligations"
                      type="text"
                      inputMode="numeric"
                      value={monthlyObligations}
                      onChange={(e) => setMonthlyObligations(e.target.value)}
                      placeholder={isRTL ? "أدخل التزاماتك الحالية" : "e.g. 3,500"}
                      className="flex-1 bg-transparent text-[#E8DFCE] text-sm font-mono outline-none placeholder:text-[#8C8477]/50"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div
                    className={`px-3.5 py-2.5 rounded-sm text-xs font-mono border ${
                      isRTL ? "text-right" : ""
                    }`}
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      borderColor: "rgba(239, 68, 68, 0.3)",
                      color: "#fca5a5",
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  id="mortgage-submit-btn"
                  disabled={submitState === "submitting"}
                  className="w-full mt-2 py-3.5 font-mono text-[11px] tracking-[0.25em] uppercase font-bold text-[#12130F] bg-[#B8873B] hover:bg-[#c79748] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(184,135,59,0.3)]"
                >
                  {submitState === "submitting"
                    ? isRTL
                      ? "جاري إرسال الطلب..."
                      : "Processing Request..."
                    : isRTL
                    ? "إرسال طلب التمويل العقاري"
                    : "Submit Financing Request"}
                </button>

                {/* Disclaimer */}
                <p className={`text-[10px] text-[#8C8477] text-center leading-relaxed ${isRTL ? "text-right" : ""}`}>
                  {isRTL ? (
                    <>
                      بالنقر على «إرسال الطلب»، أنت توافق على معالجة بياناتك من قِبل فريق استشارات أصاهيب وفق{" "}
                      <a href="/terms" className="text-[#B8873B] underline underline-offset-2">
                        شروط الخدمة والخصوصية
                      </a>
                      .
                    </>
                  ) : (
                    <>
                      By submitting this form, you authorize Asaheeb's private advisory desk to assess your financing eligibility under our{" "}
                      <a href="/terms" className="text-[#B8873B] underline underline-offset-2">
                        Terms of Service & Privacy
                      </a>
                      .
                    </>
                  )}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Autocomplete override CSS to avoid white browser autofill */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #E8DFCE !important;
          -webkit-box-shadow: 0 0 0px 1000px #161713 inset !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
      `}</style>
    </div>
  );
}
