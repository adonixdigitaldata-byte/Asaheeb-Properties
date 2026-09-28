"use client";

interface NationalityToggleProps {
  isCitizen: boolean;
  onChange: (isCitizen: boolean) => void;
  isRTL?: boolean;
}

export default function NationalityToggle({
  isCitizen,
  onChange,
  isRTL = false,
}: NationalityToggleProps) {
  const options = [
    { value: true, labelEn: "Saudi Citizen", labelAr: "مواطن سعودي" },
    { value: false, labelEn: "Non-Saudi Expat", labelAr: "مقيم / غير سعودي" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B] font-semibold">
          {isRTL ? "الجنسية" : "Nationality"}
        </span>
        <span className="text-[10px] font-mono text-[#8C8477]">
          {isCitizen ? (isRTL ? "دفعة تبدأ من ١٠٪" : "From 10% Down") : (isRTL ? "دفعة ٣٠٪ (ساما)" : "30% Down (SAMA)")}
        </span>
      </div>
      <div
        className={`flex rounded-sm overflow-hidden border p-1 gap-1 ${isRTL ? "flex-row-reverse" : ""}`}
        style={{ borderColor: "rgba(184,135,59,0.22)", backgroundColor: "rgba(18,19,15,0.6)" }}
      >
        {options.map((opt) => {
          const active = isCitizen === opt.value;
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
