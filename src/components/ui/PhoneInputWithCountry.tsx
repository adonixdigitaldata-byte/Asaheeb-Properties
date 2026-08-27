"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  CountryInfo,
  PRIORITY_COUNTRIES,
  ALL_COUNTRIES,
  DEFAULT_COUNTRY,
  validatePhoneNumber,
  formatPhoneAsYouType,
} from "@/data/countriesData";
import { CountryCode } from "libphonenumber-js";

export interface PhoneInputWithCountryProps {
  value: string;
  onChange: (fullInternationalValue: string, isValid: boolean, country: CountryInfo) => void;
  label?: string;
  isAr?: boolean;
  required?: boolean;
  error?: string | null;
  variant?: "standard" | "floating";
  className?: string;
  defaultCountryCode?: CountryCode;
  disabled?: boolean;
  id?: string;
}

export default function PhoneInputWithCountry({
  value,
  onChange,
  label,
  isAr = false,
  required = false,
  error: externalError,
  variant = "standard",
  className = "",
  defaultCountryCode = "SA",
  disabled = false,
  id,
}: PhoneInputWithCountryProps) {
  // Selected Country
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(() => {
    return (
      ALL_COUNTRIES.find((c) => c.code === defaultCountryCode) ||
      DEFAULT_COUNTRY
    );
  });

  // Local digits state without dial code
  const [rawDigits, setRawDigits] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Sync external value to local state if updated from outside
  useEffect(() => {
    if (!value) {
      setRawDigits("");
      return;
    }

    // If external value starts with dial code or +, parse it
    if (value.startsWith("+")) {
      const match = ALL_COUNTRIES.find((c) => value.startsWith(c.dialCode));
      if (match && match.code !== selectedCountry.code) {
        setSelectedCountry(match);
        const remaining = value.slice(match.dialCode.length).trim();
        setRawDigits(formatPhoneAsYouType(remaining, match.code));
        return;
      }
    }
  }, [value]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Validation
  const validation = useMemo(() => {
    if (!rawDigits) {
      return { isValid: false, errorMessageEn: "", errorMessageAr: "" };
    }
    const fullNumber = `${selectedCountry.dialCode} ${rawDigits}`;
    return validatePhoneNumber(fullNumber, selectedCountry.code);
  }, [rawDigits, selectedCountry]);

  // Filter countries for dropdown
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        priority: PRIORITY_COUNTRIES,
        all: ALL_COUNTRIES.filter((c) => !c.priority),
      };
    }
    const q = searchQuery.toLowerCase().trim();
    const matches = ALL_COUNTRIES.filter(
      (c) =>
        c.nameEn.toLowerCase().includes(q) ||
        c.nameAr.includes(q) ||
        c.dialCode.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
    return {
      priority: matches.filter((c) => c.priority),
      all: matches.filter((c) => !c.priority),
    };
  }, [searchQuery]);

  const handleCountrySelect = (country: CountryInfo) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery("");

    // Re-format current digits for new country
    const clean = rawDigits.replace(/\D/g, "");
    const formatted = formatPhoneAsYouType(clean, country.code);
    setRawDigits(formatted);

    const fullInternational = formatted ? `${country.dialCode} ${formatted}` : "";
    const vResult = formatted
      ? validatePhoneNumber(fullInternational, country.code)
      : { isValid: false };

    onChange(fullInternational, vResult.isValid, country);
    phoneInputRef.current?.focus();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Strip everything except digits and spaces
    const cleanDigits = input.replace(/[^\d\s]/g, "");
    const formatted = formatPhoneAsYouType(cleanDigits, selectedCountry.code);
    setRawDigits(formatted);

    const fullInternational = formatted ? `${selectedCountry.dialCode} ${formatted}` : "";
    const vResult = formatted
      ? validatePhoneNumber(fullInternational, selectedCountry.code)
      : { isValid: false };

    onChange(fullInternational, vResult.isValid, selectedCountry);
  };

  const defaultLabel = isAr ? "رقم الهاتف / واتساب" : "Phone / WhatsApp";
  const displayLabel = label || defaultLabel;
  const showErrorMessage = touched && rawDigits.length > 3 && !validation.isValid;
  const currentError = externalError || (showErrorMessage ? (isAr ? validation.errorMessageAr : validation.errorMessageEn) : null);

  const hasValue = rawDigits.length > 0;
  const isFloatingUp = isFocused || hasValue || isOpen;

  // ─── FLOATING LABEL VARIANT ───────────────────────────────────────────────
  if (variant === "floating") {
    return (
      <div
        className={`relative ${className}`}
        ref={containerRef}
        dir={isAr ? "rtl" : "ltr"}
        style={{ position: "relative", zIndex: isOpen ? 9999 : "auto" }}
      >
        <div
          className={`relative flex items-stretch border transition-all duration-300 ${
            isFocused || isOpen
              ? "border-[#B8873B] shadow-[0_0_20px_rgba(184,135,59,0.15)]"
              : currentError
              ? "border-red-500/70"
              : "border-[rgba(184,135,59,0.2)] hover:border-[rgba(184,135,59,0.4)]"
          }`}
          style={{ backgroundColor: "rgba(18,19,15,0.6)" }}
        >
          {/* Country Trigger Button (First on left in LTR, first on right in RTL) */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-1.5 px-3.5 pt-5 pb-2 hover:bg-white/5 transition-colors cursor-pointer flex-shrink-0 ${
              isAr ? "border-l border-[rgba(184,135,59,0.2)]" : "border-r border-[rgba(184,135,59,0.2)]"
            }`}
            title={isAr ? selectedCountry.nameAr : selectedCountry.nameEn}
            aria-label="Select Country"
          >
            <span className="text-base select-none leading-none">{selectedCountry.flag}</span>
            <span className="font-mono text-xs text-[#E8DFCE] font-semibold" dir="ltr">{selectedCountry.dialCode}</span>
            <svg
              className={`w-3 h-3 text-[#8C8477] transition-transform duration-200 ${isOpen ? "rotate-180 text-[#B8873B]" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Phone Number Input & Floating Label */}
          <div className="relative flex-1 min-w-0">
            <input
              ref={phoneInputRef}
              id={id}
              type="tel"
              disabled={disabled}
              required={required}
              value={rawDigits}
              onChange={handlePhoneChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                setTouched(true);
              }}
              placeholder={isFloatingUp ? selectedCountry.placeholder : ""}
              dir="ltr"
              className={`w-full px-3.5 pt-6 pb-2 font-sans text-sm text-[#E8DFCE] bg-transparent outline-none placeholder-[#8C8477]/40 ${
                isAr ? "text-right" : "text-left"
              }`}
            />

            {/* Floating Label placed inside input column */}
            <label
              className="absolute pointer-events-none transition-all duration-200"
              style={{
                top: isFloatingUp ? "8px" : "50%",
                left: isAr ? "auto" : "14px",
                right: isAr ? "14px" : "auto",
                transform: isFloatingUp ? "none" : "translateY(-50%)",
                fontSize: isFloatingUp ? "10px" : "13px",
                letterSpacing: isFloatingUp ? "0.12em" : "0",
                textTransform: isFloatingUp ? "uppercase" : "none",
                color: isFocused || isOpen ? "#B8873B" : currentError ? "#F87171" : "#C5BCAD",
                fontFamily: isFloatingUp ? "var(--font-mono)" : "var(--font-sans)",
              }}
            >
              {displayLabel} {required && "*"}
            </label>
          </div>

          {/* Validation Status Icon */}
          {hasValue && (
            <div className="px-3 flex items-center flex-shrink-0">
              {validation.isValid ? (
                <span className="text-emerald-400 text-sm font-bold" title="Valid number">✓</span>
              ) : touched && rawDigits.length > 4 ? (
                <span className="text-red-400 text-xs font-bold" title="Invalid format">✕</span>
              ) : null}
            </div>
          )}
        </div>

        {/* Inline Error */}
        {currentError && (
          <p className={`font-mono text-[10px] text-red-400 mt-1 tracking-wider ${isAr ? "text-right" : "text-left"}`}>
            {currentError}
          </p>
        )}

        {/* Dropdown Menu */}
        {isOpen && renderDropdown()}
      </div>
    );
  }

  // ─── STANDARD BOX VARIANT (Default) ───────────────────────────────────────
  return (
    <div
      className={`relative ${className}`}
      ref={containerRef}
      dir={isAr ? "rtl" : "ltr"}
      style={{ position: "relative", zIndex: isOpen ? 9999 : "auto" }}
    >
      {displayLabel && (
        <label
          htmlFor={id}
          className={`font-mono text-[9px] tracking-[0.26em] uppercase text-[#8C8477] mb-1.5 block ${
            isAr ? "text-right" : "text-left"
          }`}
        >
          {displayLabel} {required && "*"}
        </label>
      )}

      <div
        className={`relative flex items-stretch border transition-all duration-300 ${
          isFocused || isOpen
            ? "border-[#B8873B] shadow-[0_0_20px_rgba(184,135,59,0.15)]"
            : currentError
            ? "border-red-500/70"
            : "border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
        }`}
        style={{ backgroundColor: "rgba(18,19,15,0.5)" }}
      >
        {/* Country Trigger Button (On the left in LTR, on the right in RTL) */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1.5 px-3 py-3.5 hover:bg-white/5 transition-colors cursor-pointer flex-shrink-0 ${
            isAr ? "border-l border-[rgba(255,255,255,0.08)]" : "border-r border-[rgba(255,255,255,0.08)]"
          }`}
          title={isAr ? selectedCountry.nameAr : selectedCountry.nameEn}
          aria-label="Select Country"
        >
          <span className="text-base select-none leading-none">{selectedCountry.flag}</span>
          <span className="font-mono text-xs text-[#E8DFCE] font-semibold" dir="ltr">{selectedCountry.dialCode}</span>
          <svg
            className={`w-3 h-3 text-[#8C8477] transition-transform duration-200 ${isOpen ? "rotate-180 text-[#B8873B]" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Phone Number Input */}
        <div className="relative flex-1 min-w-0">
          <input
            ref={phoneInputRef}
            id={id}
            type="tel"
            disabled={disabled}
            required={required}
            value={rawDigits}
            onChange={handlePhoneChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              setTouched(true);
            }}
            placeholder={selectedCountry.placeholder}
            dir="ltr"
            className={`w-full px-3 py-3.5 font-sans text-sm text-[#E8DFCE] bg-transparent outline-none placeholder-[#8C8477]/50 ${
              isAr ? "text-right" : "text-left"
            }`}
          />
        </div>

        {/* Validation Status Checkmark / Cross */}
        {hasValue && (
          <div className="px-3 flex items-center flex-shrink-0">
            {validation.isValid ? (
              <span className="text-emerald-400 text-sm font-bold" title="Valid number">✓</span>
            ) : touched && rawDigits.length > 4 ? (
              <span className="text-red-400 text-xs font-bold" title="Invalid format">✕</span>
            ) : null}
          </div>
        )}
      </div>

      {/* Inline Error */}
      {currentError && (
        <p className={`font-mono text-[10px] text-red-400 mt-1 tracking-wider ${isAr ? "text-right" : "text-left"}`}>
          {currentError}
        </p>
      )}

      {/* Dropdown Menu */}
      {isOpen && renderDropdown()}
    </div>
  );

  // ─── DROPDOWN POPUP RENDERER ──────────────────────────────────────────────
  function renderDropdown() {
    return (
      <div
        className={`absolute top-full mt-2 border rounded-sm overflow-hidden z-[100] shadow-[0_25px_60px_rgba(0,0,0,0.95)] ${
          isAr ? "right-0" : "left-0"
        } w-full sm:w-[340px] max-w-[92vw]`}
        style={{
          backgroundColor: "#171813",
          borderColor: "rgba(184,135,59,0.45)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.95), 0 0 0 1px rgba(184,135,59,0.35)",
        }}
      >
        {/* Search Header */}
        <div
          className="p-3 border-b sticky top-0 z-10"
          style={{
            backgroundColor: "#1C1E17",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <div className="relative">
            <svg
              className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#B8873B] ${isAr ? "right-3" : "left-3"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? "ابحث عن الدولة أو الرمز (+966)..." : "Search country or dial code (+966)..."}
              dir={isAr ? "rtl" : "ltr"}
              className={`w-full py-2 font-sans text-xs text-[#E8DFCE] border rounded-xs outline-none focus:border-[#B8873B] placeholder-[#8C8477] ${
                isAr ? "pr-9 pl-3" : "pl-9 pr-3"
              }`}
              style={{
                backgroundColor: "#11120E",
                borderColor: "rgba(184,135,59,0.3)",
              }}
            />
          </div>
        </div>

        {/* Countries List */}
        <div
          className="overflow-y-auto divide-y divide-white/5"
          style={{
            maxHeight: "280px",
            backgroundColor: "#171813",
          }}
          dir={isAr ? "rtl" : "ltr"}
        >
          {/* Priority Section */}
          {filteredCountries.priority.length > 0 && (
            <div style={{ backgroundColor: "#171813" }}>
              <div
                className="px-3.5 py-2 border-b"
                style={{
                  backgroundColor: "#12130F",
                  borderColor: "rgba(255,255,255,0.05)",
                }}
              >
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#B8873B] font-bold">
                  {isAr ? "الدول الشائعة والخليجية" : "Priority & Gulf Countries"}
                </span>
              </div>
              {filteredCountries.priority.map((country) => renderCountryRow(country))}
            </div>
          )}

          {/* All Countries Section */}
          {filteredCountries.all.length > 0 && (
            <div style={{ backgroundColor: "#171813" }}>
              <div
                className="px-3.5 py-2 border-b"
                style={{
                  backgroundColor: "#12130F",
                  borderColor: "rgba(255,255,255,0.05)",
                }}
              >
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#8C8477] font-bold">
                  {isAr ? "جميع دول العالم" : "All Countries"}
                </span>
              </div>
              {filteredCountries.all.map((country) => renderCountryRow(country))}
            </div>
          )}

          {filteredCountries.priority.length === 0 && filteredCountries.all.length === 0 && (
            <div
              className="p-6 text-center text-[#8C8477] font-sans text-xs"
              style={{ backgroundColor: "#171813" }}
            >
              {isAr ? "لا توجد نتائج مطابقة" : "No countries found"}
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderCountryRow(country: CountryInfo) {
    const isSelected = selectedCountry.code === country.code;
    return (
      <button
        key={country.code}
        type="button"
        onClick={() => handleCountrySelect(country)}
        className="w-full px-3.5 py-2.5 flex items-center justify-between text-left transition-colors cursor-pointer"
        style={{
          backgroundColor: isSelected ? "rgba(184,135,59,0.2)" : "#171813",
          borderLeft: isSelected && !isAr ? "3px solid #B8873B" : "none",
          borderRight: isSelected && isAr ? "3px solid #B8873B" : "none",
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = "rgba(184,135,59,0.1)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = "#171813";
          }
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-base select-none">{country.flag}</span>
          <span className="font-sans text-xs text-[#E8DFCE] font-medium truncate">
            {isAr ? country.nameAr : country.nameEn}
          </span>
        </div>
        <span className="font-mono text-xs text-[#B8873B] font-bold flex-shrink-0 ml-2" dir="ltr">
          {country.dialCode}
        </span>
      </button>
    );
  }
}
