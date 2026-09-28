"use client";

import { useState, useEffect } from "react";

export interface PresetItem {
  label: string;
  value: number;
}

interface SliderInputProps {
  id: string;
  label: string;
  labelAr?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  badge?: string;
  presets?: PresetItem[];
  isRTL?: boolean;
}

export default function SliderInput({
  id,
  label,
  labelAr,
  value,
  min,
  max,
  step = 1,
  onChange,
  prefix,
  suffix,
  badge,
  presets,
  isRTL = false,
}: SliderInputProps) {
  const [textValue, setTextValue] = useState(() => value.toLocaleString("en-US"));
  const [isFocused, setIsFocused] = useState(false);

  // Sync text value from prop when not actively typing
  useEffect(() => {
    if (!isFocused) {
      setTextValue(value.toLocaleString("en-US"));
    }
  }, [value, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setTextValue(raw);
    const num = parseFloat(raw);
    if (!isNaN(num) && num >= min && num <= max) {
      onChange(num);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    const parsed = parseFloat(textValue.replace(/,/g, ""));
    if (isNaN(parsed) || parsed < min) {
      onChange(min);
      setTextValue(min.toLocaleString("en-US"));
    } else if (parsed > max) {
      onChange(max);
      setTextValue(max.toLocaleString("en-US"));
    } else {
      onChange(parsed);
      setTextValue(parsed.toLocaleString("en-US"));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onChange(val);
  };

  const validMin = typeof min === "number" && !isNaN(min) ? min : 0;
  const validMax = typeof max === "number" && !isNaN(max) && max >= validMin ? max : validMin + 1;
  const validVal = typeof value === "number" && !isNaN(value) ? value : validMin;
  const safeVal = Math.min(validMax, Math.max(validMin, validVal));
  const progressPct = validMax > validMin ? Math.max(0, Math.min(100, ((safeVal - validMin) / (validMax - validMin)) * 100)) : 0;

  const trackGradient = isRTL
    ? `linear-gradient(to left, #B8873B 0%, #B8873B ${progressPct}%, rgba(184,135,59,0.15) ${progressPct}%, rgba(184,135,59,0.15) 100%)`
    : `linear-gradient(to right, #B8873B 0%, #B8873B ${progressPct}%, rgba(184,135,59,0.15) ${progressPct}%, rgba(184,135,59,0.15) 100%)`;

  const displayLabel = isRTL && labelAr ? labelAr : label;

  return (
    <div className="flex flex-col gap-2.5 w-full max-w-full min-w-0">
      {/* Top Header: Label & Optional Badge */}
      <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
        <label
          htmlFor={id}
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B] font-semibold"
        >
          {displayLabel}
        </label>
        {badge && (
          <span
            className="px-2.5 py-0.5 text-[10px] font-mono font-bold border rounded-full"
            style={{
              borderColor: "rgba(184,135,59,0.45)",
              color: "#B8873B",
              backgroundColor: "rgba(184,135,59,0.12)",
            }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Numeric Input Box */}
      <div
        className={`flex items-center gap-2 border rounded-sm px-3.5 py-2.5 transition-all duration-200 focus-within:border-[#B8873B] focus-within:shadow-[0_0_12px_rgba(184,135,59,0.2)] ${
          isRTL ? "flex-row-reverse" : ""
        }`}
        style={{
          borderColor: "rgba(184,135,59,0.22)",
          backgroundColor: "rgba(18,19,15,0.6)",
        }}
      >
        {prefix && (
          <span className="text-[#8C8477] text-xs font-mono font-semibold shrink-0 select-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          className={`flex-1 bg-transparent text-[#E8DFCE] text-sm sm:text-base font-mono font-semibold outline-none min-w-0 ${
            isRTL ? "text-left" : "text-right"
          }`}
          value={isFocused ? textValue : safeVal.toLocaleString("en-US")}
          onFocus={() => {
            setIsFocused(true);
            setTextValue(safeVal.toString());
          }}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {suffix && (
          <span className="text-[#8C8477] text-xs font-mono font-semibold shrink-0 select-none">
            {suffix}
          </span>
        )}
      </div>

      {/* Slider Track & Range Input */}
      <div className="relative pt-1.5 pb-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={safeVal}
          onChange={handleRangeChange}
          dir={isRTL ? "rtl" : "ltr"}
          style={{ background: trackGradient }}
          className="slider-gold w-full h-1.5 sm:h-2 rounded-full appearance-none cursor-pointer outline-none transition-[background] duration-75"
          aria-label={displayLabel}
        />
      </div>

      {/* Min / Max Range Markers */}
      <div
        className={`flex justify-between text-[10px] text-[#8C8477] font-mono select-none px-0.5 ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <span>
          {prefix ? `${prefix} ` : ""}
          {min.toLocaleString("en-US")}
          {suffix ? ` ${suffix}` : ""}
        </span>
        <span>
          {prefix ? `${prefix} ` : ""}
          {max.toLocaleString("en-US")}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>

      {/* Optional Preset Pills */}
      {presets && presets.length > 0 && (
        <div className={`flex flex-wrap gap-1.5 pt-0.5 ${isRTL ? "flex-row-reverse" : ""}`}>
          {presets.map((preset) => {
            const isSelected = Math.abs(safeVal - preset.value) < Math.max(step, 1);
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => onChange(preset.value)}
                className={`px-2.5 py-1 text-[10px] sm:text-[11px] font-mono rounded-sm transition-all duration-150 border cursor-pointer ${
                  isSelected
                    ? "bg-[#B8873B] text-[#12130F] font-bold border-[#B8873B] shadow-[0_0_10px_rgba(184,135,59,0.35)]"
                    : "bg-[rgba(18,19,15,0.45)] text-[#8C8477] border-[rgba(184,135,59,0.2)] hover:text-[#E8DFCE] hover:border-[rgba(184,135,59,0.45)]"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Hardware-accelerated native thumb styles with gold glow */}
      <style>{`
        .slider-gold::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #B8873B;
          border: 2px solid #12130F;
          box-shadow: 0 0 10px rgba(184, 135, 59, 0.7);
          cursor: grab;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }
        .slider-gold::-webkit-slider-thumb:hover {
          transform: scale(1.18);
          box-shadow: 0 0 14px rgba(184, 135, 59, 0.95);
        }
        .slider-gold:active::-webkit-slider-thumb {
          cursor: grabbing;
          transform: scale(1.28);
          box-shadow: 0 0 18px rgba(184, 135, 59, 1);
        }
        .slider-gold::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #B8873B;
          border: 2px solid #12130F;
          box-shadow: 0 0 10px rgba(184, 135, 59, 0.7);
          cursor: grab;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }
        .slider-gold::-moz-range-thumb:hover {
          transform: scale(1.18);
          box-shadow: 0 0 14px rgba(184, 135, 59, 0.95);
        }
        .slider-gold:active::-moz-range-thumb {
          cursor: grabbing;
          transform: scale(1.28);
        }
        .slider-gold::-moz-range-track {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
}
