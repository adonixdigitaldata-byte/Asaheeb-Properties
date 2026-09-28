"use client";

import { formatSAR, formatPct } from "./engine";
import type { MortgageResult } from "./engine";

interface PaymentBreakdownProps {
  result: MortgageResult | null;
  isRTL?: boolean;
  onApply: () => void;
}

export default function PaymentBreakdown({
  result,
  isRTL = false,
  onApply,
}: PaymentBreakdownProps) {
  const profitPct = result ? Math.max(0, Math.min(100, result.bankProfitPercentage)) : 0;
  const principalPct = 100 - profitPct;

  // SVG donut ring with refined proportions and ample inner space
  const radius = 66;
  const strokeWidth = 11;
  const circumference = 2 * Math.PI * radius;
  const profitArc = (profitPct / 100) * circumference;
  const principalArc = circumference - profitArc;

  const statRows = result
    ? [
        {
          labelEn: "Monthly Instalment",
          labelAr: "القسط الشهري",
          value: `SAR ${formatSAR(result.monthlyInstalment)}`,
          highlight: true,
        },
        {
          labelEn: "Total Loan Amount",
          labelAr: "إجمالي مبلغ القرض",
          value: `SAR ${formatSAR(result.totalLoanAmount)}`,
        },
        {
          labelEn: "Total Payable",
          labelAr: "إجمالي المدفوعات",
          value: `SAR ${formatSAR(result.totalPayableValue)}`,
        },
        {
          labelEn: "Down Payment",
          labelAr: "الدفعة الأولى",
          value: `SAR ${formatSAR(result.downPaymentAmount)}`,
        },
        {
          labelEn: "Applied Rate",
          labelAr: "نسبة الفائدة",
          value: `${formatPct(result.appliedRatePct)}%`,
        },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Donut Chart with Framed Center Disc */}
      <div className="flex flex-col items-center gap-3.5">
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
            {/* Background ring */}
            <circle
              cx="80" cy="80" r={radius}
              fill="none"
              stroke="rgba(184,135,59,0.08)"
              strokeWidth={strokeWidth}
            />
            {/* Principal arc (dim gold) */}
            <circle
              cx="80" cy="80" r={radius}
              fill="none"
              stroke="rgba(184,135,59,0.28)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${principalArc} ${profitArc}`}
              strokeDashoffset={0}
              strokeLinecap="butt"
              className="transition-all duration-500"
            />
            {/* Bank Profit arc (solid gold) */}
            <circle
              cx="80" cy="80" r={radius}
              fill="none"
              stroke="#B8873B"
              strokeWidth={strokeWidth}
              strokeDasharray={`${profitArc} ${principalArc}`}
              strokeDashoffset={result ? -principalArc : 0}
              strokeLinecap="butt"
              className="transition-all duration-500"
            />
          </svg>

          {/* Dedicated Circular Center Disc with Gold Border (Guarantees zero text-ring collision) */}
          <div
            className="absolute inset-5 rounded-full flex flex-col items-center justify-center text-center p-2.5 border shadow-[inset_0_0_18px_rgba(0,0,0,0.85)] z-10"
            style={{
              borderColor: "rgba(184,135,59,0.32)",
              backgroundColor: "#12130F",
            }}
          >
            <span className="text-[9px] font-sans font-medium tracking-[0.22em] uppercase text-[#8C8477]">
              {isRTL ? "إجمالي المبلغ" : "Total Payable"}
            </span>

            <span className="text-[10px] font-mono tracking-wider font-semibold text-[#B8873B] mt-0.5">
              SAR
            </span>

            <span className="text-base sm:text-lg font-mono font-bold text-[#E8DFCE] leading-tight tracking-tight mt-0.5">
              {result ? formatSAR(result.totalPayableValue) : "—"}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className={`flex items-center gap-5 ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8873B] shadow-[0_0_8px_rgba(184,135,59,0.8)]" />
            <span className="text-xs font-sans text-[#E8DFCE]">
              {isRTL ? "أرباح البنك" : "Bank Profit"}
              {result && <span className="text-[#B8873B] ml-1 font-mono font-medium">({formatPct(profitPct)}%)</span>}
            </span>
          </div>
          <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(184,135,59,0.35)" }} />
            <span className="text-xs font-sans text-[#C5BCAD]">
              {isRTL ? "أصل التمويل" : "Principal"}
              {result && <span className="text-[#8C8477] ml-1 font-mono">({formatPct(principalPct)}%)</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Stat Rows */}
      <div
        className="flex flex-col border rounded-sm overflow-hidden divide-y divide-[rgba(184,135,59,0.1)]"
        style={{ borderColor: "rgba(184,135,59,0.22)" }}
      >
        {statRows.map((row, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-4 py-3 transition-colors ${
              row.highlight
                ? "bg-gradient-to-r from-[rgba(184,135,59,0.14)] to-transparent border-l-2 border-l-[#B8873B]"
                : "bg-[rgba(18,19,15,0.5)] hover:bg-[rgba(18,19,15,0.7)]"
            } ${isRTL ? "flex-row-reverse border-l-0 border-r-2 border-r-[#B8873B]" : ""}`}
          >
            <span className={`text-xs font-sans text-[#C5BCAD] font-medium ${isRTL ? "text-right" : ""}`}>
              {isRTL ? row.labelAr : row.labelEn}
            </span>
            <span
              className={`font-mono font-semibold ${
                row.highlight ? "text-[#B8873B] text-base" : "text-[#E8DFCE] text-sm"
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}

        {!result && (
          <div className="px-4 py-8 text-center text-[#8C8477] text-sm font-sans">
            {isRTL ? "اضبط الإعدادات لرؤية النتائج" : "Adjust the settings to see your estimate"}
          </div>
        )}
      </div>

      {/* Apply CTA — matches site's gold outline button style */}
      <button
        type="button"
        onClick={onApply}
        disabled={!result}
        id="mortgage-apply-btn"
        className="w-full py-4 border font-mono text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          borderColor: result ? "#B8873B" : "rgba(184,135,59,0.3)",
          color: "#E8DFCE",
          backgroundColor: "transparent",
        }}
        onMouseEnter={(e) => {
          if (result) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#B8873B";
            (e.currentTarget as HTMLButtonElement).style.color = "#12130F";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = "#E8DFCE";
        }}
      >
        {isRTL ? "تقديم طلب التمويل ↗" : "Apply for Financing ↗"}
      </button>
    </div>
  );
}
