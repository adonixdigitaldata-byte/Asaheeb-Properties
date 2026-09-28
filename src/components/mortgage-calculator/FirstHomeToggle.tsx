"use client";

interface FirstHomeToggleProps {
  isFirstHome: boolean;
  onChange: (isFirstHome: boolean) => void;
  isRTL?: boolean;
}

export default function FirstHomeToggle({
  isFirstHome,
  onChange,
  isRTL = false,
}: FirstHomeToggleProps) {
  const options = [
    { value: true, labelEn: "First Home", labelAr: "المنزل الأول" },
    { value: false, labelEn: "Second Home", labelAr: "منزل إضافي" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B] font-semibold">
          {isRTL ? "حالة العقار" : "Property Status"}
        </span>
        <span className="text-[10px] font-mono text-[#8C8477]">
          {isFirstHome
            ? (isRTL ? "مؤهل لدفعة ١٠٪" : "Eligible for 10%")
            : (isRTL ? "دفعة ٣٠٪ للمنزل الثاني" : "30% for 2nd Home")}
        </span>
      </div>
      <div
        className={`flex rounded-sm overflow-hidden border p-1 gap-1 ${isRTL ? "flex-row-reverse" : ""}`}
        style={{ borderColor: "rgba(184,135,59,0.22)", backgroundColor: "rgba(18,19,15,0.6)" }}
      >
        {options.map((opt) => {
          const active = isFirstHome === opt.value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`flex-1 py-2 px-3 text-[11px] font-mono font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-xs text-center ${
                active
                  ? "bg-[#B8873B] text-[#12130F] shadow-[0_0_10px_rgba(184,135,59,0.3)]"
                  : "text-[#C5BCAD] hover:text-[#E8DFCE] hover:bg-[rgba(184,135,59,0.06)]"
              }`}
            >
              {isRTL ? opt.labelAr : opt.labelEn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
